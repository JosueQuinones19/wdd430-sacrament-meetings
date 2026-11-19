import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Merriweather } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import NavLinks from '@/components/NavLinks';
import Footer from '@/components/Footer';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
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
