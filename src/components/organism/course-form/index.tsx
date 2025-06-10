'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, Typography, Divider } from '@mui/material';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUpload from '@/components/molecule/file-upload';

import { manageCourseSchema } from '@/libs/validations/manage-course';
import { Course } from '@/libs/types/course';
import { createCourse, updateCourse } from '@/libs/services/course';
import CustomSwitch from '@/components/atom/custom-switch';
import { FILE_TYPES } from '@/constants';

interface CourseFormProps {
  initialValues?: Course;
}

export default function CourseForm({ initialValues }: CourseFormProps) {
  const { data: session } = useSession();
  const [useImageUrl, setUseImageUrl] = useState(false);
  const [useVideoUrl, setUseVideoUrl] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    watch,
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

  const handleUploadProgress = (progress: number) => {
    //// TODO: Add progress loaded
    console.log(progress);
  };

  const onSubmit: SubmitHandler<Course> = async values => {
    try {
      let res;

      if (initialValues?.id) {
        res = await updateCourse(initialValues.id, values);
      } else {
        res = await createCourse(values);
      }

      if (!res?.success) {
        window.alert(`Failed to ${initialValues?.id ? 'update' : 'create'} course`);
      } else {
        router.push(`/course-details/${res?.data?.id}`);
      }
    } catch (error) {
      console.error('Course form error:', error);
      window.alert('Something went wrong. Check console for details.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Box display="flex" alignItems="baseline" justifyContent="center" gap={0}>
          <Button
            color="error"
            sx={{ fontSize: 30, backgroundColor: 'transparent', marginRight: 2 }}
            variant="text"
            onClick={() => router.back()}
          >
            ←
          </Button>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            {initialValues?.id ? 'Edit Form' : 'Add Form'}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      <Stack spacing={3}>
        <Typography variant="h5">Course Details</Typography>

        <TextField
          label="Title"
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <Typography variant="subtitle1">Course Image</Typography>
        <CustomSwitch
          switchProps={{
            checked: useImageUrl,
            onChange: () => setUseImageUrl(prev => !prev),
          }}
          controllerProps={{
            label: 'Use Image URL Instead of Upload',
          }}
        />
        <input type="hidden" {...register('image')} />
        {useImageUrl ? (
          <TextField
            label="Image URL"
            {...register('image')}
            error={!!errors.image}
            helperText={errors.image?.message}
          />
        ) : watch('image') ? (
          <Box display="flex" flexDirection="column" gap={1}>
            <Box
              component="img"
              src={watch('image')}
              alt="Course Preview"
              sx={{ maxWidth: 200, borderRadius: 2 }}
            />
            <Button variant="outlined" color="error" onClick={() => setValue('image', '')}>
              Remove Image
            </Button>
          </Box>
        ) : (
          <>
            <FileUpload
              fileType={FILE_TYPES.IMAGE}
              onSuccess={res =>
                setValue('image', `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}${res.filePath}`)
              }
              onProgress={handleUploadProgress}
              formError={errors?.image}
            />
            {errors?.image && (
              <Typography
                variant="caption"
                sx={{
                  ml: '14px !important',
                  mt: '3px !important',
                  color: theme => theme.palette.error.main,
                }}
              >
                {errors.image.message}
              </Typography>
            )}
          </>
        )}

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

        {fields?.map?.((field, index) => (
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

              <Typography variant="subtitle1">Section Video</Typography>
              <CustomSwitch
                key={field.id}
                switchProps={{
                  checked: useVideoUrl?.[index] || false,
                  onChange: () =>
                    setUseVideoUrl(prev => ({
                      ...prev,
                      [index]: !prev[index],
                    })),
                }}
                controllerProps={{
                  label: 'Use Video URL Instead of Upload',
                }}
              />
              <input type="hidden" {...register(`sections.${index}.videoUrl`)} />
              {useVideoUrl?.[index] ? (
                <TextField
                  label="Video URL"
                  {...register(`sections.${index}.videoUrl`)}
                  error={!!errors?.sections?.[index]?.videoUrl}
                  helperText={errors?.sections?.[index]?.videoUrl?.message}
                />
              ) : watch(`sections.${index}.videoUrl`) ? (
                <Box display="flex" flexDirection="column" gap={1}>
                  <video
                    controls
                    src={watch(`sections.${index}.videoUrl`)}
                    style={{ maxWidth: '100%', borderRadius: 4 }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setValue(`sections.${index}.videoUrl`, '')}
                  >
                    Remove Video
                  </Button>
                </Box>
              ) : (
                <>
                  <FileUpload
                    fileType={FILE_TYPES.VIDEO}
                    onSuccess={res =>
                      setValue(
                        `sections.${index}.videoUrl`,
                        `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}${res.filePath}`
                      )
                    }
                    onProgress={handleUploadProgress}
                    formError={errors.sections?.[index]?.videoUrl}
                  />
                  {errors.sections?.[index]?.videoUrl && (
                    <Typography
                      variant="caption"
                      sx={{
                        ml: '14px !important',
                        mt: '3px !important',
                        color: theme => theme.palette.error.main,
                      }}
                    >
                      {errors.sections[index].videoUrl?.message}
                    </Typography>
                  )}
                </>
              )}

              {fields?.length > 1 && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => remove(index)}
                >
                  Remove Section
                </Button>
              )}
            </Stack>
          </Box>
        ))}

        <Button
          variant="outlined"
          color="warning"
          onClick={() => append({ title: '', description: '', videoUrl: '' })}
        >
          Add Section
        </Button>

        <Divider />

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {initialValues?.id ? 'Update Course' : 'Create Course'}
        </Button>
      </Stack>
    </Box>
  );
}
