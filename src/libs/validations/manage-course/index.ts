import * as yup from 'yup';

export const manageCourseSchema = yup
  .object({
    title: yup.string().required('Title is required'),
    image: yup.string().url('Image must be a valid URL').required('Image URL is required'),
    description: yup.string().required('Description is required'),
    creator: yup
      .object({
        name: yup.string().required('Creator name is required'),
        avatar: yup
          .string()
          .url('Avatar must be a valid URL')
          .required('Creator avatar URL is required'),
        dateOfCreation: yup.string().required('Date of creation is required'),
      })
      .required(),
  })
  .required();
