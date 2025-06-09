import { styled, SxProps, Theme, Button } from '@mui/material';
import { THEME } from '@/constants/theme';

export const StyledSignInLogoutButton = styled(Button)(({ theme }) => {
  const isLight = theme.palette.mode === THEME.LIGHT;
  const bgColor = isLight ? theme.palette.primary.main : theme.palette.primary.light;
  const hoverBgColor = isLight ? theme.palette.primary.dark : theme.palette.primary.main;
  const textColor = theme.palette.getContrastText(bgColor);
  const hoverTextColor = theme.palette.getContrastText(hoverBgColor);

  return {
    backgroundColor: bgColor,
    color: textColor,
    fontWeight: 700,
    borderRadius: 8,
    padding: '10px 26px',
    border: '2px solid transparent',
    textTransform: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: hoverBgColor,
      borderColor: hoverBgColor,
      color: hoverTextColor,
    },
  };
});

export const StyledSignUpButton = styled(Button)(({ theme }) => {
  const isLight = theme.palette.mode === THEME.LIGHT;
  const bgColor = isLight ? theme.palette.secondary.main : theme.palette.secondary.light;
  const hoverBgColor = isLight ? theme.palette.secondary.dark : theme.palette.secondary.main;
  const textColor = theme.palette.getContrastText(bgColor);
  const hoverTextColor = theme.palette.getContrastText(hoverBgColor);

  return {
    backgroundColor: bgColor,
    color: textColor,
    fontWeight: 700,
    borderRadius: 8,
    padding: '10px 26px',
    border: '2px solid transparent',
    textTransform: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: hoverBgColor,
      borderColor: hoverBgColor,
      color: hoverTextColor,
    },
  };
});

export const switchControllerStyles: SxProps<Theme> = theme => ({
  '.MuiFormControlLabel-label': {
    display: 'flex',
    color: theme.palette.text.primary,
    fontWeight: 700,
  },
  border: `2px solid ${
    theme.palette.mode === THEME.DARK ? theme.palette.error.main : theme.palette.text.primary
  }`,
  paddingRight: '10px',
  borderRadius: 8,
});

export const switchStyles: SxProps<Theme> = theme => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.main + '22',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.error.main,
  },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.mode === THEME.DARK ? theme.palette.error.light : undefined,
  },
});
