'use client';

import { useState, useCallback } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import TopBar from '@/components/organism/top-bar';
import ResponsiveDrawer from '@/components/organism/drawer';

interface LayoutRendererProps {
  children: React.ReactNode;
}

export default function LayoutRenderer({ children }: LayoutRendererProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  //TODO: Add drawer items in proper place and remove this
  const drawerItems = [
    { text: 'Inbox', icon: <InboxIcon />, onClick: () => {} },
    { text: 'Starred', icon: <MailIcon />, onClick: () => {} },
    { text: 'Send email', icon: <InboxIcon />, onClick: () => {} },
    { text: 'Drafts', icon: <MailIcon />, onClick: () => {} },
  ];

  return (
    <ResponsiveDrawer
      topbar={<TopBar onMenuClick={handleDrawerToggle} />}
      open={drawerOpen}
      onToggle={handleDrawerToggle}
      drawerItems={drawerItems}
    >
      {children}
    </ResponsiveDrawer>
  );
}
