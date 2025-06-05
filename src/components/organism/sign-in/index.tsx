'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import AuthForm from '@/components/organism/auth-form';
import { SignInFormValues } from '@/libs/types/auth';
import { signinSchema } from '@/libs/validations/auth/sign-in';

export default function SignIn() {
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const onSubmit = async (data: SignInFormValues) => {
    setSubmitting(true);
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    const result = await signIn('credentials', {
      ...data,
      redirect: true,
      callbackUrl,
    });

    if (result?.error) {
      setServerError(result.error);
    }
    setSubmitting(false);
  };

  return (
    <AuthForm<SignInFormValues>
      title="Sign In"
      defaultValues={{ email: '', password: '' }}
      resolver={yupResolver(signinSchema)}
      onSubmit={onSubmit}
      serverError={serverError}
      isSubmitting={submitting}
    />
  );
}
