import CourseForm, { CourseFormValues } from '@/components/others/course-form';

interface EditCoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

async function getCourseById(courseId: string): Promise<{ data: CourseFormValues }> {
  //TODO: Implement fetch logic
  return { courseId } as unknown as { data: CourseFormValues };
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { courseId } = await params;
  const { data: course } = await getCourseById(courseId);

  return <CourseForm initialValues={course} />;
}
