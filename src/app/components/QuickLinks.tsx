import React from 'react';
import { CreditCard, CalendarDays, Bus, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import gateImg from '../../imports/School_gate.jpg';
import playgroundImg from '../../imports/Playground.jpg';
import busImg from '../../imports/school_Bus_2.jpg';
import scienceImg from '../../imports/Science_project.jpg';

export function QuickLinks() {
  const links = [
    {
      title: 'Pay Fees Online',
      icon: <CreditCard size={32} className="text-white" />,
      bgImage: gateImg,
      color: 'bg-blue-900',
    },
    {
      title: 'Academic Calendar',
      icon: <CalendarDays size={32} className="text-white" />,
      bgImage: playgroundImg,
      color: 'bg-amber-600',
    },
    {
      title: 'Transport Routes',
      icon: <Bus size={32} className="text-white" />,
      bgImage: busImg,
      color: 'bg-teal-700',
    },
    {
      title: 'Download Syllabus',
      icon: <BookOpen size={32} className="text-white" />,
      bgImage: scienceImg,
      color: 'bg-indigo-800',
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 transition-colors">Quick Links</h2>
          <div className="w-16 h-1 bg-amber-500 rounded mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => (
            <div 
              key={index} 
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-64 flex flex-col justify-end"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <ImageWithFallback 
                  src={link.bgImage} 
                  alt={link.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 ${link.color} mix-blend-multiply opacity-80 group-hover:opacity-70 transition-opacity`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col items-center text-center">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm mb-4 transform group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {link.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
