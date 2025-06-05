'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, Typography, Divider } from '@mui/material';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';

import { manageCourseSchema } from '@/libs/validations/manage-course';
import { Course } from '@/libs/types/course';
import { createCourse } from '@/libs/services/course';

interface CourseFormProps {
  initialValues?: Course;
}

export default function CourseForm({ initialValues }: CourseFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Course>({
    resolver: yupResolver(manageCourseSchema),
    defaultValues: initialValues || {
      teacherId: user?.id ?? 0,
      title: '',
      image: '',
      description: '',
      sections: [{ courseId: 0, title: '', description: '', videoUrl: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections',
  });

  const onSubmit: SubmitHandler<Course> = async values => {
    try {
      const res = await createCourse(values);
      if (!res?.success) {
        window.alert('Failed to create course');
      } else {
        router.push(`/course-details/${res?.data?.id}`);
      }
    } catch (error) {
      console.error('Course creation error:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}
    >
      <Stack spacing={3}>
        <Typography variant="h5">Course Details</Typography>

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
          multiline
          minRows={3}
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <Divider />

        <Typography variant="h6">Sections</Typography>

        {fields.map((field, index) => (
          <Box key={field.id} sx={{ border: '1px solid #ccc', p: 2, borderRadius: 2 }}>
            <Stack spacing={2}>
              <TextField
                label="Section Title"
                {...register(`sections.${index}.title`)}
                error={!!errors.sections?.[index]?.title}
                helperText={errors.sections?.[index]?.title?.message}
              />

              <TextField
                label="Section Description"
                multiline
                minRows={2}
                {...register(`sections.${index}.description`)}
                error={!!errors.sections?.[index]?.description}
                helperText={errors.sections?.[index]?.description?.message}
              />

              <TextField
                label="Video URL"
                {...register(`sections.${index}.videoUrl`)}
                error={!!errors.sections?.[index]?.videoUrl}
                helperText={errors.sections?.[index]?.videoUrl?.message}
              />

              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => remove(index)}
              >
                Remove Section
              </Button>
            </Stack>
          </Box>
        ))}

        <Button
          variant="outlined"
          onClick={() => append({ title: '', description: '', videoUrl: '' })}
        >
          Add Section
        </Button>

        <Divider />

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {initialValues ? 'Update Course' : 'Create Course'}
        </Button>
      </Stack>
    </Box>
  );
}
