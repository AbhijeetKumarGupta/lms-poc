import { styled, Button } from '@mui/material';

export const StyledEditButton = styled(Button)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  borderRadius: 6,
  padding: '6px 16px',
  fontSize: '0.875rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    borderRadius: 12,
  },
}));
