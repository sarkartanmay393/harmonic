
import React, { useState, useEffect, useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import { getToneGenerator } from '@/lib/audio';
import InfoPopover from './InfoPopover';
import { cn } from '@/lib/utils';
import { frequencies } from '@/lib/frequencies';

interface FrequencySliderProps {
  initialFrequency?: number;
  onFrequencyChange?: (frequency: number) => void;
  className?: string;
}

const FrequencySlider: React.FC<FrequencySliderProps> = ({
  initialFrequency = 432,
  onFrequencyChange,
  className
}) => {
  const [frequency, setFrequency] = useState(initialFrequency);
  const [isAtSpecial, setIsAtSpecial] = useState(false);
  const [specialFrequency, setSpecialFrequency] = useState<typeof frequencies[0] | null>(null);
  const [isSnapping, setIsSnapping] = useState(false);
  const debounceTimeout = useRef<number | null>(null);

  const specialFrequencies = frequencies.map(f => f.hz);

  const checkSpecialFrequency = (freq: number) => {
    // Find if we're at or very close to a special frequency
    const special = frequencies.find(f => Math.abs(f.hz - freq) < 2);
    setSpecialFrequency(special || null);
    setIsAtSpecial(!!special);

    // If we're close to a special frequency but not exactly on it, snap to it
    if (special && freq !== special.hz) {
      setIsSnapping(true);
      
      // Clear any existing timeouts
      if (debounceTimeout.current) {
        window.clearTimeout(debounceTimeout.current);
      }
      
      // Set a small delay before snapping to avoid jumpiness
      debounceTimeout.current = window.setTimeout(() => {
        setFrequency(special.hz);
        getToneGenerator().setFrequency(special.hz);
        if (onFrequencyChange) {
          onFrequencyChange(special.hz);
        }
        
        // Clear snapping state after animation time
        setTimeout(() => setIsSnapping(false), 300);
      }, 100);
    }
  };

  const handleFrequencyChange = (values: number[]) => {
    const newFrequency = values[0];
    setFrequency(newFrequency);
    getToneGenerator().setFrequency(newFrequency);
    
    if (onFrequencyChange) {
      onFrequencyChange(newFrequency);
    }
    
    checkSpecialFrequency(newFrequency);
  };

  // Check for special frequency on initial load
  useEffect(() => {
    checkSpecialFrequency(initialFrequency);
  }, [initialFrequency]);

  // Clean up any timeouts on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        window.clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">Frequency</h3>
          <InfoPopover
            title="About Sound Frequencies"
            content={
              <div>
                <p>Adjust the slider to change the sound frequency measured in Hertz (Hz).</p>
                <p className="mt-2">Certain frequencies are believed to have special properties:</p>
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li><strong>432 Hz:</strong> Known as "Verdi's A", thought to resonate with nature</li>
                  <li><strong>528 Hz:</strong> "Miracle tone", associated with DNA repair</li>
                  <li><strong>639 Hz:</strong> Enhances interpersonal connections</li>
                </ul>
              </div>
            }
          />
        </div>
        <div 
          className={cn(
            "text-sm font-semibold transition-all duration-300 ease-out",
            isAtSpecial && "scale-110 text-primary"
          )}
        >
          {frequency} Hz
        </div>
      </div>

      <div className="px-1 relative">
        <Slider
          onValueChange={handleFrequencyChange}
          value={[frequency]}
          min={100}
          max={1000}
          step={1}
          className={cn(
            "transition-all duration-200",
            isAtSpecial && "z-10"
          )}
        />
        
        {/* Special frequency markers */}
        <div className="absolute inset-0 pointer-events-none">
          {specialFrequencies.map((hz) => (
            <div 
              key={hz}
              className={cn(
                "absolute top-1/2 h-2 w-2 rounded-full -translate-y-1/2 bg-primary transition-all duration-300",
                frequency === hz ? "opacity-100 scale-125" : "opacity-40 scale-100"
              )}
              style={{ 
                left: `${((hz - 100) / 900) * 100}%`,
                transform: `translateX(-50%) translateY(-50%) scale(${frequency === hz ? 1.25 : 1})` 
              }}
            />
          ))}
        </div>
      </div>

      {/* Special frequency information */}
      {isAtSpecial && specialFrequency && (
        <div 
          className={cn(
            "bg-secondary/50 backdrop-blur-sm rounded-lg p-4 border border-primary/10 shadow-neo-sm",
            "transition-all duration-300 ease-out animate-scale-in"
          )}
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
                  <span 
                    key={index} 
                    className="text-xs py-1 px-2 bg-primary/10 text-primary rounded-full"
                  >
                    {benefit}
                  </span>
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
        </div>
      )}
    </div>
  );
};

export default FrequencySlider;
