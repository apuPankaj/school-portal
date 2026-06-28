import React from 'react';
import { 
  AcademicHubWidget, 
  TimetableSyllabusWidget, 
  ExaminationsResultsWidget, 
  LibraryStatusWidget 
} from '../components/widgets/StudentWidgets';

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 dark:text-white">Student Dashboard</h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1">Welcome! Here's your academic hub, schedule, and resources.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          <AcademicHubWidget />
          <TimetableSyllabusWidget />
          <ExaminationsResultsWidget />
          <LibraryStatusWidget />
        </div>
      </div>
    </div>
  );
}
