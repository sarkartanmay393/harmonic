'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Music, MapPin, Library, PlusCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for header styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Music className="h-4 w-4 mr-1" />
    },
    {
      name: 'Map',
      path: '/map',
      icon: <MapPin className="h-4 w-4 mr-1" />
    },
    {
      name: 'Media',
      path: '/media',
      icon: <Library className="h-4 w-4 mr-1" />
    },
    {
      name: 'Add Frequency',
      path: '/add',
      icon: <PlusCircle className="h-4 w-4 mr-1" />
    },
    {
      name: 'About',
      path: '/about',
      icon: <Info className="h-4 w-4 mr-1" />
    }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full transition-all duration-300 z-50",
        isScrolled
          ? "bg-background/90 backdrop-blur-sm border-b border-border/40 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-primary/40 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-primary"></div>
              </div>
            </div>
            {/* Sound wave animation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-12 h-12 rounded-full border border-primary/30 animate-ping opacity-75"></div>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Harmonic</h1>
            <p className="text-[10px] -mt-1 text-muted-foreground">Frequency Explorer</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "relative transition-all flex items-center",
                      isActive && "text-primary-foreground"
                    )}
                  >
                    {item.icon}
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-md -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[80%] flex flex-col sm:max-w-xs">
              <div className="flex items-center justify-between pb-6 mb-6 border-b">
                <span className="font-semibold">Navigation</span>
                <Button size="icon" variant="ghost" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-3">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 text-sm rounded-md",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default Header;
