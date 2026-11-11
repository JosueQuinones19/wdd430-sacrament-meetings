import type { Metadata } from 'next';
import { Suspense } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import NavLinks from '@/components/NavLinks';
import Footer from '@/components/Footer';

const merriweather = localFont({
  src: [
    { path: '../public/fonts/merriweather-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/merriweather-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/merriweather-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/merriweather-latin-900-normal.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Sacrament Meeting Planner',
  description:
    'Plan and view sacrament meeting agendas for Maple Creek 3rd Ward.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${merriweather.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Suspense>
          <Header />
        </Suspense>
        <Suspense>
          <NavLinks />
        </Suspense>
        <main className="flex-1 px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
