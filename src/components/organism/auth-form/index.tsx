'use client';

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
import {
  useForm,
  Resolver,
  SubmitHandler,
  FieldValues,
  DefaultValues,
  Path,
} from 'react-hook-form';

interface AuthFormProps<T extends FieldValues> {
  title: string;
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
  showRoleSelect?: boolean;
  onSubmit: SubmitHandler<T>;
  serverError?: string;
  isSubmitting?: boolean;
}

export default function AuthForm<T extends FieldValues>({
  title,
  defaultValues,
  resolver,
  showRoleSelect = false,
  onSubmit,
  serverError,
  isSubmitting = false,
}: AuthFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<T>({
    resolver,
    defaultValues,
  });

  const role = watch('role' as Path<T>);
  const hasNameField = 'name' in defaultValues;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: 'auto', display: 'flex', height: '70vh' }}
      alignItems="center"
    >
      <Stack spacing={2} width="100%">
        <Typography variant="h4">{title}</Typography>

        {serverError && <Typography color="error">{serverError}</Typography>}

        {hasNameField && (
          <TextField
            label="Name"
            {...register('name' as Path<T>)}
            error={!!errors['name' as keyof T]}
            helperText={(errors['name' as keyof T]?.message ?? '') as string}
          />
        )}

        <TextField
          label="Email"
          type="email"
          {...register('email' as Path<T>)}
          error={!!errors['email' as keyof T]}
          helperText={(errors['email' as keyof T]?.message ?? '') as string}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password' as Path<T>)}
          error={!!errors['password' as keyof T]}
          helperText={(errors['password' as keyof T]?.message ?? '') as string}
        />

        {showRoleSelect && (
          <FormControl fullWidth error={!!errors['role' as keyof T]}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role ?? ''}
              label="Role"
              onChange={e =>
                setValue('role' as Path<T>, e.target.value as T[keyof T], {
                  shouldValidate: true,
                })
              }
            >
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
            <Typography color="error">
              {(errors['role' as keyof T]?.message ?? '') as string}
            </Typography>
          </FormControl>
        )}

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {title}
        </Button>
      </Stack>
    </Box>
  );
}
