import CourseForm, { CourseFormValues } from '@/components/organism/course-form';

interface EditCoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

async function getCourseById(courseId: string): Promise<CourseFormValues> {
  //TODO: Implement fetch logic
  return { courseId } as unknown as CourseFormValues;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);

  const handleUpdate = async (values: CourseFormValues) => {
    //TODO: Implement update logic here
    console.log({ values });
  };

  return <CourseForm initialValues={course} onSubmit={handleUpdate} />;
}
