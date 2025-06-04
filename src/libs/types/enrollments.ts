export interface EnrollmentPayload {
  userId: string;
  courseId: string;
  enrolledAt: string;
}

export interface EnrollmentResponse {
  data: { id: string } & EnrollmentPayload;
}
