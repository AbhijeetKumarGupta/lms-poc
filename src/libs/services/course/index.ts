import { Course } from '@/libs/types/course';

export async function fetchCourseById(courseId: number): Promise<Course> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/course/${courseId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch course.');
  }

  const data = await res.json();
  return data.data;
}

export async function getCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/course`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch courses.');
  }
  const data = await res.json();
  return data.data;
}

export async function createCourse(course: Course) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/course`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create course.');
  }

  return await res.json();
}
