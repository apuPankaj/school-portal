import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Header } from './Header';
import { Footer } from './Footer';
import { Outlet } from 'react-router';
import { Chatbot } from '../widgets/Chatbot';
import { Toaster } from 'sonner';

export function Root() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <Chatbot />
        <Toaster richColors position="top-right" />
      </div>
    </ThemeProvider>
  );
}
