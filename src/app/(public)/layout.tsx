import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import TopBar from '@/components/organism/top-bar';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    redirect('/dashboard');
  }
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
