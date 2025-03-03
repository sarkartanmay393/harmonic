
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Video, Headphones, FileAudio, Play, Pause } from 'lucide-react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { getToneGenerator } from '@/lib/audio';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'sound' | 'music' | 'video';
  url: string;
  thumbnail: string;
  duration: string;
  frequency?: number;
  artist?: string;
}

const mediaLibrary: MediaItem[] = [
  {
    id: 'sound-1',
    title: '528 Hz Pure Tone',
    description: 'A clean 528 Hz sine wave for meditation and healing',
    type: 'sound',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '3:00',
    frequency: 528
  },
  {
    id: 'sound-2',
    title: '432 Hz Pure Tone',
    description: 'A tuning frequency that resonates with nature',
    type: 'sound',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1464639351491-a172c2aa2911?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '5:00',
    frequency: 432
  },
  {
    id: 'sound-3',
    title: '963 Hz Crown Chakra',
    description: 'Activates the crown chakra and connects to higher consciousness',
    type: 'sound',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '10:00',
    frequency: 963
  },
  {
    id: 'music-1',
    title: 'Healing Meditation',
    description: 'A gentle composition featuring the 528 Hz frequency',
    type: 'music',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '15:30',
    artist: 'Harmony Soundscapes'
  },
  {
    id: 'music-2',
    title: 'Deep Relaxation',
    description: 'Ambient music tuned to 432 Hz for deep relaxation and sleep',
    type: 'music',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '20:15',
    artist: 'Celestial Sounds'
  },
  {
    id: 'music-3',
    title: 'Chakra Alignment',
    description: 'A journey through all seven chakra frequencies',
    type: 'music',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '45:00',
    artist: 'Vibration Masters'
  },
  {
    id: 'video-1',
    title: 'The Science of Sound Healing',
    description: 'An educational documentary exploring the science behind frequency healing',
    type: 'video',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '22:15'
  },
  {
    id: 'video-2',
    title: 'Frequency Meditation Guide',
    description: 'A guided meditation tutorial using specific healing frequencies',
    type: 'video',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1526746323784-6bc814d79273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '18:45'
  },
  {
    id: 'video-3',
    title: 'Ancient Sound Bowls',
    description: 'A demonstration of Tibetan singing bowls and their frequencies',
    type: 'video',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1583526315281-8c11faca2f9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    duration: '15:30'
  }
];

const MediaLibrary = () => {
  const [playingItemId, setPlayingItemId] = useState<string | null>(null);
  
  const playSound = (item: MediaItem) => {
    const toneGenerator = getToneGenerator();
    
    if (playingItemId === item.id) {
      // Stop playing
      toneGenerator.stop();
      setPlayingItemId(null);
    } else {
      // Stop any currently playing tone
      if (playingItemId) {
        toneGenerator.stop();
      }
      
      // Play the new frequency if it's a 'sound' type with frequency
      if (item.type === 'sound' && item.frequency) {
        toneGenerator.play(item.frequency);
        setPlayingItemId(item.id);
      } else {
        // For music and videos, we'd normally play the audio/video file
        // But for now, just simulate with a toast
        setPlayingItemId(item.id);
        
        // Simulate playing for 3 seconds then stopping
        setTimeout(() => {
          setPlayingItemId(null);
        }, 3000);
      }
    }
  };

  // Group media by type
  const sounds = mediaLibrary.filter(item => item.type === 'sound');
  const music = mediaLibrary.filter(item => item.type === 'music');
  const videos = mediaLibrary.filter(item => item.type === 'video');

  return (
    <Layout>
      <div className="pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 sm:px-6"
        >
          <div className="mb-12 text-center">
            <motion.h1 
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Media Library
            </motion.h1>
            <motion.p 
              className="mt-3 text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explore our collection of healing sounds, music, and educational videos
            </motion.p>
          </div>

          <Tabs defaultValue="sounds" className="space-y-8">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="sounds" className="flex items-center gap-2">
                <FileAudio className="h-4 w-4" />
                <span>Sounds</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span>Music</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>Videos</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="sounds" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sounds.map((sound) => (
                  <motion.div 
                    key={sound.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: sounds.indexOf(sound) * 0.1 }}
                  >
                    <Card className={`overflow-hidden transition-all duration-300 ${playingItemId === sound.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}>
                      <div className="relative">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={sound.thumbnail} 
                            alt={sound.title}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                        <Button
                          size="icon"
                          className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white text-primary hover:bg-white/90 shadow-lg"
                          onClick={() => playSound(sound)}
                        >
                          {playingItemId === sound.id ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5 ml-0.5" />
                          )}
                        </Button>
                        
                        <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {sound.duration}
                        </div>
                        
                        {sound.frequency && (
                          <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs px-2 py-1 rounded">
                            {sound.frequency} Hz
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{sound.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{sound.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="music" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {music.map((track) => (
                  <motion.div 
                    key={track.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: music.indexOf(track) * 0.1 }}
                  >
                    <Card className={`overflow-hidden transition-all duration-300 ${playingItemId === track.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}>
                      <div className="relative">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={track.thumbnail} 
                            alt={track.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </AspectRatio>
                        
                        <Button
                          size="icon"
                          className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white text-primary hover:bg-white/90 shadow-lg"
                          onClick={() => playSound(track)}
                        >
                          {playingItemId === track.id ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5 ml-0.5" />
                          )}
                        </Button>
                        
                        <div className="absolute bottom-3 left-3 text-white flex items-center">
                          <Headphones className="h-4 w-4 mr-1" />
                          <span className="text-xs">{track.duration}</span>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{track.title}</h3>
                        {track.artist && (
                          <p className="text-xs text-muted-foreground mt-1">By {track.artist}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2">{track.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="videos" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <motion.div 
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: videos.indexOf(video) * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="h-14 w-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                              <Play className="h-6 w-6 text-primary ml-1" />
                            </div>
                          </div>
                        </AspectRatio>
                        
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </Layout>
  );
};

export default MediaLibrary;
