
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/Layout';
import FrequencySlider from '@/components/FrequencySlider';
import { getFrequencyById } from '@/lib/frequencies';
import { getToneGenerator } from '@/lib/audio';

const FrequencyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(getFrequencyById(id || ''));

  useEffect(() => {
    if (!frequency) {
      navigate('/');
      return;
    }

    // Set up the frequency
    const toneGenerator = getToneGenerator();
    toneGenerator.setFrequency(frequency.hz);
    
    // Clean up on component unmount
    return () => {
      if (toneGenerator.isCurrentlyPlaying()) {
        toneGenerator.stop();
      }
    };
  }, [frequency, navigate]);

  if (!frequency) {
    return null;
  }

  const togglePlayback = () => {
    const toneGenerator = getToneGenerator();
    
    if (isPlaying) {
      toneGenerator.stop();
    } else {
      toneGenerator.play(frequency.hz);
    }
    
    setIsPlaying(!isPlaying);
  };

  return (
    <Layout>
      <div className="pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <Button
            variant="ghost"
            className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <AspectRatio ratio={4/3} className="bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={frequency.imageUrl} 
                    alt={frequency.name}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-lg border border-border/50 p-5 shadow-neo-sm"
              >
                <h3 className="font-medium text-lg mb-3">Origin</h3>
                <p className="text-muted-foreground">{frequency.origin}</p>
                
                <div className="mt-4 flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{frequency.location.name}</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center">
                  <Badge className="mr-3">{frequency.hz} Hz</Badge>
                  <h3 className="text-sm text-muted-foreground">
                    {frequency.category.charAt(0).toUpperCase() + frequency.category.slice(1)} Frequency
                  </h3>
                </div>
                <h1 className="text-3xl font-bold mt-2">{frequency.name}</h1>
                <p className="text-muted-foreground mt-3">{frequency.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium text-lg mb-3">Reported Benefits</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {frequency.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-3" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <Button
                  onClick={togglePlayback}
                  className="w-full py-6 text-lg"
                  size="lg"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="mr-2 h-5 w-5" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" /> Play {frequency.hz} Hz
                    </>
                  )}
                </Button>

                <div className="mt-5">
                  {isPlaying && (
                    <div className="frequency-wave-container">
                      <div className="frequency-wave frequency-wave-1" style={{ height: `${Math.random() * 24 + 8}px` }}></div>
                      <div className="frequency-wave frequency-wave-2" style={{ height: `${Math.random() * 24 + 8}px` }}></div>
                      <div className="frequency-wave frequency-wave-3" style={{ height: `${Math.random() * 32 + 8}px` }}></div>
                      <div className="frequency-wave frequency-wave-4" style={{ height: `${Math.random() * 32 + 8}px` }}></div>
                      <div className="frequency-wave frequency-wave-5" style={{ height: `${Math.random() * 24 + 8}px` }}></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <FrequencySlider initialFrequency={frequency.hz} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default FrequencyDetail;
