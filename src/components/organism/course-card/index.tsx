import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

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
  onView: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
}

export default function CourseCard({
  showEnrollButton,
  title,
  image,
  description,
  creator,
  isEnrolled,
  onEnroll,
  onView,
  onFavorite,
  onShare,
}: CourseCardProps) {
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
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent sx={{ minHeight: 80, maxHeight: 80, overflow: 'hidden' }}>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2, pb: 2 }}
        disableSpacing
      >
        {showEnrollButton && (
          <Button
            variant="contained"
            color={isEnrolled ? 'success' : 'primary'}
            onClick={isEnrolled ? onView : onEnroll}
          >
            {isEnrolled ? 'View' : 'Enroll'}
          </Button>
        )}
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
}
