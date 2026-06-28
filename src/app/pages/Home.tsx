import React from 'react';
import { Hero } from '../components/Hero';
import { NoticeBoard } from '../components/NoticeBoard';
import { WelcomeArea } from '../components/WelcomeArea';
import { QuickLinks } from '../components/QuickLinks';

export function Home() {
  return (
    <>
      <Hero />
      <NoticeBoard />
      <WelcomeArea />
      <QuickLinks />
    </>
  );
}
