"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './globals.css';
import { Be_Vietnam_Pro, Noto_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import LoadingScreen from '@/components/loading-screen';

// Configure fonts
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} ${notoSans.variable} font-sans`}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <div className="relative flex min-h-screen flex-col bg-[#fff3e6] overflow-x-hidden">
              <Navigation />
              {children}
              <Footer />
              <Toaster />
            </div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}