import React from 'react';
import { useLocation } from 'react-router';

export function GenericPage() {
  const location = useLocation();
  
  // Create a readable title from the pathname (e.g. /vision-mission -> Vision Mission)
  const path = location.pathname.split('/').pop() || '';
  const title = path
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-[60vh] bg-gray-50 dark:bg-slate-950 transition-colors py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white">
          {title || 'Page'}
        </h1>
        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
        
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 mt-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-5/6 mx-auto"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/2 mx-auto"></div>
          </div>
          <p className="mt-8 text-gray-500 dark:text-slate-400">
            This section is currently being updated. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
