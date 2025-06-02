'use client';

import CourseForm, { CourseFormValues } from '@/components/organism/course-form';

export default function AddCoursePage() {
  const handleCreate = async (values: CourseFormValues) => {
    //TODO: Add submission logic
    console.log({ values });
  };

  return <CourseForm onSubmit={handleCreate} />;
}
