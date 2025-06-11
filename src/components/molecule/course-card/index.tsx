'use client';

import ShareIcon from '@mui/icons-material/Share';
import { Box, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { memo, useCallback, useMemo } from 'react';

import { USER_ROLES } from '@/constants';
import { getShortName } from '@/libs/utils';

interface CourseCardProps {
  id: string;
  showEnrollButton: boolean;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  creator: {
    name: string;
    avatar: string;
  };
  isEnrolled: boolean;
  onEnroll: () => void;
  onUnenroll?: () => void;
  onView: () => void;
  onShare?: () => void;
  isFirstCard?: boolean;
  isSubmitting?: boolean;
}

const CourseCard = memo(function CourseCard({
  id,
  showEnrollButton,
  title,
  image,
  description,
  createdAt,
  creator,
  isEnrolled,
  onEnroll,
  onUnenroll,
  onView,
  onShare,
  isFirstCard = false,
  isSubmitting,
}: CourseCardProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const creationDate = useMemo(
    () =>
      new Date(createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      }),
    [createdAt]
  );

  const handleEnrollClick = useCallback(() => {
    onEnroll?.();
  }, [onEnroll]);

  const handleUnenrollClick = useCallback(() => {
    onUnenroll?.();
  }, [onUnenroll]);

  const handleViewClick = useCallback(() => {
    onView?.();
  }, [onView]);

  const handleShare = useCallback(async () => {
    if (onShare) {
      onShare();
    } else {
      try {
        const shareData = {
          title: title,
          text: description,
          url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${id}`,
        };
        await navigator.share(shareData);
      } catch (err) {
        console.error(err);
      }
    }
  }, [title, description, id, onShare]);

  const creatorNameShort = useMemo(() => getShortName(creator?.name), [creator]);

  return (
    <Card sx={{ width: 330, position: 'relative', minHeight: 420 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 33, height: 33 }} src={creator?.avatar} aria-label={creator?.name}>
            {creatorNameShort}
          </Avatar>
        }
        title={
          <Tooltip title={title}>
            <Typography
              noWrap
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                width: title?.length > 30 ? '64%' : '100%',
                display: 'block',
              }}
            >
              {title}
            </Typography>
          </Tooltip>
        }
        subheader={`${creator?.name} • ${creationDate}`}
      />
      <Box sx={{ position: 'relative', height: 194 }}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 330px) 100vw, 330px"
          style={{ objectFit: 'cover' }}
          priority={isFirstCard}
          quality={75}
        />
      </Box>
      <CardContent sx={{ minHeight: 90, maxHeight: 90, overflow: 'hidden' }}>
        <Typography
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            textOverflow: 'ellipsis',
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2, pb: 2 }}
        disableSpacing
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="info"
            onClick={handleViewClick}
          >
            View
          </Button>
          {showEnrollButton &&
            (isEnrolled ? (
              <Button
                loading={isSubmitting}
                variant="outlined"
                color="error"
                onClick={handleUnenrollClick}
              >
                Unenroll
              </Button>
            ) : (
              user?.role === USER_ROLES.STUDENT && (
                <Button
                  loading={isSubmitting}
                  variant="contained"
                  color="success"
                  onClick={handleEnrollClick}
                >
                  Enroll
                </Button>
              )
            ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton aria-label="share" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
});

export default CourseCard;
