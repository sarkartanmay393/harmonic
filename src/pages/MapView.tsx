
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import Layout from '@/components/Layout';
import FrequencyCard from '@/components/FrequencyCard';
import { frequencies } from '@/lib/frequencies';
import { getToneGenerator } from '@/lib/audio';

const MapView = () => {
  const [playingFrequencyId, setPlayingFrequencyId] = useState<string | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState(frequencies[0]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

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
      setSelectedFrequency(frequency);

      // Center map on the frequency location
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [frequency.location.lng, frequency.location.lat],
          zoom: 4,
          duration: 2000
        });
      }
    }
  };

  // Initialize and clean up map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Dynamic import for mapboxgl
    import('mapbox-gl').then((mapboxgl) => {
      import('mapbox-gl/dist/mapbox-gl.css');

      // Normally we would use an environment variable for this
      // For demo purposes, using a temporary token - replace with your own for production
      mapboxgl.default.accessToken = 'pk.eyJ1IjoiZGV2ZWxvcGVyLWFjY291bnQiLCJhIjoiY2xqZ3F1ZnJrMGJ0YjNkbXh0OXN2bGc1ZCJ9.lk-GKJ1E3WHA7vrZTS8hWQ';

      // Create map
      const map = new mapboxgl.default.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [selectedFrequency.location.lng, selectedFrequency.location.lat],
        zoom: 1.5,
        projection: 'globe',
        attributionControl: false
      });

      map.on('style.load', () => {
        // Add atmosphere and fog
        map.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2
        });

        // Add markers for each frequency
        frequencies.forEach(freq => {
          // Create custom marker element
          const markerEl = document.createElement('div');
          markerEl.className = 'flex items-center justify-center';
          markerEl.style.width = '24px';
          markerEl.style.height = '24px';
          markerEl.style.borderRadius = '50%';
          markerEl.style.backgroundColor = freq.color;
          markerEl.style.border = '2px solid white';
          markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
          markerEl.style.cursor = 'pointer';

          // Create and add the marker
          const marker = new mapboxgl.default.Marker({
            element: markerEl,
            anchor: 'bottom'
          })
            .setLngLat([freq.location.lng, freq.location.lat])
            .addTo(map);

          // Create popup
          const popup = new mapboxgl.default.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 25,
            className: 'custom-popup'
          }).setHTML(`
            <div style="padding: 8px 12px;">
              <strong>${freq.name} (${freq.hz} Hz)</strong>
              <p style="margin: 4px 0 0 0; font-size: 12px;">${freq.location.name}</p>
            </div>
          `);

          // Add popup events
          markerEl.addEventListener('mouseenter', () => {
            marker.setPopup(popup);
            popup.addTo(map);
          });

          markerEl.addEventListener('mouseleave', () => {
            popup.remove();
          });

          markerEl.addEventListener('click', () => {
            toggleFrequency(freq.id);
          });

          markersRef.current.push(marker);
        });
      });

      mapRef.current = map;

      // Slow auto-rotation when idle
      const secondsPerRevolution = 120;
      let userInteracting = false;
      let spinEnabled = true;

      function spinGlobe() {
        if (!mapRef.current || userInteracting || !spinEnabled) return;
        const center = mapRef.current.getCenter();
        center.lng -= 0.25;
        mapRef.current.easeTo({ center, duration: 100, easing: n => n });
        requestAnimationFrame(spinGlobe);
      }

      // Start spinning when loaded
      map.on('load', () => {
        spinGlobe();
      });

      // Track user interaction
      map.on('mousedown', () => { userInteracting = true; });
      map.on('touchstart', () => { userInteracting = true; });

      map.on('mouseup', () => { userInteracting = false; });
      map.on('touchend', () => { userInteracting = false; });

      // Clean up on unmount
      return () => {
        mapRef.current?.remove();
        mapRef.current = null;
      };
    });
  }, []);

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      const toneGenerator = getToneGenerator();
      if (toneGenerator.isCurrentlyPlaying()) {
        toneGenerator.stop();
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 mb-8">
        <h1 className="text-3xl font-bold">Frequency Map</h1>
        <p className="mt-3 text-muted-foreground">
          Explore frequencies and their origins around the world
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[500px] rounded-xl overflow-hidden border border-border/50 relative"
          >
            <div ref={mapContainerRef} className="absolute inset-0" />

            {/* Attribution overlay */}
            <div className="absolute bottom-2 right-2 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
              © <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noopener noreferrer">Mapbox</a>
            </div>

            {/* Globe Icon Overlay */}
            <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md">
              <Globe className="h-5 w-5 text-primary" />
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FrequencyCard
              frequency={selectedFrequency}
              isPlaying={playingFrequencyId === selectedFrequency.id}
              onPlayToggle={toggleFrequency}
              className="sticky top-20"
            />
          </motion.div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">All Frequencies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {frequencies.map((frequency) => (
            <motion.div
              key={frequency.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * frequencies.indexOf(frequency) }}
              className="cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => toggleFrequency(frequency.id)}
            >
              <div
                className={`p-4 rounded-lg border ${playingFrequencyId === frequency.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border/50 bg-card'
                  }`}
              >
                <div className="flex items-center">
                  <div
                    className="h-3 w-3 rounded-full mr-3"
                    style={{ backgroundColor: frequency.color }}
                  />
                  <div>
                    <p className="font-medium">{frequency.name}</p>
                    <p className="text-sm text-muted-foreground">{frequency.hz} Hz</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MapView;
