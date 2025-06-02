'use client';

import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SignUpFormValues } from '@/libs/types/auth';
import { signUpUser } from '@/libs/services/auth/sign-up';
import { signupSchema } from '@/libs/validations/auth/sign-up';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SignUpFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'student',
    },
  });

  const router = useRouter();
  const [serverError, setServerError] = useState('');

  const onSubmit: SubmitHandler<SignUpFormValues> = async values => {
    setServerError('');
    try {
      await signUpUser(values);
      router.replace('/auth/sign-in');
    } catch (err: Any) {
      setServerError(err.message || 'Network error or server unavailable.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: 'auto', display: 'flex', height: '70vh' }}
      alignItems="center"
    >
      <Stack spacing={2} width="100%">
        <Typography variant="h4">Sign Up</Typography>

        {serverError && <Typography color="error">{serverError}</Typography>}

        <TextField
          label="Name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          type="email"
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

        <FormControl fullWidth error={!!errors.role}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            value={watch('role')}
            label="Role"
            onChange={e => setValue('role', e.target.value, { shouldValidate: true })}
          >
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </Select>
          {errors.role && <Typography color="error">{errors.role.message}</Typography>}
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
}
