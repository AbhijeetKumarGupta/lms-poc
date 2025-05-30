'use client';

import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { signinSchema } from '@/libs/validations/auth/sign-in';

export interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const onSubmit: SubmitHandler<SignInFormValues> = async data => {
    setServerError('');

    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      setServerError(result.error);
    } else {
      router.replace('/');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}
    >
      <Stack spacing={2}>
        <Typography variant="h4">Sign In</Typography>

        {serverError && <Typography color="error">{serverError}</Typography>}

        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          Sign In
        </Button>
      </Stack>
    </Box>
  );
}
