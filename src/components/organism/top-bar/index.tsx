'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import BoyIcon from '@mui/icons-material/Boy';

import { useTheme } from '@/hooks/useTheme';
import { THEME } from '@/constants/theme';
import CustomSwitch from '@/components/atom/custom-switch';
import { getShortName } from '@/libs/utils';

import {
  StyledSignInLogoutButton,
  StyledSignUpButton,
  switchStyles,
  switchControllerStyles,
} from './styles';

interface TopBarProps {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const router = useRouter();
  const { theme, changeTheme } = useTheme();
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;

  const userNameShort = useMemo(() => getShortName(user?.name), [user]);

  return (
    <AppBar
      position="fixed"
      sx={theme => ({
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      })}
    >
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" gap={1} alignItems="center">
            {!!role && (
              <IconButton onClick={onMenuClick} color="inherit" edge="start">
                <MenuIcon />
              </IconButton>
            )}
            <Box
              display="flex"
              alignItems="flex-end"
              sx={{ cursor: 'pointer' }}
              onClick={() => router.push('/')}
            >
              <BoyIcon fontSize="large" color={theme === THEME.DARK ? 'error' : 'success'} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                GoodMe
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={2} alignItems="center">
            <CustomSwitch
              switchProps={{
                checked: theme === THEME.DARK,
                onChange: () => changeTheme(theme === THEME.DARK ? THEME.LIGHT : THEME.DARK),
                sx: switchStyles,
              }}
              controllerProps={{
                label: theme === THEME.DARK ? <DarkModeIcon /> : <LightModeIcon />,
                sx: switchControllerStyles,
              }}
            />
            {!session ? (
              <>
                <StyledSignInLogoutButton
                  onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}
                >
                  Sign In
                </StyledSignInLogoutButton>
                <StyledSignUpButton onClick={() => router.push('/auth/sign-up')}>
                  Sign Up
                </StyledSignUpButton>
              </>
            ) : (
              <>
                <StyledSignInLogoutButton onClick={() => signOut({ callbackUrl: '/auth/sign-in' })}>
                  Logout
                </StyledSignInLogoutButton>
                <Tooltip title={user?.name}>
                  <Avatar src={user?.image ?? undefined}>{userNameShort ?? 'U'}</Avatar>
                </Tooltip>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
