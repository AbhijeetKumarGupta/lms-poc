import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { styled } from '@mui/material';

export const StyledSignInButton = styled(SignInButton)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 700,
  borderRadius: 8,
  padding: '8px 24px',
  border: `2px solid ${theme.palette.primary.contrastText}`,
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    borderRadius: 0,
  },
}));

export const StyledSignUpButton = styled(SignUpButton)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontWeight: 700,
  borderRadius: 8,
  padding: '8px 24px',
  border: '2px solid transparent',
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    borderRadius: 0,
  },
}));
