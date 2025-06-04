import { EnrollmentPayload, EnrollmentResponse } from '@/libs/types/enrollments';

export async function enrollUser(data: EnrollmentPayload): Promise<EnrollmentResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/enrollments`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Enrollment failed.');
  }

  return res.json();
}

export async function unenrollUser(enrollmentId: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/enrollments/${enrollmentId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Unenrollment failed.');
  }
}

export async function getUserEnrollments(userId: string): Promise<EnrollmentPayload[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/enrollments/user/${userId}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch enrollments.');
  }
  const data = await res.json();

  return data?.data || [];
}
