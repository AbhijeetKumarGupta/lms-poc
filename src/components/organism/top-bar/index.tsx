'use client';

import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useTheme } from '@/hooks/useTheme';
import { THEME } from '@/constants/theme';
import CustomSwitch from '@/components/atom/custom-switch';

import { StyledSignInLogoutButton, StyledSignUpButton, switchControllerStyles } from './styles';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const router = useRouter();
  const { theme, changeTheme } = useTheme();
  const { data: session } = useSession();
  const role = session?.user?.role;

  return (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {!!role && (
          <IconButton onClick={onMenuClick} color="inherit" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Learn Before You Earn
        </Typography>
        <CustomSwitch
          switchProps={{
            checked: theme === THEME.DARK,
            onChange: () => changeTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK),
          }}
          controllerProps={{
            label: theme === THEME.DARK ? <DarkModeIcon /> : <LightModeIcon />,
            sx: switchControllerStyles,
          }}
        />
        {!session ? (
          <Box display="flex" gap={2}>
            <StyledSignInLogoutButton onClick={() => signIn()}>Sign In</StyledSignInLogoutButton>
            <StyledSignUpButton onClick={() => router.push('/auth/sign-up')}>
              Sign Up
            </StyledSignUpButton>
          </Box>
        ) : (
          <StyledSignInLogoutButton onClick={() => signOut()}>Logout</StyledSignInLogoutButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
