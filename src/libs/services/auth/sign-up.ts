import { SignUpFormValues } from '@/libs/types/auth';

export async function signUpUser(data: SignUpFormValues): Promise<{ data: SignUpFormValues }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/sign-up`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Signup failed.');
  }

  const responseData = await res.json();
  return responseData;
}
