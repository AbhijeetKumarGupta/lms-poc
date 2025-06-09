import { colors, THEME } from '@/constants/theme';
import { createComponentStyles } from '@/libs/utils/createComponentStyles';
import { ThemeOptions } from '@mui/material';

export const themesOptions: Record<string, ThemeOptions> = {
  [THEME.LIGHT]: {
    palette: {
      mode: THEME.LIGHT,
      primary: {
        main: colors.primary,
        contrastText: colors.primaryContrastText,
        dark: colors.primaryDark,
      },
      secondary: {
        main: colors.secondary,
        contrastText: colors.secondaryContrastText,
        dark: colors.secondaryDark,
      },
      success: {
        main: colors.success,
        contrastText: colors.successContrastText,
        dark: colors.successDark,
      },
      error: {
        main: colors.error,
        contrastText: colors.errorContrastText,
        dark: colors.errorDark,
      },
      background: {
        default: colors.backgroundLight,
        paper: colors.paperLight,
      },
      text: {
        primary: colors.textPrimaryLight,
        secondary: colors.textSecondaryLight,
      },
    },
    components: createComponentStyles(
      { primary: colors.primary, neutral: colors.paperLight, primaryDark: colors.primaryDark },
      { primary: colors.textPrimaryLight, default: colors.textSecondaryLight }
    ),
  },
  [THEME.DARK]: {
    palette: {
      mode: THEME.DARK,
      primary: {
        main: colors.primaryDark,
        contrastText: colors.primaryContrastText,
        dark: colors.primary,
      },
      secondary: {
        main: colors.secondaryDark,
        contrastText: colors.secondaryContrastText,
        dark: colors.secondary,
      },
      success: {
        main: colors.successDark,
        contrastText: '#000000',
        dark: colors.success,
      },
      error: {
        main: colors.errorDark,
        contrastText: '#000000',
        dark: colors.error,
      },
      background: {
        default: colors.backgroundDark,
        paper: colors.paperDark,
      },
      text: {
        primary: colors.textPrimaryDark,
        secondary: colors.textSecondaryDark,
      },
    },
    components: createComponentStyles(
      { primary: colors.primaryDark, neutral: colors.paperDark, primaryDark: colors.primary },
      { primary: colors.textPrimaryDark, default: colors.textSecondaryDark }
    ),
  },
};
