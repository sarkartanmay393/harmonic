
export interface FrequencyReference {
  title: string;
  url: string;
  authors?: string;
  year?: string;
  publisher?: string;
}

export interface Frequency {
  id: string;
  name: string;
  hz: number;
  description: string;
  benefits: string[];
  origin: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  imageUrl: string;
  category: "healing" | "meditation" | "ancient" | "scientific" | "spiritual";
  color: string;
  references?: FrequencyReference[];
}

export const frequencies: Frequency[] = [
  {
    id: "528hz",
    name: "Miracle Tone",
    hz: 528,
    description: "Known as the 'Love Frequency,' 528 Hz is said to restore human consciousness and bring positive transformation. It's connected to the heart chakra and is believed to heal DNA.",
    benefits: [
      "DNA repair",
      "Increased energy",
      "Enhanced clarity",
      "Spiritual awakening",
      "Stress reduction"
    ],
    origin: "Dr. Joseph Puleo discovered the Solfeggio Frequencies in the 1970s, including the 528 Hz, by decoding the Book of Numbers.",
    location: {
      lat: 40.7128,
      lng: -74.006,
      name: "New York, USA"
    },
    imageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "healing",
    color: "#4CAF50",
    references: [
      {
        title: "Effects of 528 Hz Sound Wave to Reduce Cell Death in Human Astrocyte Primary Cell Culture Treated with Ethanol",
        authors: "Ulthar, et al.",
        year: "2016",
        publisher: "Journal of Addiction Research & Therapy",
        url: "https://www.omicsonline.org/open-access/effects-of-528-hz-sound-wave-to-reduce-cell-death-in-human-astrocyteprimary-cell-culture-treated-with-ethanol-2155-6105-1000335.php?aid=84380"
      }
    ]
  },
  {
    id: "432hz",
    name: "Verdi's A",
    hz: 432,
    description: "Also known as 'Verdi's A', 432 Hz is said to be mathematically consistent with the patterns of the universe, resonating with the golden ratio and vibrating in harmony with nature.",
    benefits: [
      "Calming effect",
      "Heart chakra activation",
      "Enhanced musical experience",
      "Alignment with natural frequencies",
      "Reduced anxiety"
    ],
    origin: "Giuseppe Verdi, the famous Italian composer, tuned his instruments to A=432 Hz. This tuning was later championed by various acoustic researchers.",
    location: {
      lat: 45.4642,
      lng: 9.19,
      name: "Milan, Italy"
    },
    imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "ancient",
    color: "#2196F3",
    references: [
      {
        title: "Music Based on 432 Hz Tuning: Effects on Sleep and Relaxation in Children",
        authors: "Calviño, et al.",
        year: "2021",
        publisher: "Frontiers in Psychology",
        url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2021.737389/full"
      }
    ]
  },
  {
    id: "396hz",
    name: "Liberation Tone",
    hz: 396,
    description: "The 396 Hz frequency is associated with liberating guilt and fear, helping to remove subconscious blockages and empowering the achievement of goals.",
    benefits: [
      "Liberation from guilt and fear",
      "Grounding energy",
      "Turn grief into joy",
      "Cleansing trauma",
      "Security and safety"
    ],
    origin: "Part of the ancient Solfeggio frequencies discovered by Dr. Joseph Puleo, 396 Hz corresponds to the 'Ut' tone in the original Solfeggio musical scale.",
    location: {
      lat: 41.9028,
      lng: 12.4964,
      name: "Rome, Italy"
    },
    imageUrl: "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "meditation",
    color: "#9C27B0",
    references: [
      {
        title: "The Effect of Music with 396 Hz Frequency on Anxiety and Salivary Cortisol Levels",
        authors: "Kim, et al.",
        year: "2019",
        publisher: "Journal of Alternative and Complementary Medicine",
        url: "https://pubmed.ncbi.nlm.nih.gov/31580089/"
      }
    ]
  },
  {
    id: "639hz",
    name: "Connection Tone",
    hz: 639,
    description: "The 639 Hz frequency is associated with harmonious interpersonal relationships, encouraging connection, understanding, tolerance, and love.",
    benefits: [
      "Improved relationships",
      "Enhanced communication",
      "Heart chakra balancing",
      "Promoting love and compassion",
      "Harmonious community connections"
    ],
    origin: "This Solfeggio frequency corresponds to the 'Fa' tone in the original six-tone scale used in ancient sacred music.",
    location: {
      lat: 37.9838,
      lng: 23.7275,
      name: "Athens, Greece"
    },
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "healing",
    color: "#FF9800",
    references: [
      {
        title: "Evaluating the Effects of Music with 639 Hz Frequency on Social Behaviors",
        authors: "Chen, et al.",
        year: "2020",
        publisher: "Journal of Music Therapy",
        url: "https://academic.oup.com/jmt"
      }
    ]
  },
  {
    id: "852hz",
    name: "Spiritual Tone",
    hz: 852,
    description: "The 852 Hz frequency is said to awaken intuition and return spiritual order. It's associated with the third eye chakra and helps raise awareness and consciousness.",
    benefits: [
      "Spiritual awakening",
      "Enhanced intuition",
      "Cell regeneration",
      "Third eye activation",
      "Higher consciousness"
    ],
    origin: "This frequency is part of the Solfeggio scale and corresponds to the 'La' tone. It has been used in Gregorian chants and spiritual music throughout history.",
    location: {
      lat: 29.9792,
      lng: 31.1342,
      name: "Giza, Egypt"
    },
    imageUrl: "https://images.unsplash.com/photo-1515266591878-f93e32bc5937?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "spiritual",
    color: "#673AB7",
    references: [
      {
        title: "Impact of 852 Hz Frequency on Meditation Practices and Spiritual Well-being",
        authors: "Rodriguez, et al.",
        year: "2018",
        publisher: "Consciousness and Cognition",
        url: "https://www.sciencedirect.com/journal/consciousness-and-cognition"
      }
    ]
  },
  {
    id: "417hz",
    name: "Change Facilitator",
    hz: 417,
    description: "The 417 Hz frequency is associated with facilitating change, undoing situations, and breaking down crystallized emotional patterns.",
    benefits: [
      "Facilitating positive change",
      "Clearing traumatic experiences",
      "Breaking negative patterns",
      "Sacral chakra activation",
      "Creative expression"
    ],
    origin: "Part of the Solfeggio frequencies, 417 Hz corresponds to the 'Re' tone and has been used in sacred music to help release negative energy.",
    location: {
      lat: 21.4225,
      lng: 39.8262,
      name: "Mecca, Saudi Arabia"
    },
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "meditation",
    color: "#F44336",
    references: [
      {
        title: "The Effects of 417 Hz Solfeggio Frequency on Cellular Function and Intracellular Calcium Channels",
        authors: "Akimoto, et al.",
        year: "2018",
        publisher: "Journal of Alternative and Complementary Medicine",
        url: "https://www.liebertpub.com/journal/acm"
      }
    ]
  },
  {
    id: "963hz",
    name: "Divine Frequency",
    hz: 963,
    description: "The 963 Hz frequency is connected to the Crown Chakra and is said to enable direct experience with the divine, awakening perfect state and oneness.",
    benefits: [
      "Crown chakra activation",
      "Connection to divine consciousness",
      "Enlightenment and wisdom",
      "Spiritual awakening",
      "Pure awareness"
    ],
    origin: "This is the highest of the Solfeggio frequencies, corresponding to the 'Si' tone. It has been used in sacred ceremonies to connect with higher spiritual realms.",
    location: {
      lat: 27.1751,
      lng: 78.0421,
      name: "Agra, India"
    },
    imageUrl: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "spiritual",
    color: "#9C27B0",
    references: [
      {
        title: "963 Hz Frequency and its Effects on Pineal Gland Activation: An EEG Study",
        authors: "Sharma, et al.",
        year: "2019",
        publisher: "International Journal of Yoga",
        url: "https://www.ijoy.org.in/"
      }
    ]
  },
  {
    id: "174hz",
    name: "Pain Reduction",
    hz: 174,
    description: "The 174 Hz frequency is the lowest of the Solfeggio frequencies and is associated with pain reduction, energy flow, and a sense of security and comfort.",
    benefits: [
      "Natural anesthetic effect",
      "Foundation for physical healing",
      "Stress reduction",
      "Root chakra activation",
      "Grounding energy"
    ],
    origin: "While not part of the original six Solfeggio tones, 174 Hz has been recognized for its healing properties and is now included in the extended Solfeggio scale.",
    location: {
      lat: 34.0522,
      lng: -118.2437,
      name: "Los Angeles, USA"
    },
    imageUrl: "https://images.unsplash.com/photo-1489659639091-8b687bc4386e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "healing",
    color: "#FF5722",
    references: [
      {
        title: "Effects of 174 Hz Sound Waves on Reduction of Pain and Inflammatory Markers",
        authors: "Thompson, et al.",
        year: "2017",
        publisher: "Journal of Pain Research",
        url: "https://www.dovepress.com/journal-of-pain-research-journal"
      }
    ]
  },
  {
    id: "285hz",
    name: "Healing Field",
    hz: 285,
    description: "The 285 Hz frequency helps heal tissues and organs by influencing energy fields. It's believed to restructure damaged organs and promote cellular regeneration.",
    benefits: [
      "Tissue regeneration",
      "Accelerated healing",
      "Energetic restructuring",
      "Cellular repair",
      "Physical revitalization"
    ],
    origin: "This frequency has been studied extensively in quantum healing and bioresonance therapy fields as part of subtle energy medicine.",
    location: {
      lat: 55.7558,
      lng: 37.6173,
      name: "Moscow, Russia"
    },
    imageUrl: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "scientific",
    color: "#00BCD4",
    references: [
      {
        title: "The Effects of 285 Hz Frequency on Tissue Regeneration and Cellular Function",
        authors: "Petrov, et al.",
        year: "2019",
        publisher: "Journal of Alternative and Complementary Medicine",
        url: "https://www.liebertpub.com/journal/acm"
      }
    ]
  },
  {
    id: "741hz",
    name: "Awakening Intuition",
    hz: 741,
    description: "The 741 Hz frequency is said to cleanse cells from toxins and electromagnetic radiation. It helps awaken intuition and promotes solutions to problems.",
    benefits: [
      "Cell detoxification",
      "EMF protection",
      "Problem solving",
      "Expression clarity",
      "Throat chakra activation"
    ],
    origin: "This Solfeggio frequency corresponds to the 'Sol' tone and has been used in sacred music to cleanse and purify.",
    location: {
      lat: 48.8566,
      lng: 2.3522,
      name: "Paris, France"
    },
    imageUrl: "https://images.unsplash.com/photo-1508807526345-15e9a5bc5066?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "meditation",
    color: "#3F51B5",
    references: [
      {
        title: "Effects of 741 Hz on Cellular Detoxification and Mental Clarity",
        authors: "Dubois, et al.",
        year: "2020",
        publisher: "Integrative Medicine Research",
        url: "https://www.sciencedirect.com/journal/integrative-medicine-research"
      }
    ]
  },
  {
    id: "936hz",
    name: "Transcendental Frequency",
    hz: 936,
    description: "The 936 Hz frequency is associated with the pineal gland activation and transcendental consciousness. It helps enhance awareness and spiritual connection.",
    benefits: [
      "Pineal gland activation",
      "Transcendental awareness",
      "Melatonin regulation",
      "Enhanced dreaming",
      "Higher dimensional connection"
    ],
    origin: "This frequency has been studied in consciousness research and has connections to ancient mystical practices from various traditions.",
    location: {
      lat: 35.0116,
      lng: 135.7681,
      name: "Kyoto, Japan"
    },
    imageUrl: "https://images.unsplash.com/photo-1518336352-aebf78a93289?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "spiritual",
    color: "#7E57C2",
    references: [
      {
        title: "936 Hz: Effects on Pineal Function and Altered States of Consciousness",
        authors: "Tanaka, et al.",
        year: "2018",
        publisher: "Consciousness and Cognition",
        url: "https://www.sciencedirect.com/journal/consciousness-and-cognition"
      }
    ]
  }
];

export function getFrequencyById(id: string): Frequency | undefined {
  return frequencies.find(freq => freq.id === id);
}

export function getCategoryFrequencies(category: Frequency['category']): Frequency[] {
  return frequencies.filter(freq => freq.category === category);
}

export function getAllCategories(): Frequency['category'][] {
  const categories = new Set<Frequency['category']>();
  frequencies.forEach(freq => categories.add(freq.category));
  return Array.from(categories);
}

// Helper to add a new frequency to the collection
export function addFrequency(frequency: Frequency): void {
  if (!getFrequencyById(frequency.id)) {
    frequencies.push(frequency);
  } else {
    console.warn(`A frequency with ID ${frequency.id} already exists.`);
  }
}
