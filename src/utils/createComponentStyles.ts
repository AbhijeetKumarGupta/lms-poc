import { ColorCategory } from '@/types/theme';

export const createComponentStyles = (
  backgroundColor: ColorCategory,
  textColor: ColorCategory
) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: backgroundColor.neutral,
        color: textColor.primary ?? textColor.default,
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: backgroundColor.primary,
        color: textColor.primary ?? textColor.default,
        '&:hover': {
          backgroundColor: backgroundColor.primary,
          opacity: 0.9,
        },
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: backgroundColor.neutral,
        color: textColor.primary ?? textColor.default,
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        color: textColor.primary ?? textColor.default,
        transition: 'color 0.3s ease',
      },
    },
  },
});
