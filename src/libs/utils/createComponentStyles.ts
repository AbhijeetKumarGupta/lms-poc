import { ColorCategory } from '@/libs/types/theme';

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
        borderRadius: '8px',
        padding: '10px 20px',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        '&:hover': {
          backgroundColor: backgroundColor.primaryDark ?? backgroundColor.primary,
          opacity: 0.9,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: backgroundColor.neutral,
        color: textColor.primary ?? textColor.default,
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
