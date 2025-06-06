import { Box, Skeleton, Stack } from '@mui/material';

const ProtectedCourseDetailsSkeleton = () => {
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Skeleton variant="text" width="40%" height={50} />
      <Skeleton variant="text" width="80%" height={30} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={10} sx={{ mb: 4 }} />

      <Stack spacing={4}>
        {[...Array(2)].map((_, i) => (
          <Box key={i}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="90%" height={25} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={250} sx={{ borderRadius: 2 }} />
            <Skeleton variant="text" width="30%" height={40} sx={{ mt: 2 }} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
export default ProtectedCourseDetailsSkeleton;
