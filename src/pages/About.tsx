
import React from 'react';
import { motion } from 'framer-motion';
import { Music, Globe, Heart, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const features = [
    {
      title: "Sound Healing",
      description: "Experience the therapeutic effects of specific sound frequencies, used for centuries in various cultures to promote wellness and balance.",
      icon: <Music className="h-6 w-6 text-primary" />
    },
    {
      title: "Global Traditions",
      description: "Explore frequencies from diverse healing traditions around the world, from ancient Solfeggio tones to modern sound therapy techniques.",
      icon: <Globe className="h-6 w-6 text-primary" />
    },
    {
      title: "Wellness Support",
      description: "Use specific frequencies to support relaxation, focus, meditation, and emotional balance in your daily practice.",
      icon: <Heart className="h-6 w-6 text-primary" />
    },
    {
      title: "Consciousness Expansion",
      description: "Some frequencies are associated with enhanced awareness and spiritual awakening, helping to expand consciousness.",
      icon: <Sparkles className="h-6 w-6 text-primary" />
    }
  ];

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

  return (
    <Layout>
      <div className="pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 mb-12">
            <motion.h1 
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              About Harmonic Frequency
            </motion.h1>
            <motion.p 
              className="mt-3 text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Exploring the science and wisdom of vibrational sound therapy
            </motion.p>
          </div>

          <div className="px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              <h2>Our Mission</h2>
              <p>
                Harmonic Frequency aims to provide an accessible platform for experiencing and 
                learning about sound frequencies that have been used across cultures and throughout 
                history for healing, meditation, and expanding consciousness.
              </p>
              <p>
                Our carefully curated selection of frequencies is based on both traditional wisdom 
                and contemporary research into the effects of sound on the human mind and body.
              </p>

              <Separator className="my-8" />

              <h2>The Power of Frequency</h2>
              <p>
                Sound is vibration, and every vibration has its own frequency measured in Hertz (Hz). 
                Different frequencies affect our bodies and minds in unique ways through a process 
                known as entrainment, where our brainwaves and bodily rhythms synchronize with 
                external stimuli.
              </p>
              <p>
                Certain frequencies hold special significance:
              </p>
              <ul>
                <li>
                  <strong>432 Hz</strong> - Known as "Verdi's A," this frequency is said to be 
                  mathematically consistent with the patterns of the universe and was the standard 
                  concert pitch for classical musicians until relatively recently.
                </li>
                <li>
                  <strong>528 Hz</strong> - Often called the "Miracle Tone" or "Love Frequency," 
                  it's associated with healing DNA and promoting transformation.
                </li>
                <li>
                  <strong>396 Hz</strong> - This frequency is linked to liberating fear and guilt, 
                  helping to remove subconscious blockages.
                </li>
              </ul>

              <Separator className="my-8" />
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-card border border-border/50 rounded-lg p-6 shadow-neo-sm"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Disclaimer: While many people report positive experiences with sound frequency therapy, 
                these claims have not been fully evaluated by scientific research. This application is 
                intended for relaxation and meditation purposes only and is not meant to diagnose, treat, 
                cure, or prevent any disease.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
