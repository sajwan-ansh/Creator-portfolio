export type Category = 
  | 'All' 
  | '2D Animation' 
  | '3D Animation' 
  | '3D Model' 
  | 'Video Editing' 
  | 'Photography' 
  | 'Artworks';

export type MediaType = 'video' | 'photo';

export interface WorkItem {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  type: MediaType;
  thumbnail: string;
  mediaUrl: string; // Video URL or High-res Image URL
  description: string;
  tools: string[];
  date: string;
  featured?: boolean;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  meta?: {
    duration?: string;
    camera?: string;
    lens?: string;
    fps?: string;
    client?: string;
    polycount?: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  iconName: 'Paintbrush' | 'Video' | 'Box' | 'Film' | 'Camera' | 'Sparkles';
  description: string;
  tools: string[];
}

export interface CommissionInquiry {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}
