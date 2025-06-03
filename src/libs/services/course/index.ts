export async function fetchCourseById(courseId: number): Promise<Any> {
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
