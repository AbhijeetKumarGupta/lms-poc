'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Box, Typography, Divider, Paper, LinearProgress, Button } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { deleteCourse } from '@/libs/services/course';
import { getUserEnrollments } from '@/libs/services/enrollments';
import { getUserProgress, updateUserProgress } from '@/libs/services/progress';
import { Course, Section } from '@/libs/types/course';

import { StyledEditButton } from './styles';

interface CourseDetailsProps {
  courseData: Course;
}

const CourseDetails = ({ courseData }: CourseDetailsProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [enrolled, setEnrolled] = useState(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [markCompleteLoading, setMarkCompleteLoading] = useState<number[]>([]);

  const userId = session?.user?.id;
  const courseId = courseData.id as Any;

  useEffect(() => {
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
        setMarkCompleteLoading(prev => prev.filter(id => id !== sectionId));
      }
    },
    [userId, courseId, completedSections]
  );

  const handleDeleteClick = useCallback(async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    try {
      await deleteCourse(courseId);
      router.replace('/dashboard');
    } catch (error: Any) {
      console.error('Failed to delete course:', error);
      alert(error.message || 'Error deleting course.');
    }
  }, [router, courseId]);

  const isCreator = session?.user?.id === courseData?.creator?.id;

  const totalSections = courseData?.sections?.length || 0;
  const completedCount = completedSections.length;
  const progressPercentage = totalSections ? Math.floor((completedCount / totalSections) * 100) : 0;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box display="flex" alignItems="baseline" gap={0}>
          <Button
            color="error"
            sx={{ fontSize: 30, backgroundColor: 'transparent', marginRight: 2 }}
            variant="text"
            onClick={() => router.back()}
          >
            ←
          </Button>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: { xs: 400, sm: 600 },
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
            }}
          >
            {courseData.title}
          </Typography>
        </Box>
        {isCreator && (
          <Box
            display="flex"
            justifyContent="flex-end"
            width="30%"
            gap={2}
            mt={{ xs: 2, sm: 1 }}
            mr={2}
          >
            <StyledEditButton onClick={handleEditClick} variant="contained" size="small">
              Edit
            </StyledEditButton>
            <Button variant="outlined" color="error" size="small" onClick={handleDeleteClick}>
              Delete
            </Button>
          </Box>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Box
          sx={{
            width: '100%',
            height: 400,
            overflow: 'hidden',
            mb: 2,
            position: 'relative',
          }}
        >
          <Image
            src={courseData?.image}
            alt={courseData?.title}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'justify',
            mb: 4,
          }}
        >
          {courseData.description}
        </Typography>
      </Box>

      <Box width="100%" my={3} py={2} borderBottom="2px solid">
        <Typography variant="h4" textAlign="center">
          Sections
        </Typography>
      </Box>

      {enrolled && (
        <Box sx={{ mb: 4, p: 2, backgroundColor: 'rgba(255, 0, 0, 0.06)', borderRadius: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Progress: {progressPercentage}%
          </Typography>
          <LinearProgress color="success" variant="determinate" value={progressPercentage} />
        </Box>
      )}

      {courseData.sections.map((section: Section, index: number) => {
        const sectionId = section.id as number;
        const isCompleted = completedSections.includes(sectionId);

        return (
          <Paper
            key={section.id}
            elevation={4}
            sx={{
              mb: 5,
              p: 3,
              borderRadius: 3,
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
                disabled={markCompleteLoading.includes(sectionId)}
                color="success"
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
