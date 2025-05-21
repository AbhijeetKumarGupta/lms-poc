import { styled } from '@mui/material/styles';

export const RoleButton = styled('button')(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 700,
  borderRadius: 8,
  padding: '10px 32px',
  border: '2px solid transparent',
  margin: '0 8px',
  fontSize: '1rem',
  transition: 'background-color 0.3s, color 0.3s, border 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
}));
