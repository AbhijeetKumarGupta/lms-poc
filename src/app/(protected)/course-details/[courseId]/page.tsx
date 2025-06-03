import { redirect } from 'next/navigation';

import CourseDetails from '@/components/organism/course-details';
import { getSession } from '@/libs/session';

export default async function ProtectedCourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/auth/sign-in');
  }

  const { courseId } = await params;

  return <CourseDetails courseId={parseInt(courseId)} />;
}
