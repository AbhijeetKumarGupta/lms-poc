'use client';

import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { DrawerItem } from '@/types/drawer';

import { StyledDrawer, StyledDrawerContent } from './styles';

interface Props {
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  topbar?: React.ReactNode;
  drawerItems: DrawerItem[];
}

export default function ResponsiveDrawer({ topbar, children, open, onToggle, drawerItems }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isOpenAndDesktop = isDesktop && open;
  const showDrawer = !isDesktop || isOpenAndDesktop;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {topbar}
      {showDrawer && (
        <StyledDrawer
          variant={isOpenAndDesktop ? 'persistent' : 'temporary'}
          open={open}
          onClose={onToggle}
          ModalProps={{
            keepMounted: !isOpenAndDesktop,
          }}
        >
          <Box style={{ marginTop: '65px' }}>
            <List>
              {drawerItems?.map?.(({ text, icon, url }, index) => (
                <ListItem key={`${text}-${index}`} disablePadding>
                  <ListItemButton onClick={() => router.push(url)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </StyledDrawer>
      )}

      <StyledDrawerContent as="main" isDesktop={isDesktop} open={open}>
        {children}
      </StyledDrawerContent>
    </Box>
  );
}
