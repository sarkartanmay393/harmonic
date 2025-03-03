
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Frequency } from '@/lib/frequencies';
import { getToneGenerator } from '@/lib/audio';

interface FrequencyCardProps {
  frequency: Frequency;
  isPlaying?: boolean;
  onPlayToggle?: (id: string) => void;
  className?: string;
}

const FrequencyCard: React.FC<FrequencyCardProps> = ({
  frequency,
  isPlaying = false,
  onPlayToggle,
  className
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onPlayToggle) {
      onPlayToggle(frequency.id);
    } else {
      // Standalone card behavior
      const toneGenerator = getToneGenerator();
      if (isPlaying) {
        toneGenerator.stop();
      } else {
        toneGenerator.play(frequency.hz);
      }
    }
  };

  return (
    <Link
      to={`/frequency/${frequency.id}`}
      className={cn(
        "block rounded-xl overflow-hidden transition-all duration-300 bg-card border border-border/50",
        "hover:shadow-neo-sm hover:-translate-y-1",
        isPlaying && "ring-2 ring-primary ring-offset-2",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <img
            src={frequency.imageUrl}
            alt={frequency.name}
            className={cn(
              "object-cover w-full h-full transition-all duration-700",
              !isImageLoaded && "blur-sm scale-105"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </AspectRatio>
        
        <div className="absolute top-3 left-3">
          <Badge 
            className="bg-white/90 text-foreground hover:bg-white/80"
          >
            {frequency.hz} Hz
          </Badge>
        </div>
        
        <Button
          size="icon"
          className={cn(
            "absolute bottom-3 right-3 h-10 w-10 rounded-full",
            "bg-white hover:bg-white/90 text-primary shadow-md",
            isPlaying && "bg-primary hover:bg-primary/90 text-white"
          )}
          onClick={handlePlayToggle}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg leading-tight">{frequency.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{frequency.category.charAt(0).toUpperCase() + frequency.category.slice(1)} Frequency</p>
          </div>
        </div>
        
        <p className="mt-3 text-sm line-clamp-2 text-card-foreground/80">
          {frequency.description}
        </p>
        
        <div className={cn(
          "mt-4 flex items-center text-sm font-medium text-primary transition-all",
          isHovering ? "translate-x-1" : "translate-x-0"
        )}>
          View details
          <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default FrequencyCard;
