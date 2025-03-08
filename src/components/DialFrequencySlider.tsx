
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import InfoPopover from './InfoPopover';
import { cn } from '@/lib/utils';
import { getToneGenerator } from '@/lib/audio';
import { frequencies } from '@/lib/frequencies';

interface DialFrequencySliderProps {
  initialFrequency?: number;
  onFrequencyChange?: (frequency: number) => void;
  className?: string;
}

const DialFrequencySlider: React.FC<DialFrequencySliderProps> = ({
  initialFrequency = 432,
  onFrequencyChange,
  className
}) => {
  const [frequency, setFrequency] = useState(initialFrequency);
  const [isAtSpecial, setIsAtSpecial] = useState(false);
  const [specialFrequency, setSpecialFrequency] = useState<typeof frequencies[0] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const dialRef = useRef<HTMLDivElement>(null);
  
  const specialFrequencies = frequencies.map(f => f.hz);
  const MIN_FREQUENCY = 100;
  const MAX_FREQUENCY = 1000;
  const FREQUENCY_RANGE = MAX_FREQUENCY - MIN_FREQUENCY;
  const ROTATION_MULTIPLIER = 270 / FREQUENCY_RANGE;

  useEffect(() => {
    // Calculate initial rotation based on frequency
    const initialRotation = ((initialFrequency - MIN_FREQUENCY) / FREQUENCY_RANGE) * 270;
    setRotation(initialRotation);
  }, [initialFrequency]);

  // Handle the dial rotation and update frequency
  const handleDialUpdate = (clientX: number, clientY: number) => {
    if (!dialRef.current) return;
    
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle in degrees
    const angleRad = Math.atan2(clientY - centerY, clientX - centerX);
    let angleDeg = (angleRad * 180 / Math.PI) + 90;
    
    // Normalize angle to 0-360 range
    if (angleDeg < 0) angleDeg += 360;
    
    // Restrict rotation to 0-270 degrees (bottom half and right side)
    if (angleDeg > 270 && angleDeg < 360) {
      angleDeg = 0;
    } else if (angleDeg > 270) {
      angleDeg = 270;
    }
    
    // Update rotation state
    setRotation(angleDeg);
    
    // Convert rotation to frequency
    const newFrequency = Math.round(MIN_FREQUENCY + (angleDeg / ROTATION_MULTIPLIER));
    
    // Update frequency state and tone generator
    setFrequency(newFrequency);
    getToneGenerator().setFrequency(newFrequency);
    
    if (onFrequencyChange) {
      onFrequencyChange(newFrequency);
    }
    
    checkSpecialFrequency(newFrequency);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleDialUpdate(e.clientX, e.clientY);
    
    const handleMouseMove = (e: MouseEvent) => {
      handleDialUpdate(e.clientX, e.clientY);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    handleDialUpdate(touch.clientX, touch.clientY);
    
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleDialUpdate(touch.clientX, touch.clientY);
    };
    
    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const checkSpecialFrequency = (freq: number) => {
    // Find if we're at or very close to a special frequency
    const special = frequencies.find(f => Math.abs(f.hz - freq) < 2);
    setSpecialFrequency(special || null);
    setIsAtSpecial(!!special);

    // If we're close to a special frequency, snap to it
    if (special && freq !== special.hz) {
      setFrequency(special.hz);
      getToneGenerator().setFrequency(special.hz);
      
      // Update rotation to match the special frequency
      const newRotation = ((special.hz - MIN_FREQUENCY) / FREQUENCY_RANGE) * 270;
      setRotation(newRotation);
      
      if (onFrequencyChange) {
        onFrequencyChange(special.hz);
      }
    }
  };

  // Helper function to get gradient positions for special frequencies
  const getSpecialFrequencyMarkers = () => {
    return specialFrequencies.map(hz => {
      const percentage = ((hz - MIN_FREQUENCY) / FREQUENCY_RANGE) * 270;
      return {
        hz,
        rotation: percentage,
        isActive: Math.abs(hz - frequency) < 2
      };
    });
  };

  const markers = getSpecialFrequencyMarkers();

  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex items-center justify-center">
          <div 
            className={cn(
              "text-2xl font-bold transition-all duration-300 ease-out",
              isAtSpecial && "scale-110 text-primary"
            )}
          >
            {frequency} Hz
          </div>
          <InfoPopover
            title="About Sound Frequencies"
            content={
              <div>
                <p>Turn the dial to adjust the sound frequency measured in Hertz (Hz).</p>
                <p className="mt-2">Look for the markers indicating special frequencies with unique properties.</p>
              </div>
            }
            triggerClassName="ml-2"
          />
        </div>

        {/* Dial container */}
        <div 
          ref={dialRef}
          className="relative w-64 h-64 flex items-center justify-center"
        >
          {/* Dial background */}
          <div className="absolute inset-0 bg-secondary rounded-full overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-noise opacity-10" />
            
            {/* Special frequency markers */}
            {markers.map(({ hz, rotation, isActive }) => (
              <div 
                key={hz}
                className={cn(
                  "absolute w-1.5 h-5 bg-primary/50 rounded-full transition-all duration-300",
                  isActive && "bg-primary w-2 h-7"
                )}
                style={{ 
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center bottom',
                  transform: `translate(-50%, -100%) rotate(${rotation}deg) translateY(-5rem)`
                }}
              />
            ))}
            
            {/* Frequency label arc */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <path
                d="M100,20 A80,80 0 1,1 20,100"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="24"
                strokeLinecap="round"
              />
              {/* Labels */}
              <text x="30" y="100" className="text-xs fill-muted-foreground">100Hz</text>
              <text x="170" y="100" className="text-xs fill-muted-foreground">1000Hz</text>
            </svg>
          </div>
          
          {/* Dial knob */}
          <motion.div
            className={cn(
              "absolute w-48 h-48 bg-white rounded-full shadow-neo border-4 border-border/50 flex items-center justify-center cursor-grab transition-all duration-200",
              isDragging && "cursor-grabbing shadow-neo-sm border-primary/20 scale-[0.98]"
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ 
              filter: isDragging ? 'brightness(0.98)' : 'brightness(1)' 
            }}
          >
            <div className="absolute inset-0 bg-noise opacity-5 rounded-full" />
            
            {/* Indicator */}
            <motion.div 
              className="absolute top-6 left-1/2 -translate-x-1/2 w-1 h-6 bg-primary rounded-full"
              style={{ rotate: rotation }}
            />
            
            {/* Center */}
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center"
            onClick={() => {
              // Trigger a predefined frequency
              const solfeggio = 528; // "Miracle" frequency
              setFrequency(solfeggio);
              getToneGenerator().setFrequency(solfeggio);
              const newRotation = ((solfeggio - MIN_FREQUENCY) / FREQUENCY_RANGE) * 270;
              setRotation(newRotation);
              checkSpecialFrequency(solfeggio);
            }}
          >
            <ArrowUp className="h-3 w-3 mr-1" />
            Solfeggio
          </Button>
        </div>

        {/* Special frequency information */}
        <AnimatePresence>
          {isAtSpecial && specialFrequency && (
            <motion.div 
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-primary/10 shadow-neo-sm overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-primary">{specialFrequency.name} ({specialFrequency.hz} Hz)</h4>
                  <p className="text-sm mt-1 text-muted-foreground">{specialFrequency.description}</p>
                </div>
              </div>
              {specialFrequency.benefits.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Reported Benefits</h5>
                  <div className="flex flex-wrap gap-2">
                    {specialFrequency.benefits.slice(0, 3).map((benefit, index) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="text-xs py-1 px-2 bg-primary/10 text-primary"
                      >
                        {benefit}
                      </Badge>
                    ))}
                    {specialFrequency.benefits.length > 3 && (
                      <InfoPopover
                        triggerClassName="text-xs py-1 px-2 bg-primary/5 text-primary rounded-full flex items-center"
                        title={`${specialFrequency.name} Benefits`}
                        content={
                          <ul className="list-disc ml-5 space-y-1">
                            {specialFrequency.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        }
                      >
                        +{specialFrequency.benefits.length - 3} more
                      </InfoPopover>
                    )}
                  </div>
                </div>
              )}
              {specialFrequency.references && specialFrequency.references.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">Research References</h5>
                  <div className="text-xs text-muted-foreground">
                    <InfoPopover
                      triggerClassName="text-xs underline text-primary/80 hover:text-primary"
                      title="Research References"
                      content={
                        <ul className="space-y-3">
                          {specialFrequency.references.map((ref, index) => (
                            <li key={index} className="text-sm">
                              <p className="font-medium">{ref.title}</p>
                              <p className="text-xs mt-1">{ref.authors} ({ref.year})</p>
                              {ref.publisher && <p className="text-xs italic">{ref.publisher}</p>}
                              {ref.url && (
                                <a 
                                  href={ref.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary block mt-1 hover:underline"
                                >
                                  View Source
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      }
                    >
                      View {specialFrequency.references.length} research sources
                    </InfoPopover>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DialFrequencySlider;
