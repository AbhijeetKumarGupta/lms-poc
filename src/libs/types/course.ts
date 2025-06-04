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
  teacherId?: number;
  createdAt?: string;
  updatedAt?: string;
  sections: Omit<Section, 'id' | 'createdAt' | 'updatedAt'>[];
  creator: {
    name: string;
    avatar: string;
    dateOfCreation: string;
  };
}
