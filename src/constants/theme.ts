export enum THEME {
  'LIGHT' = 'light',
  'DARK' = 'dark',
}

const lightThemeColors = {
  __color_primary: '#f4f5f7',
  __color_neutral: '#FFFFFF',
  __color_text: '#121212',
};

const darkThemeColors = {
  __dark_color_primary: '#1E1E1E',
  __dark_color_neutral: '#1E1E1E',
  __dark_color_text: '#FFFFFF',
};

export const colors = {
  ...lightThemeColors,
  ...darkThemeColors,
};
