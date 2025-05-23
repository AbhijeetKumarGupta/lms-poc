'use client';

import { useUser } from '@clerk/nextjs';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useState, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import CourseCard from '@/components/organism/course-card';
import { courses, USER_ROLES } from '@/constants';

export const CoursesContainer = () => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isMyCourses = pathname === '/my-courses';
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

  const courseCards = useMemo(() => {
    const filteredCourses = isMyCourses
      ? courses?.filter(course =>
          user?.unsafeMetadata?.role === USER_ROLES.TEACHER
            ? course?.creator?.id === user?.id
            : enrolledCourses?.includes?.(course?.id)
        )
      : courses;
    return filteredCourses?.map?.((course, index) => (
      <CourseCard
        key={course?.id}
        {...course}
        isEnrolled={enrolledCourses?.includes?.(course?.id)}
        onEnroll={() => handleEnroll(course?.id)}
        onView={() => handleView(course?.id)}
        showEnrollButton={!!user}
        isFirstCard={index === 0}
      />
    ));
  }, [isMyCourses, enrolledCourses, handleEnroll, handleView, user]);

  return (
    <Stack gap={2}>
      <Typography variant="h5">{isMyCourses ? 'My Courses' : 'All Courses'}</Typography>
      <Divider />
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
        {courseCards}
      </Box>
    </Stack>
  );
};
