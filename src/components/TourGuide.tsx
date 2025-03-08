
import React, { useState } from 'react';
import { X, Info, ArrowRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface TourStep {
  title: string;
  description: string;
  position: 'left' | 'right' | 'bottom' | 'top';
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to Harmonic Frequency",
    description: "Discover the healing power of sound frequencies for your mind, body, and spirit.",
    position: "bottom"
  },
  {
    title: "Frequency Player",
    description: "Use our interactive slider to adjust and play the exact frequency you need.",
    position: "right"
  },
  {
    title: "Special Frequencies",
    description: "Explore ancient and healing frequencies with documented benefits.",
    position: "left"
  },
  {
    title: "Sound Assistant",
    description: "Chat with our AI to learn more about sound healing and spirituality.",
    position: "bottom"
  },
];

const TourGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = useIsMobile();
  
  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };
  
  const isLastStep = currentStep === tourSteps.length - 1;
  
  return (
    <>
      {/* Tour trigger button */}
      <Button
        size="icon"
        variant="outline"
        className="fixed bottom-4 right-4 z-50 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
        onClick={() => setIsOpen(true)}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`relative max-w-md p-6 m-4 bg-card rounded-xl shadow-lg border border-border/30`}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Info className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">
                  {tourSteps[currentStep].title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {tourSteps[currentStep].description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {tourSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full ${
                        index === currentStep ? "bg-primary" : "bg-primary/20"
                      }`}
                    />
                  ))}
                </div>
                
                <Button onClick={handleNext}>
                  {isLastStep ? "Get Started" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TourGuide;
