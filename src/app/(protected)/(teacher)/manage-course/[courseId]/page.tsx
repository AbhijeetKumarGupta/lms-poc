import CourseForm from '@/components/others/course-form';
import { fetchCourseById } from '@/libs/services/course';
import { Course } from '@/libs/types/course';

interface EditCoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

async function getCourseById(courseId: string): Promise<Course> {
  const data = await fetchCourseById(Number(courseId));
  return data;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  return <CourseForm initialValues={course} />;
}
