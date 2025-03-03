
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
  category: "healing" | "meditation" | "ancient" | "scientific";
  color: string;
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
    imageUrl: "/placeholder.svg",
    category: "healing",
    color: "#4CAF50"
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
    imageUrl: "/placeholder.svg",
    category: "ancient",
    color: "#2196F3"
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
    imageUrl: "/placeholder.svg",
    category: "meditation",
    color: "#9C27B0"
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
    imageUrl: "/placeholder.svg",
    category: "healing",
    color: "#FF9800"
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
    imageUrl: "/placeholder.svg",
    category: "spiritual",
    color: "#673AB7"
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
    imageUrl: "/placeholder.svg",
    category: "meditation",
    color: "#F44336"
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
    imageUrl: "/placeholder.svg",
    category: "spiritual",
    color: "#9C27B0"
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
    imageUrl: "/placeholder.svg",
    category: "healing",
    color: "#FF5722"
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
