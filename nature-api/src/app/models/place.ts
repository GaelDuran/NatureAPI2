export interface Trail {
  id: string | number;
  name?: string;
  distanceMeters: number;
  difficulty: 'easy' | 'moderate' | 'hard' | string;
  estimatedTimeMinutes?: number;
  loop?: boolean;
}

export interface Place {
  id: string | number;
  name: string;
  category?: string;
  description?: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  accessible?: boolean;
  fee?: number;
  schedule?: string;
  photos?: string[];
  amenities?: string[];
  trails?: Trail[];
}
