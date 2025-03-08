
import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, RotateCcw } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getToneGenerator } from '@/lib/audio';
import FrequencySlider from './FrequencySlider';
import DialFrequencySlider from './DialFrequencySlider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FrequencyPlayerProps {
  initialFrequency?: number;
  className?: string;
}

const FrequencyPlayer: React.FC<FrequencyPlayerProps> = ({
  initialFrequency = 432,
  className
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentFrequency, setCurrentFrequency] = useState(initialFrequency);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sliderType, setSliderType] = useState<'dial' | 'linear'>('dial');

  // Initialize audio on component mount
  useEffect(() => {
    const toneGenerator = getToneGenerator();
    
    // Set up the initial frequency
    toneGenerator.setFrequency(initialFrequency);
    
    // Clean up on component unmount
    return () => {
      if (toneGenerator.isCurrentlyPlaying()) {
        toneGenerator.stop();
      }
    };
  }, [initialFrequency]);

  const togglePlayback = useCallback(() => {
    const toneGenerator = getToneGenerator();
    
    if (isPlaying) {
      toneGenerator.stop();
    } else {
      toneGenerator.play(currentFrequency);
    }
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentFrequency]);

  const handleVolumeChange = useCallback((values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
    getToneGenerator().setVolume(newVolume);
  }, []);

  const handleFrequencyChange = useCallback((frequency: number) => {
    setCurrentFrequency(frequency);
  }, []);

  const resetFrequency = useCallback(() => {
    setCurrentFrequency(432);
    getToneGenerator().setFrequency(432);
  }, []);

  // Determine which volume icon to show
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className={cn(
      "rounded-xl border border-border/50 bg-white shadow-neo-sm overflow-hidden transition-all duration-300",
      className
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Frequency Player</h2>
          <Tabs 
            value={sliderType} 
            onValueChange={(value) => setSliderType(value as 'dial' | 'linear')}
            className="h-8"
          >
            <TabsList className="h-8 p-0.5">
              <TabsTrigger value="dial" className="h-7 px-3 text-xs">
                Dial
              </TabsTrigger>
              <TabsTrigger value="linear" className="h-7 px-3 text-xs">
                Slider
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Tabs value={sliderType} className="mb-8">
          <TabsContent value="dial" className="mt-0">
            <DialFrequencySlider 
              initialFrequency={currentFrequency}
              onFrequencyChange={handleFrequencyChange}
            />
          </TabsContent>
          <TabsContent value="linear" className="mt-0">
            <FrequencySlider 
              initialFrequency={currentFrequency}
              onFrequencyChange={handleFrequencyChange}
            />
          </TabsContent>
        </Tabs>
        
        <div className="space-y-6">
          {/* Play/Pause Button */}
          <div className="flex items-center justify-center space-x-3">
            <Button
              size="icon"
              variant="outline"
              onClick={resetFrequency}
              className="h-10 w-10 rounded-full"
              title="Reset to 432 Hz"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button
              onClick={togglePlayback}
              className={cn(
                "h-16 w-16 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300",
                isAnimating && "scale-95"
              )}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8 text-primary-foreground" />
              ) : (
                <Play className="h-8 w-8 text-primary-foreground ml-1" />
              )}
            </Button>
          </div>
          
          {/* Visualization */}
          {isPlaying && (
            <div className="frequency-wave-container">
              <div className="frequency-wave frequency-wave-1" style={{ height: `${Math.random() * 24 + 8}px` }}></div>
              <div className="frequency-wave frequency-wave-2" style={{ height: `${Math.random() * 24 + 8}px` }}></div>
              <div className="frequency-wave frequency-wave-3" style={{ height: `${Math.random() * 32 + 8}px` }}></div>
              <div className="frequency-wave frequency-wave-4" style={{ height: `${Math.random() * 32 + 8}px` }}></div>
              <div className="frequency-wave frequency-wave-5" style={{ height: `${Math.random() * 24 + 8}px` }}></div>
            </div>
          )}
          
          {/* Volume Control */}
          <div className="flex items-center space-x-4">
            <VolumeIcon className="h-5 w-5 text-muted-foreground" />
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequencyPlayer;
