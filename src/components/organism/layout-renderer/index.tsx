'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { SignedIn, useUser } from '@clerk/nextjs';

import RoleSelect from '@/components/molecule/role-select';
import TopBar from '@/components/organism/top-bar';
import ResponsiveDrawer from '@/components/organism/drawer';
import { getDrawerItems } from '@/libs/utils/getDrawerItems';

interface LayoutRendererProps {
  children: React.ReactNode;
}

export default function LayoutRenderer({ children }: LayoutRendererProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const role = user?.unsafeMetadata?.role as string | undefined;

  useEffect(() => {
    if (!user && drawerOpen) setDrawerOpen(false);
  }, [user, drawerOpen]);

  const handleDrawerToggle = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  const drawerItems = useMemo(() => getDrawerItems(role), [role]);

  const showPageContent = role || (isLoaded && !user);

  return (
    <ResponsiveDrawer
      topbar={<TopBar onMenuClick={handleDrawerToggle} />}
      open={drawerOpen}
      onToggle={handleDrawerToggle}
      drawerItems={drawerItems}
    >
      {showPageContent ? (
        children
      ) : (
        <SignedIn>
          <RoleSelect />
        </SignedIn>
      )}
    </ResponsiveDrawer>
  );
}
