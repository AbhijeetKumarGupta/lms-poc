import TopBar from '@/components/organism/top-bar';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
