'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Divider, Paper, useTheme } from '@mui/material';

import { fetchCourseById } from '@/libs/services/course';

interface Section {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

interface CourseDetailsProps {
  courseId: number;
}

const CourseDetails = ({ courseId }: CourseDetailsProps) => {
  const theme = useTheme();

  const [courseData, setCourseData] = useState<Any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      try {
        const data = await fetchCourseById(courseId);
        setCourseData(data);
      } catch (err: Any) {
        setError(err.message || 'Error loading course.');
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 600, color: theme.palette.text.primary }}
      >
        {courseData?.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: '1.1rem',
          lineHeight: 1.6,
          mb: 4,
        }}
      >
        {courseData?.description}
      </Typography>

      <Divider sx={{ my: 3 }} />
      {courseData?.sections?.map((section: Section, index: number) => (
        <Paper
          key={section.id}
          elevation={4}
          sx={{
            mb: 5,
            p: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, color: theme.palette.text.primary }}
          >
            {index + 1}. {section.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: theme.palette.text.secondary,
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            {section.description}
          </Typography>

          <Box sx={{ position: 'relative', height: 0, paddingTop: '56.25%' }}>
            <iframe
              src={section.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            ></iframe>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default CourseDetails;
