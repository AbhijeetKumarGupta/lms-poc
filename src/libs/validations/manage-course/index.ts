import * as yup from 'yup';

export const manageCourseSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    image: yup.string().url('Image must be a valid URL').required('Image URL is required'),
    description: yup.string().required('Description is required'),

    sections: yup
      .array()
      .of(
        yup.object({
          title: yup.string().required('Section title is required'),
          description: yup.string().required('Section description is required'),
          videoUrl: yup.string().url('Video URL must be valid').required('Video URL is required'),
        })
      )
      .min(1, 'At least one section is required')
      .required('Sections are required'),
  })
  .required();
