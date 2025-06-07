import { notFound } from 'next/navigation';

import CourseDetails from '@/components/organism/course-details';
import { fetchCourseById } from '@/libs/services/course';
import { Course } from '@/libs/types/course';

async function getCourseById(courseId: string): Promise<Course | null> {
  try {
    const data = await fetchCourseById(Number(courseId));
    return data;
  } catch (err) {
    console.error('Failed to fetch course:', err);
    return null;
  }
}

export default async function PublicCourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const courseData = await getCourseById(courseId);

  if (!courseData) {
    notFound();
  }

  return <CourseDetails courseData={courseData} />;
}
