export interface Section {
  id?: number;
  courseId?: number;
  title: string;
  description: string;
  videoUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Course {
  id?: number;
  title: string;
  image: string;
  description: string;
  teacherId?: number | string;
  createdAt?: string;
  updatedAt?: string;
  sections: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>[];
}
