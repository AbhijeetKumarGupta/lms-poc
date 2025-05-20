import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ThemeContextProvider } from '@/components/theme-context-provider';
import LayoutRenderer from '@/components/organism/layout-renderer';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeContextProvider>
          <LayoutRenderer>{children}</LayoutRenderer>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
