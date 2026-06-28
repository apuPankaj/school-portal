import image_princepal from '@/imports/princepal.jpg'
import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function WelcomeArea() {
  const principalImg = "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYW4lMjBtaWRkbGUtYWdlZCUyMG1hbGUlMjBwcm9mZXNzaW9uYWwlMjBlZHVjYXRpb24lMjBwcmluY2lwYWx8ZW58MXx8fHwxNzgyNjA1NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Mission Text */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-amber-400 mb-4 transition-colors">
              Our Mission at Modern Public School
            </h2>
            <div className="w-20 h-1 bg-amber-500 rounded"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors">
              At Modern Public School Balasore, we are committed to fostering a dynamic learning environment that inspires excellence and nurtures the intellectual, social, and emotional growth of every student. 
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors">
              Our vision is to empower young minds with the knowledge, skills, and values required to thrive in a rapidly changing world. We believe in an inclusive education system that celebrates diversity and encourages creativity, critical thinking, and compassionate leadership.
            </p>
            <button className="text-blue-900 dark:text-white font-semibold border-b-2 border-amber-500 pb-1 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
              Read Our Full Vision & Mission
            </button>
          </div>

          {/* Principal's Message */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row relative transition-colors duration-300">
            <div className="w-full sm:w-2/5 relative min-h-[300px] sm:min-h-full">
               <ImageWithFallback 
                 src={image_princepal} 
                 alt="Principal"
                 className="absolute inset-0 w-full h-full object-cover dark:brightness-90 transition-all"
               />
            </div>
            <div className="p-8 w-full sm:w-3/5">
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2 transition-colors">From the Principal's Desk</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic text-sm md:text-base transition-colors">
                "Education is not just about academic excellence; it is about character building. We strive to create an atmosphere where children can discover their true potential and grow into responsible global citizens."
              </p>
              <div>
                <p className="font-bold text-blue-900 dark:text-blue-100 transition-colors"></p>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">Principal, MPS Balasore</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
