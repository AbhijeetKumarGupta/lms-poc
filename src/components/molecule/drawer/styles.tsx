import { Box, Drawer, styled } from '@mui/material';

const drawerWidth = 240;

export const StyledDrawerContent = styled(Box, {
  shouldForwardProp: prop => prop !== 'isDesktop' && prop !== 'open',
})<{
  isDesktop: boolean;
  open: boolean;
}>(({ isDesktop, open, theme }) => ({
  flexGrow: 1,
  marginLeft: isDesktop && open ? `${drawerWidth}px` : 0,
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    width: `${drawerWidth}px`,
    boxSizing: 'border-box',
  },
}));
