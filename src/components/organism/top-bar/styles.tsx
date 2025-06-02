import { styled, SxProps, Theme, Button } from '@mui/material';

import { THEME } from '@/constants/theme';

export const StyledSignInLogoutButton = styled(Button)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: 700,
  borderRadius: 8,
  padding: '8px 24px',
  border: `2px solid ${theme.palette.primary.contrastText}`,
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    borderColor: theme.palette.primary.light,
    color: theme.palette.primary.light,
    borderRadius: 18,
    transition: 'border-radius 0.2s',
  },
}));

export const StyledSignUpButton = styled(Button)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontWeight: 700,
  borderRadius: 8,
  padding: '8px 24px',
  border: '2px solid transparent',
  transition: 'background-color 0.3s, color 0.3s',
  '&:hover': {
    borderColor: theme.palette.primary.light,
    borderRadius: 18,
    transition: 'border-radius 0.2s',
  },
}));

export const switchControllerStyles: SxProps<Theme> = {
  '.MuiFormControlLabel-label': {
    display: 'flex',
    color: muiTheme => muiTheme.palette.text.secondary,
    fontWeight: '700',
  },
  border: muiTheme =>
    `2px solid ${muiTheme.palette.mode === THEME.DARK ? muiTheme.palette.primary.main : muiTheme.palette.primary.contrastText}`,
  paddingRight: '10px',
  borderRadius: 8,
};
