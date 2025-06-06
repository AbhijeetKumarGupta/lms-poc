import { redirect } from 'next/navigation';
import CourseDetails from '@/components/organism/course-details';
import { getSession } from '@/libs/session';
import { fetchCourseById } from '@/libs/services/course';

export default async function ProtectedCourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const session = await getSession();
  const { courseId } = await params;

  if (!session) {
    redirect('/auth/sign-in');
  }

  const courseData = await fetchCourseById(Number(courseId));

  if (!courseData) {
    return <>404 Not Found</>;
  }

  return <CourseDetails courseData={courseData} />;
}
