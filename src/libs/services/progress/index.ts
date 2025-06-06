export async function getUserProgress(userId: string, courseId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/course/progress?userId=${userId}&courseId=${courseId}`
  );
  if (!res.ok) throw new Error('Failed to fetch progress');
  return res.json();
}

export async function updateUserProgress(data: {
  userId: string;
  courseId: number;
  completedSectionIds: number[];
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/course/progress`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to update progress');
  return res.json();
}
