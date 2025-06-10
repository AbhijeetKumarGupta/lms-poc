'use client';

import Image from 'next/image';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import CourseCard from '@/components/molecule/course-card';
import { USER_ROLES } from '@/constants';
import { enrollUser, unenrollUser } from '@/libs/services/enrollments';

type CoursesContainerProps = {
  title: string;
  user?: Any;
  courses: Any[];
  enrollments: Any[];
};

export const CoursesContainer = ({ title, user, courses, enrollments }: CoursesContainerProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMyCourses = pathname === '/my-courses';

  const [submitting, setSubmitting] = useState<string[]>([]);

  const enrolledCourseIds = useMemo(() => enrollments?.map(e => e.courseId), [enrollments]);
  const enrollmentMap = useMemo(() => {
    const map: Record<string, string> = {};
    enrollments?.forEach(e => {
      map[e.courseId] = e.id;
    });
    return map;
  }, [enrollments]);

  const handleEnroll = useCallback(
    async (courseId: string) => {
      if (!user?.id) return;
      setSubmitting(prev => [...prev, courseId]);
      try {
        await enrollUser({
          userId: user.id,
          courseId,
          enrolledAt: new Date().toISOString(),
        });

        router.refresh();
      } catch (err) {
        console.error('Enrollment failed:', err);
      } finally {
        setSubmitting(prev => prev.filter(id => id !== courseId));
      }
    },
    [user?.id, router]
  );

  const handleUnenroll = useCallback(
    async (courseId: string) => {
      const enrollmentId = enrollmentMap[courseId];
      if (!enrollmentId) return;

      setSubmitting(prev => [...prev, courseId]);
      try {
        await unenrollUser(enrollmentId);

        router.refresh();
      } catch (err) {
        console.error('Unenrollment failed:', err);
      } finally {
        setSubmitting(prev => prev.filter(id => id !== courseId));
      }
    },
    [enrollmentMap, router]
  );

  const handleView = useCallback(
    (courseId: string) => {
      router.push(`/${user ? 'course-details' : 'course'}/${courseId}`);
    },
    [router, user]
  );

  const courseCards = useMemo(() => {
    const filteredCourses = isMyCourses
      ? courses.filter(course =>
          user?.role === USER_ROLES.TEACHER
            ? course.creator?.id === user?.id
            : enrolledCourseIds.includes(course.id)
        )
      : courses;

    return filteredCourses.map((course, index) => {
      const courseId = course.id as Any;
      const isEnrolled = enrolledCourseIds.includes(courseId);
      return (
        <CourseCard
          key={course.id}
          {...course}
          isEnrolled={isEnrolled}
          onEnroll={() => handleEnroll(courseId)}
          onUnenroll={() => handleUnenroll(courseId)}
          onView={() => handleView(courseId)}
          showEnrollButton={!!user}
          isFirstCard={index === 0}
          isSubmitting={submitting.includes(courseId)}
        />
      );
    });
  }, [
    isMyCourses,
    courses,
    enrolledCourseIds,
    handleEnroll,
    handleUnenroll,
    handleView,
    user,
    submitting,
  ]);

  return (
    <Stack gap={2}>
      <Typography mb={2} mt={2} variant="h4">
        {title}
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems={!courseCards?.length ? 'center' : 'flex-start'}
        flexWrap="wrap"
        gap={2}
        height="65vh"
      >
        <Divider />
        {courseCards?.length ? (
          courseCards
        ) : (
          <Image
            src="https://eastcampus.shcollege.ac.in/wp-content/themes/eastcampas-2024/assets/no-results.png"
            width={400}
            height={400}
            alt="No data found!"
          />
        )}
      </Box>
    </Stack>
  );
};
