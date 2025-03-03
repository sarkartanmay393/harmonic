
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import Layout from '@/components/Layout';
import FrequencyPlayer from '@/components/FrequencyPlayer';
import FrequencyCard from '@/components/FrequencyCard';
import { frequencies } from '@/lib/frequencies';
import { getToneGenerator } from '@/lib/audio';
import { cn } from '@/lib/utils';

const Index = () => {
  const [playingFrequencyId, setPlayingFrequencyId] = useState<string | null>(null);
  const [activeFrequency, setActiveFrequency] = useState(432);

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

  const featuredFrequencies = frequencies.slice(0, 6);

  return (
    <Layout>
      <div className="pt-16 pb-12">
        <div className="max-w-2xl mx-auto text-center px-4 md:px-6">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Harmonic Frequency
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Experience the power of vibrational frequencies for wellness, relaxation, and meditation.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FrequencyPlayer 
            initialFrequency={activeFrequency} 
            className="mx-auto"
          />
        </motion.div>
      </div>

      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Featured Frequencies</h2>
            <p className="text-muted-foreground mt-1">
              Discover frequencies with special properties and historical significance.
            </p>
          </div>
          <LayoutGrid className="h-5 w-5 text-muted-foreground" />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {featuredFrequencies.map((frequency) => (
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
    </Layout>
  );
};

export default Index;
