
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Lightbulb } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import FrequencyPlayer from '@/components/FrequencyPlayer';
import FrequencyCard from '@/components/FrequencyCard';
import { frequencies } from '@/lib/frequencies';
import { getToneGenerator } from '@/lib/audio';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [playingFrequencyId, setPlayingFrequencyId] = useState<string | null>(null);
  const [activeFrequency, setActiveFrequency] = useState(432);
  const [showTip, setShowTip] = useState(true);
  const isMobile = useIsMobile();

  const toggleFrequency = (id: string) => {
    const toneGenerator = getToneGenerator();
    const frequency = frequencies.find(f => f.id === id);
    
    if (!frequency) return;
    
    if (playingFrequencyId === id) {
      // Stop playing
      toneGenerator.stop();
      setPlayingFrequencyId(null);
    } else {
      // Stop any currently playing frequency
      if (playingFrequencyId) {
        toneGenerator.stop();
      }
      
      // Play the new frequency
      toneGenerator.play(frequency.hz);
      setPlayingFrequencyId(id);
      setActiveFrequency(frequency.hz);
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      const toneGenerator = getToneGenerator();
      if (toneGenerator.isCurrentlyPlaying()) {
        toneGenerator.stop();
      }
    };
  }, []);

  // Animation variants for staggered cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Different frequency categories
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'healing', label: 'Healing' },
    { id: 'meditation', label: 'Meditation' },
    { id: 'ancient', label: 'Ancient' },
    { id: 'spiritual', label: 'Spiritual' }
  ];
  
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredFrequencies = activeCategory === 'all'
    ? frequencies
    : frequencies.filter(f => f.category === activeCategory);

  return (
    <div className="py-6 sm:pt-12 pb-20">
      <div className="px-4 md:px-6">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Harmonic Frequency
          </motion.h1>
          <motion.p 
            className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Experience the power of vibrational frequencies for wellness, relaxation, and spiritual growth.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 max-w-6xl mx-auto">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FrequencyPlayer 
                initialFrequency={activeFrequency} 
                className="h-full"
              />
            </motion.div>
          </div>
          
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-card border border-border/50 rounded-xl p-5 shadow-neo-sm h-full"
            >
              <div className="flex items-start mb-4">
                <div className="mr-4 bg-primary/10 rounded-full p-3">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Sound as Universal Force</h3>
                  <p className="text-muted-foreground text-sm">
                    From ancient Eastern philosophy to modern quantum physics, sound has been recognized as a fundamental creative force in the universe.
                  </p>
                  <div className="mt-4">
                    <div className="text-sm">
                      <blockquote className="italic border-l-2 border-primary/30 pl-4 py-1">
                        "In the beginning was the Word... and the Word was God."
                        <footer className="mt-1 text-xs text-muted-foreground">- John 1:1, Bible</footer>
                      </blockquote>
                      
                      <blockquote className="italic border-l-2 border-primary/30 pl-4 py-1 mt-3">
                        "Nada Brahma - The World is Sound"
                        <footer className="mt-1 text-xs text-muted-foreground">- Ancient Vedic teaching</footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
              
              {showTip && (
                <motion.div 
                  className="bg-primary/5 rounded-lg p-4 relative mt-4"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-6 w-6 text-muted-foreground"
                    onClick={() => setShowTip(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <h4 className="text-sm font-medium mb-2">Did you know?</h4>
                  <p className="text-xs text-muted-foreground">
                    The Schumann Resonance (7.83 Hz) is Earth's electromagnetic "heartbeat" and has been found to influence human brain activity and well-being.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="mb-20 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Explore Frequencies</h2>
              <p className="text-muted-foreground mt-1">
                Discover frequencies with special properties and historical significance.
              </p>
            </div>
            <LayoutGrid className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="mb-6"
          >
            <TabsList>
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <motion.div 
            className={cn(
              "grid gap-6",
              isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-3"
            )}
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredFrequencies.map((frequency) => (
              <motion.div key={frequency.id} variants={item}>
                <FrequencyCard
                  frequency={frequency}
                  isPlaying={playingFrequencyId === frequency.id}
                  onPlayToggle={toggleFrequency}
                  className={cn(
                    "h-full",
                    playingFrequencyId === frequency.id && "shadow-neo"
                  )}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
