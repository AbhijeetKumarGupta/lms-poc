'use client';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useTheme } from '@/hooks/useTheme';
import { THEME } from '@/constants/theme';
import CustomSwitch from '@/components/atom/custom-switch';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { theme, changeTheme } = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: muiTheme => muiTheme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: muiTheme => muiTheme.palette.text.secondary,
            fontWeight: '700',
          }}
        >
          Learn Before You Earn
        </Typography>
        <CustomSwitch
          switchProps={{
            checked: theme === THEME.DARK,
            onChange: () => changeTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK),
          }}
          controllerProps={{
            label: 'Dark',
            sx: {
              '.MuiFormControlLabel-label': {
                color: muiTheme => muiTheme.palette.text.secondary,
                fontWeight: '700',
              },
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
