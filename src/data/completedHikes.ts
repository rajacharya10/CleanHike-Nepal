export interface CompletedHike {
  id: string;
  name: string;
  location: string;
  distance: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Hard';
  completedDate: string;
  image: string;
  description: string;
  highlights: string[];
}

export const completedHikes: CompletedHike[] = [
  {
    id: '1',
    name: 'Annapurna Base Camp Trek',
    location: 'Kaski, Annapurna Region',
    distance: '115 km',
    duration: '10 days',
    difficulty: 'Moderate',
    completedDate: '2024-03-15',
    image: 'https://images.pexels.com/photos/1321889/pexels-photo-1321889.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A stunning journey through rhododendron forests to the base of the mighty Annapurna massif.',
    highlights: ['Poon Hill Sunrise', 'Hot Springs', 'Annapurna Sanctuary'],
  },
  {
    id: '2',
    name: 'Everest View Trek',
    location: 'Solukhumbu, Khumbu Region',
    distance: '65 km',
    duration: '8 days',
    difficulty: 'Moderate',
    completedDate: '2024-04-22',
    image: 'https://images.pexels.com/photos/2387878/pexels-photo-2387878.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Experience breathtaking views of Everest while exploring Sherpa villages and ancient monasteries.',
    highlights: ['Namche Bazaar', 'Tengboche Monastery', 'Everest Views'],
  },
  {
    id: '3',
    name: 'Langtang Valley Trek',
    location: 'Rasuwa, Langtang Region',
    distance: '77 km',
    duration: '7 days',
    difficulty: 'Moderate',
    completedDate: '2024-05-10',
    image: 'https://images.pexels.com/photos/3228096/pexels-photo-3228096.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Known as the Valley of Glaciers, offering spectacular mountain views and Tamang culture.',
    highlights: ['Kyanjin Gompa', 'Langtang Village', 'Glacier Views'],
  },
  {
    id: '4',
    name: 'Mardi Himal Trek',
    location: 'Kaski, Annapurna Region',
    distance: '55 km',
    duration: '6 days',
    difficulty: 'Moderate',
    completedDate: '2024-06-05',
    image: 'https://images.pexels.com/photos/1421909/pexels-photo-1421909.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Hidden gem offering close-up views of Machhapuchhre and the Annapurna range.',
    highlights: ['High Camp', 'Rhododendron Forests', 'Mountain Panoramas'],
  },
  {
    id: '5',
    name: 'Manaslu Circuit Trek',
    location: 'Gorkha, Manaslu Region',
    distance: '177 km',
    duration: '14 days',
    difficulty: 'Challenging',
    completedDate: '2024-07-18',
    image: 'https://images.pexels.com/photos/1291962/pexels-photo-1291962.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A remote, culturally rich circuit around the world\'s 8th highest mountain.',
    highlights: ['Larkya La Pass', 'Nubri Culture', 'Hot Springs'],
  },
  {
    id: '6',
    name: 'Ghorepani Poon Hill Trek',
    location: 'Myagdi, Annapurna Region',
    distance: '45 km',
    duration: '4 days',
    difficulty: 'Easy',
    completedDate: '2024-08-12',
    image: 'https://images.pexels.com/photos/3025159/pexels-photo-3025159.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Perfect for beginners, featuring iconic sunrise views over the Annapurna and Dhaulagiri ranges.',
    highlights: ['Poon Hill Sunrise', 'Rhododendron Forests', 'Gurung Villages'],
  },
  {
    id: '7',
    name: 'Upper Mustang Trek',
    location: 'Mustang, Himalayan Desert',
    distance: '145 km',
    duration: '12 days',
    difficulty: 'Challenging',
    completedDate: '2024-09-25',
    image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Journey to the forbidden kingdom, exploring ancient caves and Tibetan-influenced culture.',
    highlights: ['Lo Manthang', 'Ancient Caves', 'Desert Landscapes'],
  },
  {
    id: '8',
    name: 'Gokyo Lakes Trek',
    location: 'Solukhumbu, Everest Region',
    distance: '85 km',
    duration: '10 days',
    difficulty: 'Challenging',
    completedDate: '2024-10-08',
    image: 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Trek to sacred emerald lakes with unparalleled views of Everest and surrounding peaks.',
    highlights: ['Gokyo Ri', 'Sacred Lakes', 'Ngozumpa Glacier'],
  },
];

export const getHikesByDifficulty = (difficulty: string) =>
  completedHikes.filter(h => difficulty === 'All' || h.difficulty === difficulty);
