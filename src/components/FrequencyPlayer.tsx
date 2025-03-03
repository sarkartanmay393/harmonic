
import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getToneGenerator } from '@/lib/audio';
import FrequencySlider from './FrequencySlider';

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

  const togglePlayback = () => {
    const toneGenerator = getToneGenerator();
    
    if (isPlaying) {
      toneGenerator.stop();
    } else {
      toneGenerator.play(currentFrequency);
    }
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
    getToneGenerator().setVolume(newVolume);
  };

  const handleFrequencyChange = (frequency: number) => {
    setCurrentFrequency(frequency);
  };

  // Determine which volume icon to show
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className={cn(
      "rounded-xl border border-border/50 bg-white shadow-neo-sm overflow-hidden",
      className
    )}>
      <div className="p-6">
        <FrequencySlider 
          initialFrequency={initialFrequency}
          onFrequencyChange={handleFrequencyChange}
        />
        
        <div className="mt-8 space-y-6">
          {/* Play/Pause Button */}
          <div className="flex justify-center">
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
