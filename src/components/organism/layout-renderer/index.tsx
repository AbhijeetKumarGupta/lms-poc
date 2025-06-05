'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';

import TopBar from '@/components/organism/top-bar';
import ResponsiveDrawer from '@/components/molecule/drawer';
import { getDrawerItems } from '@/libs/utils/getDrawerItems';

export default function LayoutRenderer({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  const drawerItems = useMemo(() => getDrawerItems(role), [role]);

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
