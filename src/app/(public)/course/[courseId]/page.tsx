import CourseDetails from '@/components/organism/course-details';

export default async function PublicCourseDetailsPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return <CourseDetails courseId={parseInt(courseId)} />;
}
