'use client';

import { useSession } from 'next-auth/react';
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Paper,
  useTheme,
  LinearProgress,
  Button,
} from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { fetchCourseById } from '@/libs/services/course';
import { getUserEnrollments } from '@/libs/services/enrollments';
import { getUserProgress, updateUserProgress } from '@/libs/services/progress';
import { Course, Section } from '@/libs/types/course';

import { StyledEditButton } from './styles';

interface CourseDetailsProps {
  courseId: number;
}

const CourseDetails = ({ courseId }: CourseDetailsProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { data: session } = useSession();

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [enrolled, setEnrolled] = useState<boolean>(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [markCompleteLoading, setMarkCompleteLoading] = useState<Array<number>>([]);

  const userId = session?.user?.id;

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

    const checkEnrollmentAndProgress = async () => {
      if (!userId) return;

      try {
        const enrollments = await getUserEnrollments(userId);
        const isEnrolled = enrollments.some((e: Any) => e.courseId === courseId);
        setEnrolled(isEnrolled);
        if (isEnrolled) {
          const { data: progress } = await getUserProgress(userId, courseId);

          if (progress) {
            setCompletedSections(progress?.completedSectionIds || []);
          }
        }
      } catch (err) {
        console.error('Enrollment/progress fetch failed:', err);
      }
    };

    loadCourse();
    checkEnrollmentAndProgress();
  }, [courseId, userId]);

  const handleEditClick = () => {
    router.push(`/manage-course/${courseId}`);
  };

  const markSectionComplete = useCallback(
    async (sectionId: number) => {
      if (!userId || !courseId) return;
      setMarkCompleteLoading(prev => [...prev, sectionId]);
      const updatedSections = [...new Set([...completedSections, sectionId])];

      try {
        await updateUserProgress({
          userId,
          courseId,
          completedSectionIds: updatedSections,
        });

        setCompletedSections(updatedSections);
      } catch (err) {
        console.error('Failed to update progress:', err);
      } finally {
        setMarkCompleteLoading(prev => prev?.filter(id => sectionId !== id));
      }
    },
    [userId, courseId, completedSections]
  );

  const isCreator = session?.user?.id === courseData?.creator?.id;

  const totalSections = courseData?.sections?.length || 0;
  const completedCount = completedSections.length;
  const progressPercentage = totalSections ? Math.floor((completedCount / totalSections) * 100) : 0;

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (loading || !courseData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {courseData.title}
        </Typography>
        {isCreator && (
          <StyledEditButton onClick={handleEditClick} variant="contained" size="small">
            Edit
          </StyledEditButton>
        )}
      </Box>

      <Typography variant="body1" sx={{ mb: 4 }}>
        {courseData.description}
      </Typography>

      {enrolled && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Progress: {progressPercentage}%
          </Typography>
          <LinearProgress variant="determinate" value={progressPercentage} />
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {courseData.sections.map((section: Section, index: number) => {
        const sectionId = section.id as Any;
        const isCompleted = completedSections.includes(sectionId);

        return (
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
            <Typography variant="h5" gutterBottom>
              {index + 1}. {section.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {section.description}
            </Typography>

            <Box sx={{ position: 'relative', height: 0, paddingTop: '56.25%' }}>
              <iframe
                src={section.videoUrl}
                frameBorder="0"
                allow="autoplay; encrypted-media"
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

            {enrolled && !isCompleted && (
              <Button
                variant="outlined"
                onClick={() => markSectionComplete(sectionId)}
                sx={{ mt: 2 }}
                loading={markCompleteLoading?.includes(sectionId)}
              >
                Mark as Complete
              </Button>
            )}
            {enrolled && isCompleted && (
              <Typography sx={{ mt: 2, color: 'green' }}>✔ Section Completed</Typography>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default CourseDetails;
