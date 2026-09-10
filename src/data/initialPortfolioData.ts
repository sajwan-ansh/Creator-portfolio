import { WorkItem, Skill } from '../types/portfolio';

export const INITIAL_WORK_ITEMS: WorkItem[] = [
  {
    id: 'work-1',
    title: 'Echoes',
    category: '2D Animation',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'An atmospheric 2D hand-drawn short film exploring memory, loss, and quiet moments of introspection at dusk.',
    tools: ['Clip Studio Paint', 'Adobe After Effects', 'TVPaint'],
    date: '2026',
    featured: true,
    meta: {
      duration: '02:45',
      fps: '24 fps',
      client: 'Personal Short Film'
    }
  },
  {
    id: 'work-2',
    title: 'Neon Odyssey',
    category: '3D Animation',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: '3D sci-fi animation sequence featuring volumetric fog, metallic shader reflections, and fluid cinematic camera movement.',
    tools: ['Blender 3D', 'Unreal Engine 5', 'Octane Render'],
    date: '2026',
    featured: true,
    meta: {
      duration: '01:50',
      fps: '60 fps',
      client: 'Game Cinematic Trailer'
    }
  },
  {
    id: 'work-3',
    title: 'Cyberpunk Exo Mech',
    category: '3D Model',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=90',
    description: 'High-poly 3D hard-surface mechanical asset design with PBR texturing, displacement maps, and studio turntable render.',
    tools: ['ZBrush', 'Blender', 'Substance Painter', 'Marmoset'],
    date: '2026',
    featured: true,
    meta: {
      polycount: '145,000 Polys',
      client: 'Game Asset Showcase'
    }
  },
  {
    id: 'work-4',
    title: 'Moving On',
    category: 'Video Editing',
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'Cinematic video edit set to atmospheric audio on a train traveling into sunset. Rhythmic pacing and color grading.',
    tools: ['DaVinci Resolve', 'Premiere Pro'],
    date: '2026',
    featured: true,
    meta: {
      duration: '03:10',
      fps: '24 fps',
      client: 'Music Video Edit'
    }
  },
  {
    id: 'work-5',
    title: 'Sunset Solitude',
    category: 'Photography',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=90',
    description: 'Street photography session capturing urban golden hour architecture, high contrast shadows, and silent moments.',
    tools: ['Sony A7IV', '35mm GM', 'Lightroom Classic'],
    date: '2026',
    featured: true,
    meta: {
      camera: 'Sony A7IV',
      lens: 'FE 35mm f/1.4 GM',
      client: 'Personal Photo Series'
    }
  },
  {
    id: 'work-6',
    title: 'Character Study',
    category: 'Artworks',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=90',
    description: 'Digital illustration capturing emotion and light across portraiture. Focus on subtle expression and glowing rim lighting.',
    tools: ['Procreate', 'Photoshop'],
    date: '2026',
    featured: true,
    meta: {
      client: 'Editorial Feature'
    }
  },
  {
    id: 'work-7',
    title: 'A Quieter Place',
    category: 'Artworks',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=90',
    description: 'Lush anime-inspired background painting of a secluded cottage nestled in painterly meadows and fluffy cloudscapes.',
    tools: ['Photoshop', 'Blender Layout'],
    date: '2025',
    meta: {
      client: 'Indie Game Concept'
    }
  },
  {
    id: 'work-8',
    title: 'Kyoto Alleyways',
    category: 'Photography',
    type: 'photo',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=90',
    description: 'Night photography collection from Gion, Kyoto. Rainy reflection, lantern warm glows, and tranquil alley vistas.',
    tools: ['Fujifilm X-T5', '23mm f/1.4', 'Lightroom Mobile'],
    date: '2025',
    meta: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 23mm f/1.4 R LM WR',
      client: 'Travelogue Mag'
    }
  }
];

export const INITIAL_SKILLS: Skill[] = [
  {
    id: 'skill-1',
    name: 'Illustration & Artworks',
    iconName: 'Paintbrush',
    description: 'Digital art, character design, environment backgrounds & editorial artwork.',
    tools: ['Photoshop', 'Procreate', 'Clip Studio Paint']
  },
  {
    id: 'skill-2',
    name: '2D & 3D Animation',
    iconName: 'Video',
    description: '2D frame-by-frame character animation, 3D character sequences & cinematic timing.',
    tools: ['TVPaint', 'Blender', 'After Effects']
  },
  {
    id: 'skill-3',
    name: '3D Modeling',
    iconName: 'Box',
    description: 'Hard-surface asset modeling, ZBrush sculpting, PBR texturing & renders.',
    tools: ['Blender 3D', 'ZBrush', 'Substance Painter']
  },
  {
    id: 'skill-4',
    name: 'Video Editing',
    iconName: 'Film',
    description: 'Narrative cutting, rhythmic pacing, color grading, sound design & dynamic promo edits.',
    tools: ['DaVinci Resolve', 'Premiere Pro', 'Audition']
  }
];
