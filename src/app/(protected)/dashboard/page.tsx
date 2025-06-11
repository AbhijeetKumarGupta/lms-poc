import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { CoursesContainer } from '@/components/organism/courses-container';
import { getCourses } from '@/libs/services/course';
import { getUserEnrollments } from '@/libs/services/enrollments';

async function getDashboardDataByUserId(userId: string): Promise<Any> {
  try {
    const [courses, enrollments] = await Promise.all([getCourses(), getUserEnrollments(userId)]);

    return {
      courses,
      enrollments,
    };
  } catch (err) {
    console.error('Failed to fetch dashboard data:', err);
    return {};
  }
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    redirect('/auth/sign-in');
  }

  const { courses, enrollments } = await getDashboardDataByUserId(userId);

  return (
    <CoursesContainer
      title="All Courses"
      user={session?.user}
      courses={courses}
      enrollments={enrollments}
    />
  );
}
