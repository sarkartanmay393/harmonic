
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Mic, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const predefinedAnswers = [
  {
    question: "What is sound healing?",
    answer: "Sound healing is a practice that uses vibrational frequencies to help restore balance and harmony to the body. It's based on the principle that everything in the universe, including our bodies, is in a state of vibration. When these vibrations are disrupted, it can lead to disharmony and disease. Sound healing uses instruments, voice, or electronic sources to create frequencies that help realign your energy and promote healing."
  },
  {
    question: "Why is 432 Hz special?",
    answer: "432 Hz is considered by many to be mathematically consistent with the patterns of the universe. Some believe it's the frequency of nature itself. Proponents claim it creates a deeply calming effect, promotes emotional stability, and can help with spiritual growth. This frequency has historical significance, as some ancient instruments were tuned to this frequency before modern standardization changed concert pitch to 440 Hz."
  },
  {
    question: "How does sound affect the body?",
    answer: "Sound affects the body in multiple ways: it can alter brainwave states, changing them from beta (waking consciousness) to alpha (relaxed consciousness), theta (meditative state), or delta (sleep). Certain frequencies can entrain your heartbeat and breath rate, slowing them down. Sound vibrations can stimulate cellular movement, encouraging circulation and energy flow through the body. These vibrations may also influence the autonomic, immune, and endocrine systems."
  },
  {
    question: "Tell me about sound in spiritual traditions",
    answer: "Sound plays a central role in many spiritual traditions. In Hinduism, the sound 'Om' represents the primordial sound of creation. In Tibetan Buddhism, singing bowls and chanting are used to alter consciousness. Native American traditions use drumming to connect with spirit realms, while Gregorian chants in Christianity create sacred space. Many traditions believe sound is not just a physical phenomenon but a bridge between material and spiritual dimensions."
  }
];

const SoundAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am your Sound Guide. Ask me anything about sound healing, frequencies, and the spiritual aspects of sound.',
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      // Check for predefined answers first
      const matchedQuestion = predefinedAnswers.find(qa => 
        input.toLowerCase().includes(qa.question.toLowerCase())
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: matchedQuestion ? matchedQuestion.answer : "I'm still learning about sound healing and spirituality. Can you ask me something else about frequencies or sound meditation?",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Assistant trigger button */}
      <Button
        size="icon"
        className="fixed left-4 bottom-4 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-neo hover:bg-primary/90"
        onClick={() => setIsOpen(true)}
      >
        <Wand2 className="h-6 w-6" />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg h-[600px] mx-4 bg-card rounded-xl shadow-xl border border-border/30 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-border/50 bg-primary/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3 bg-primary/20">
                      <Bot className="h-5 w-5 text-primary" />
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Sound Guide</h3>
                      <p className="text-xs text-muted-foreground">Your spiritual sound assistant</p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Chat messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isBot 
                            ? 'bg-secondary text-foreground rounded-tl-none' 
                            : 'bg-primary text-primary-foreground rounded-tr-none'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Input area */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-border/50 bg-background">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-full shrink-0"
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about sound healing, frequencies..."
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 rounded-full shrink-0"
                    disabled={!input.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-3 flex gap-2 justify-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="text-xs py-1 h-auto"
                    onClick={() => setInput("What is sound healing?")}
                  >
                    Sound healing?
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="text-xs py-1 h-auto"
                    onClick={() => setInput("Why is 432 Hz special?")}
                  >
                    432 Hz?
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    className="text-xs py-1 h-auto"
                    onClick={() => setInput("Tell me about sound in spiritual traditions")}
                  >
                    Spiritual traditions
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SoundAssistant;
