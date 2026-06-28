import React from 'react';
import { BookOpen, Award, Users } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h5 className="font-bold text-amber-500 uppercase tracking-wider text-sm">Welcome To</h5>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white">Modern Public School</h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 text-gray-700 dark:text-slate-300 space-y-6 leading-relaxed">
          <p className="text-lg">
            <strong className="text-blue-900 dark:text-amber-400">Modern Public School</strong>, a co-educational school, is recognized by the Govt. of Odisha
            and affiliated with CBSE (Regd. No. 1530077). At present we function from Montessori to Std. XII.
          </p>
          
          <blockquote className="border-l-4 border-amber-500 pl-6 py-2 my-8 italic text-xl text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 rounded-r-lg">
            "Everybody who is anybody was taught how to be somebody by a teacher."
          </blockquote>
          
          <p>
            A child like a small plant is nurtured, taken care of and because of what is taught 'blooms'. 
            A child follows, imitates and behaves just like a teacher. So, to instill a sense of honor, humour, humility, 
            we must teach them in such a manner that they are inspired. 
          </p>
          <p className="font-medium text-blue-900 dark:text-blue-100">
            We teach because we love children. We teach because we are committed. We teach because its our life.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Academic Excellence</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">Consistently top-performing students in CBSE board examinations.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Dedicated Faculty</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">Experienced teachers committed to nurturing every child's potential.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-100 dark:border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Holistic Development</h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">Focus on sports, arts, and extracurriculars alongside academics.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
