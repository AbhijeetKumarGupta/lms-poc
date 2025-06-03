export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
}

export interface SignInFormValues {
  email: string;
  password: string;
}
