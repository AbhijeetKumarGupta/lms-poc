'use client';

import { useUser } from '@clerk/nextjs';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import CourseCard from '@/components/organism/course-card';
import { courses } from '@/constants';

export const CoursesContainer = () => {
  const { user } = useUser();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(
    Array.isArray(user?.unsafeMetadata?.enrolledCourses)
      ? user?.unsafeMetadata?.enrolledCourses
      : []
  );

  const handleEnroll = useCallback(
    async (courseId: string) => {
      if (!user) return;
      const updated = Array.isArray(enrolledCourses) ? [...enrolledCourses, courseId] : [courseId];
      await user.update({ unsafeMetadata: { ...user.unsafeMetadata, enrolledCourses: updated } });
      setEnrolledCourses(updated);
    },
    [user, enrolledCourses]
  );

  const handleView = useCallback(
    (courseId: string) => {
      router.push(`/courses/${courseId}`);
    },
    [router]
  );

  const courseCards = useMemo(
    () =>
      courses?.map?.(course => (
        <CourseCard
          key={course?.id}
          {...course}
          isEnrolled={enrolledCourses?.includes?.(course?.id)}
          onEnroll={() => handleEnroll(course?.id)}
          onView={() => handleView(course?.id)}
          showEnrollButton={!!user}
        />
      )),
    [enrolledCourses, handleEnroll, handleView, user]
  );

  return (
    <Stack gap={2}>
      <Typography variant="h5">Courses</Typography>
      <Divider />
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
        {courseCards}
      </Box>
    </Stack>
  );
};
