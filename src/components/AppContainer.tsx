import React from 'react';
import SoundAssistant from './SoundAssistant';
import { cn } from '@/lib/utils';
import Header from './Header';
import { Outlet } from 'react-router-dom';

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-background to-background/90 overflow-hidden">
      {/* Noise overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-repeat bg-noise" />

      {/* App container with fixed dimensions */}
      <div
        className={cn(
          "relative z-10 flex flex-col w-full overflow-hidden bg-background",
          "transition-all duration-500"
        )}
      >
        {/* App Header */}
        <Header />

        {/* App content */}
        <div className="flex-1 overflow-auto pt-28 pb-12">
          {children || <Outlet />}
        </div>

        {/* Fixed assistant button */}
        <SoundAssistant />
      </div>
    </div>
  );
};

export default AppContainer;
