import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import LayoutRenderer from '@/components/organism/layout-renderer';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/auth/sign-in');
  }

  return <LayoutRenderer>{children}</LayoutRenderer>;
}
