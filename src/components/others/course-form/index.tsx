'use client';

import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { manageCourseSchema } from '@/libs/validations/manage-course';

export interface CourseFormValues {
  title: string;
  image: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
    dateOfCreation: string;
  };
}

interface CourseFormProps {
  initialValues?: CourseFormValues;
}

export default function CourseForm({ initialValues }: CourseFormProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const currentDate = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: yupResolver(manageCourseSchema),
    defaultValues: initialValues || {
      title: '',
      image: '',
      description: '',
      creator: {
        name: typeof user?.name === 'string' ? user.name : '',
        avatar: typeof user?.image === 'string' ? user.image : '',
        dateOfCreation: currentDate,
      },
    },
  });

  const onSubmitForm: SubmitHandler<CourseFormValues> = values => {
    console.log(values);
  };

  return (
    <Box
      component="form"
      onSubmit={formSubmit(onSubmitForm)}
      sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}
    >
      <Stack spacing={2}>
        <TextField
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Image URL"
          {...register('image')}
          error={!!errors.image}
          helperText={errors.image?.message}
        />
        <TextField
          label="Description"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
          multiline
          minRows={3}
        />
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          {initialValues ? 'Update Course' : 'Add Course'}
        </Button>
      </Stack>
    </Box>
  );
}
