import { Category, MediaType } from '../../types/portfolio';

export interface Project {
  id: string;
  title: string;
  category: Exclude<Category, 'All'>;
  description: string;
  tools: string[];
  date: string;
  featured?: boolean;
  client?: string;
  media: Media[];
}

export interface Media {
  id: string;
  projectId: string;
  type: MediaType;
  url: string;
  thumbnailUrl: string;
  fileName?: string;
  mimeType?: string;
  fileSizeBytes?: number;
  sortOrder: number;
  duration?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}
