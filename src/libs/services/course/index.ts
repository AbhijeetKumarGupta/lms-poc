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

export async function updateCourse(courseId: string | number, course: Course) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/course/${courseId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update course.');
  }

  return await res.json();
}

export async function deleteCourse(courseId: string | number) {
  const res = await fetch(`/api/course/${courseId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete course.');
  }

  return await res.json();
}
