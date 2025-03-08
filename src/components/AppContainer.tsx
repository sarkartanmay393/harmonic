
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import SoundAssistant from './SoundAssistant';
import { cn } from '@/lib/utils';

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-background to-background/90 overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-repeat bg-noise" />
      
      {/* App container with fixed dimensions */}
      <div 
        className={cn(
          "relative z-10 flex flex-col w-full overflow-hidden bg-background border border-primary/10 shadow-neo",
          "transition-all duration-500",
          isMobile ? "h-[100svh] rounded-none" : "h-[90vh] max-w-6xl max-h-[900px] rounded-2xl"
        )}
      >
        {/* App content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>

        {/* Fixed assistant button */}
        <SoundAssistant />
      </div>
    </div>
  );
};

export default AppContainer;
