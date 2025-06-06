import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';

const DashboardSkeleton = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h5">
        <Skeleton animation="wave" width={200} height={50} />
      </Typography>

      <Divider />

      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} variant="rectangular" width={330} height={380} animation="wave" />
        ))}
      </Box>
    </Stack>
  );
};

export default DashboardSkeleton;
