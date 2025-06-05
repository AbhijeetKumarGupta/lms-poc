'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AuthForm from '@/components/organism/auth-form';
import { signUpUser } from '@/libs/services/auth/sign-up';
import { SignUpFormValues } from '@/libs/types/auth';
import { signupSchema } from '@/libs/validations/auth/sign-up';

export default function SignUp() {
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (values: SignUpFormValues) => {
    setSubmitting(true);
    try {
      await signUpUser(values);
      router.replace('/auth/sign-in');
    } catch (err: Any) {
      setServerError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm<SignUpFormValues>
      title="Sign Up"
      defaultValues={{
        name: '',
        email: '',
        password: '',
        role: 'student',
      }}
      resolver={yupResolver(signupSchema)}
      showRoleSelect
      onSubmit={onSubmit}
      serverError={serverError}
      isSubmitting={submitting}
    />
  );
}
