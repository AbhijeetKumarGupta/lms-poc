import { ThemeOptions } from '@mui/material';

import { colors, THEME } from '@/constants/theme';
import { createComponentStyles } from '@/utils/createComponentStyles';

const {
  __color_primary,
  __color_neutral,
  __color_text,
  __dark_color_primary,
  __dark_color_neutral,
  __dark_color_text,
} = colors;

export const themesOptions: Record<string, ThemeOptions> = {
  [THEME.LIGHT]: {
    palette: {
      mode: THEME.LIGHT,
      background: {
        default: __color_neutral,
        paper: __color_neutral,
      },
      text: {
        primary: __color_text,
      },
    },
    components: createComponentStyles(
      {
        primary: __color_primary,
        neutral: __color_neutral,
      },
      { default: __color_text }
    ),
  },
  [THEME.DARK]: {
    palette: {
      mode: THEME.DARK,
      background: {
        default: __dark_color_primary,
        paper: __dark_color_primary,
      },
      text: {
        primary: __dark_color_text,
      },
    },
    components: createComponentStyles(
      {
        primary: __dark_color_primary,
        neutral: __dark_color_neutral,
      },
      { default: __dark_color_text }
    ),
  },
};
