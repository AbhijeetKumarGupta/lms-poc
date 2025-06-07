import { notFound } from 'next/navigation';

import CourseForm from '@/components/organism/course-form';
import { fetchCourseById } from '@/libs/services/course';
import { Course } from '@/libs/types/course';

interface EditCoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    const data = await fetchCourseById(Number(courseId));
    return data;
  } catch (err) {
    console.error('Failed to fetch course:', err);
    return null;
  }
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return <CourseForm initialValues={course} />;
}
