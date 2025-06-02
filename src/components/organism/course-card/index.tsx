'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';
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
import { memo, useCallback } from 'react';

import { USER_ROLES } from '@/constants';

interface CourseCardProps {
  showEnrollButton: boolean;
  title: string;
  image: string;
  description: string;
  creator: {
    name: string;
    dateOfCreation: string;
    avatar: string;
  };
  isEnrolled: boolean;
  onEnroll: () => void;
  onUnenroll?: () => void;
  onView: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
  isFirstCard?: boolean;
  isSubmitting?: boolean;
}

const CourseCard = memo(function CourseCard({
  showEnrollButton,
  title,
  image,
  description,
  creator,
  isEnrolled,
  onEnroll,
  onUnenroll,
  onView,
  onFavorite,
  onShare,
  isFirstCard = false,
  isSubmitting,
}: CourseCardProps) {
  const { data: session } = useSession();
  const user = session?.user;

  const handleEnrollClick = useCallback(() => {
    onEnroll?.();
  }, [onEnroll]);

  const handleUnenrollClick = useCallback(() => {
    onUnenroll?.();
  }, [onUnenroll]);

  const handleViewClick = useCallback(() => {
    onView?.();
  }, [onView]);

  return (
    <Card sx={{ maxWidth: 330, position: 'relative', minHeight: 420 }}>
      <CardHeader
        avatar={
          <Avatar src={creator?.avatar} aria-label={creator?.name}>
            {creator?.name?.[0]}
          </Avatar>
        }
        title={title}
        subheader={`${creator?.name} • ${creator?.dateOfCreation}`}
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
      <CardContent sx={{ minHeight: 80, maxHeight: 80, overflow: 'hidden' }}>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2, pb: 2 }}
        disableSpacing
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="success"
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
                  color="primary"
                  onClick={handleEnrollClick}
                >
                  Enroll
                </Button>
              )
            ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton aria-label="add to favorites" onClick={onFavorite}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={onShare}>
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
});

export default CourseCard;
