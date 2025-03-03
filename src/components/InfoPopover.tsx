
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InfoPopoverProps {
  title: string;
  content: React.ReactNode;
  triggerClassName?: string;
  children?: React.ReactNode;
}

const InfoPopover: React.FC<InfoPopoverProps> = ({ 
  title, 
  content,
  triggerClassName,
  children
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button 
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors focus:outline-none", 
            triggerClassName
          )}
          aria-label="Show information"
        >
          {children || <Info className="h-4 w-4" />}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 overflow-hidden animate-scale-in bg-card shadow-lg border border-border/50"
        sideOffset={5}
        align="center"
      >
        <div className="flex flex-col">
          <div className="bg-primary/5 px-4 py-3 border-b border-border/50">
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
          <div className="p-4 text-sm text-card-foreground/90 space-y-2">
            {content}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InfoPopover;
