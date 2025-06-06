import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { CoursesContainer } from '@/components/organism/courses-container';
import { getCourses } from '@/libs/services/course';
import { getUserEnrollments } from '@/libs/services/enrollments';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const [courses, enrollments] = await Promise.all([
    getCourses(),
    userId ? getUserEnrollments(userId) : [],
  ]);

  return (
    <CoursesContainer
      title="All Courses"
      user={session?.user}
      courses={courses}
      enrollments={enrollments}
    />
  );
}
