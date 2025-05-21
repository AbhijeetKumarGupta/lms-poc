'use client';

import { useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { Stack, Typography, CircularProgress } from '@mui/material';

import { RoleButton } from './styles';
import { USER_ROLES } from '@/constants';

export default function RoleSelect() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = useCallback(
    async (role: USER_ROLES) => {
      setLoading(true);
      try {
        await user?.update?.({
          unsafeMetadata: {
            ...(user?.unsafeMetadata || {}),
            role,
          },
        });
        window.location.reload();
      } catch (error) {
        console.error('Failed to set role:', error);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  if (!isLoaded || !user) return null;

  if (user?.unsafeMetadata?.role) return null;

  return (
    <Stack spacing={5} alignItems="center" justifyContent="center" height="80vh">
      <Typography variant="h4">Select your role</Typography>

      <Stack direction="row" spacing={4}>
        <RoleButton disabled={loading} onClick={() => handleRoleSelect(USER_ROLES.TEACHER)}>
          I&apos;m a Teacher
        </RoleButton>
        <RoleButton disabled={loading} onClick={() => handleRoleSelect(USER_ROLES.STUDENT)}>
          I&apos;m a Student
        </RoleButton>
      </Stack>

      {loading && (
        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
          <CircularProgress size={20} />
          <Typography variant="body2">Setting your role...</Typography>
        </Stack>
      )}
    </Stack>
  );
}
