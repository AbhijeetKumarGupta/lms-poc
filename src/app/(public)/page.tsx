import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { CoursesContainer } from '@/components/organism/courses-container';
import { getCourses } from '@/libs/services/course';
import { getUserEnrollments } from '@/libs/services/enrollments';

async function getHomeDataByUserId(userId?: string): Promise<Any> {
  try {
    const [courses, enrollments] = await Promise.all([
      getCourses(),
      userId ? getUserEnrollments(userId) : [],
    ]);

    return {
      courses,
      enrollments,
    };
  } catch (err) {
    console.error('Failed to fetch home data:', err);
    return null;
  }
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const { courses = [], enrollments } = await getHomeDataByUserId(userId);

  return (
    <CoursesContainer
      title="All Courses"
      user={session?.user}
      courses={courses}
      enrollments={enrollments}
    />
  );
}
