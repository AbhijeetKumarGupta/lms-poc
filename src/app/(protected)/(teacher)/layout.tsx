import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { USER_ROLES } from '@/constants';

export default async function TeacherLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== USER_ROLES.TEACHER) {
    redirect('/dashboard');
  }

  return children;
}
