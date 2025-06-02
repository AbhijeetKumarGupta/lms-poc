import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Box } from '@mui/material';

import { getSession } from '@/libs/session';
import Providers from '@/components/others/providers';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LBYE',
  description: 'Learn Before You Earn',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers session={session}>{<Box margin="70px 20px">{children}</Box>}</Providers>
      </body>
    </html>
  );
}
