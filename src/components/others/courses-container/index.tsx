'use client';

import { useSession } from 'next-auth/react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import CourseCard from '@/components/organism/course-card';
import { courses, USER_ROLES } from '@/constants';
import { enrollUser, unenrollUser, getUserEnrollments } from '@/libs/services/enrollments';

type EnrollmentMap = Record<string, string>;

export const CoursesContainer = ({ title }: { title: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [submitting, setSubmitting] = useState<Array<string>>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [enrollmentMap, setEnrollmentMap] = useState<EnrollmentMap>({});

  const isMyCourses = pathname === '/my-courses';
  const user = session?.user;

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (!user?.id) return;

      try {
        const enrollments = await getUserEnrollments(user.id);
        const courseIds = enrollments?.map?.((e: Any) => e.courseId?.toString?.());
        const map: EnrollmentMap = {};
        enrollments?.forEach?.((e: Any) => {
          map[e.courseId] = e.id;
        });

        setEnrolledCourseIds(courseIds);
        setEnrollmentMap(map);
      } catch (err) {
        console.error('Failed to fetch enrollments', err);
      }
    };

    fetchEnrollments();
  }, [user?.id]);

  const handleEnroll = useCallback(
    async (courseId: string) => {
      if (!user?.id) return;
      setSubmitting(prev => [...prev, courseId]);
      try {
        const { data: newEnrollment } = await enrollUser({
          userId: user.id,
          courseId,
          enrolledAt: new Date().toISOString(),
        });
        setEnrolledCourseIds(prev => [...prev, courseId]);
        setEnrollmentMap(prev => ({
          ...prev,
          [courseId]: newEnrollment.id,
        }));
      } catch (err) {
        console.error('Enrollment failed:', err);
      } finally {
        setSubmitting(prev => prev.filter(id => id !== courseId));
      }
    },
    [user?.id]
  );

  const handleUnenroll = useCallback(
    async (courseId: string) => {
      const enrollmentId = enrollmentMap?.[courseId];
      if (!enrollmentId) return;

      setSubmitting(prev => [...prev, courseId]);
      try {
        await unenrollUser(enrollmentId);
        setEnrolledCourseIds(prev => prev.filter(id => id !== courseId));
        setEnrollmentMap(prev => {
          const updated = structuredClone({ ...prev });
          delete updated[courseId];
          return updated;
        });
      } catch (err) {
        console.error('Unenrollment failed:', err);
      } finally {
        setSubmitting(prev => prev.filter(id => id !== courseId));
      }
    },
    [enrollmentMap]
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
          user?.role === USER_ROLES.TEACHER
            ? course?.creator?.id === user?.id
            : enrolledCourseIds?.includes?.(course?.id)
        )
      : courses;

    return filteredCourses?.map?.((course, index) => {
      const isEnrolled = enrolledCourseIds?.includes?.(course.id);
      return (
        <CourseCard
          key={course.id}
          {...course}
          isEnrolled={isEnrolled}
          onEnroll={() => handleEnroll(course.id)}
          onUnenroll={() => handleUnenroll(course.id)}
          onView={() => handleView(course.id)}
          showEnrollButton={!!user}
          isFirstCard={index === 0}
          isSubmitting={submitting.includes(course.id)}
        />
      );
    });
  }, [isMyCourses, enrolledCourseIds, handleEnroll, handleUnenroll, handleView, user, submitting]);

  return (
    <Stack gap={2}>
      <Typography variant="h5">{title}</Typography>
      <Divider />
      <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
        {courseCards}
      </Box>
    </Stack>
  );
};
