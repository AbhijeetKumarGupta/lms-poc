'use client';

import { Button, Card, CardContent, Typography } from '@mui/material';

import { useTheme } from '@/hooks/useTheme';
import { THEME } from '@/constants/theme';

export const ThemeTest = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <article>
      <Button onClick={() => changeTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT)}>
        Toggle Theme
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h5">Lizard</Typography>
          <Typography variant="body2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </Typography>
        </CardContent>
      </Card>
    </article>
  );
};
