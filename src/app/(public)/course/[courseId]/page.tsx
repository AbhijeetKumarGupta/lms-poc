import CourseDetails from '@/components/organism/course-details';
import { fetchCourseById } from '@/libs/services/course';

export default async function PublicCourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const courseData = await fetchCourseById(Number(courseId));

  if (!courseData) {
    return <>404 Not Found</>;
  }

  return <CourseDetails courseData={courseData} />;
}
