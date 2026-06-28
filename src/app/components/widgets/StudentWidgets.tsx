import React from 'react';
import { 
  BookOpen, Upload, Download, Calendar, FileText, Award, 
  Library, Clock, AlertCircle, FileVideo, BookMarked
} from 'lucide-react';

export function AcademicHubWidget() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <BookOpen className="w-6 h-6 text-blue-700 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Academic Hub</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3 flex items-center justify-between">
            <span>Digital Diary (Homework)</span>
            <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">Today</span>
          </h3>
          <div className="space-y-3">
            {[
              { subject: 'Mathematics', task: 'Complete Ex 4.2 - Quadratic Equations', deadline: 'Tomorrow, 09:00 AM' },
              { subject: 'Science', task: 'Draw the human digestive system', deadline: 'Thursday, 10:00 AM' }
            ].map((hw, i) => (
              <div key={i} className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700/50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{hw.subject}</div>
                    <div className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">{hw.task}</div>
                  </div>
                  <div className="text-xs text-amber-600 dark:text-amber-500 font-medium whitespace-nowrap bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
                    {hw.deadline}
                  </div>
                </div>
                <button className="text-xs w-full mt-2 py-1.5 flex items-center justify-center gap-1.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md hover:bg-gray-50 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 transition-colors">
                  <Upload className="w-3.5 h-3.5" /> Upload Assignment
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Study Materials</h3>
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center justify-center p-3 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30 transition-colors group">
              <FileText className="w-6 h-6 text-red-500 group-hover:text-red-600 dark:text-red-400 mb-2" />
              <span className="text-xs font-medium text-gray-700 dark:text-slate-300">PDF Notes</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/10 dark:hover:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-900/30 transition-colors group">
              <BookMarked className="w-6 h-6 text-orange-500 group-hover:text-orange-600 dark:text-orange-400 mb-2" />
              <span className="text-xs font-medium text-gray-700 dark:text-slate-300">PPT Slides</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/10 dark:hover:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-900/30 transition-colors group">
              <FileVideo className="w-6 h-6 text-purple-500 group-hover:text-purple-600 dark:text-purple-400 mb-2" />
              <span className="text-xs font-medium text-gray-700 dark:text-slate-300">Video Lectures</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TimetableSyllabusWidget() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Calendar className="w-6 h-6 text-green-700 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Timetable & Syllabus</h2>
      </div>

      <div className="mb-6 flex-grow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300">Today's Classes</h3>
          <span className="text-xs font-medium text-green-600 dark:text-green-400">Live Schedule</span>
        </div>
        <div className="space-y-2 relative before:absolute before:inset-y-0 before:left-3 before:w-0.5 before:bg-gray-200 dark:before:bg-slate-700">
          {[
            { time: '08:00 AM', subject: 'English Lit.', status: 'completed' },
            { time: '09:00 AM', subject: 'Mathematics', status: 'active' },
            { time: '10:00 AM', subject: 'Physics', status: 'upcoming' },
            { time: '11:00 AM', subject: 'Break', status: 'upcoming' }
          ].map((slot, i) => (
            <div key={i} className="flex gap-4 relative">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 
                ${slot.status === 'completed' ? 'bg-gray-200 dark:bg-slate-700' : 
                  slot.status === 'active' ? 'bg-green-500 ring-4 ring-green-100 dark:ring-green-900/30' : 
                  'bg-white border-2 border-gray-200 dark:bg-slate-900 dark:border-slate-700'}`}>
                {slot.status === 'active' && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div className={`flex-grow p-3 rounded-lg border ${slot.status === 'active' ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900/50' : 'bg-gray-50 border-gray-100 dark:bg-slate-800/50 dark:border-slate-700/50'}`}>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-semibold ${slot.status === 'active' ? 'text-green-800 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>{slot.subject}</span>
                  <span className="text-xs text-gray-500 dark:text-slate-400">{slot.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 transition-colors text-sm font-medium text-gray-700 dark:text-slate-300">
          <Download className="w-4 h-4 text-gray-500 dark:text-slate-400" /> Term Syllabus
        </button>
        <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 transition-colors text-sm font-medium text-gray-700 dark:text-slate-300">
          <Download className="w-4 h-4 text-gray-500 dark:text-slate-400" /> Exam Blueprint
        </button>
      </div>
    </div>
  );
}

export function ExaminationsResultsWidget() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Award className="w-6 h-6 text-amber-700 dark:text-amber-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Examinations & Results</h2>
        </div>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">View All</button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3 flex justify-between items-center">
            Upcoming: Half-Yearly Exams
            <button className="text-xs flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-[#161616] font-semibold px-3 py-1.5 rounded-full transition-colors shadow-sm">
              <Download className="w-3 h-3" /> Admit Card
            </button>
          </h3>
          <div className="bg-amber-50 dark:bg-amber-900/10 rounded-lg p-3 border border-amber-100 dark:border-amber-900/30">
            <div className="flex justify-between text-sm mb-2 pb-2 border-b border-amber-200 dark:border-amber-800/50">
              <span className="font-medium text-gray-800 dark:text-gray-200">12 Oct 2026</span>
              <span className="text-gray-600 dark:text-gray-400">Mathematics</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-800 dark:text-gray-200">14 Oct 2026</span>
              <span className="text-gray-600 dark:text-gray-400">Science</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Digital Report Cards</h3>
          <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700/50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">Term 1 Result</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">Published: 05 Sep 2026</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">Grade: A</div>
                <div className="text-xs font-medium text-gray-600 dark:text-slate-400">89.5% Overall</div>
              </div>
            </div>
            <div className="text-xs italic text-gray-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-3 rounded border border-gray-100 dark:border-slate-700/50">
              "Excellent performance in Science and Math. Needs to focus a bit more on languages. Keep it up!" - Class Teacher
            </div>
            <button className="w-full mt-3 flex justify-center items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 py-2 rounded-lg transition-colors">
              <FileText className="w-4 h-4" /> View Detailed Marksheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LibraryStatusWidget() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Library className="w-6 h-6 text-purple-700 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Library Status</h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 dark:text-slate-400">Total Fines</div>
          <div className="text-lg font-bold text-red-600 dark:text-red-400">₹ 0</div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Currently Issued Books</h3>
      <div className="space-y-3 flex-grow">
        {[
          { title: 'The Universe in a Nutshell', author: 'Stephen Hawking', issued: '01 Oct 2026', due: '15 Oct 2026', status: 'fine' },
          { title: 'Advanced Physics (Vol 1)', author: 'H.C. Verma', issued: '05 Oct 2026', due: '20 Oct 2026', status: 'good' }
        ].map((book, i) => {
          const isWarning = i === 0;
          
          return (
            <div key={i} className={`p-4 rounded-lg border ${isWarning ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-900/30' : 'bg-gray-50 border-gray-100 dark:bg-slate-800/50 dark:border-slate-700/50'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{book.title}</div>
                  <div className="text-xs text-gray-600 dark:text-slate-400">{book.author}</div>
                </div>
                <BookOpen className={`w-4 h-4 ${isWarning ? 'text-orange-500' : 'text-gray-400'}`} />
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-slate-700/50">
                <div className="text-xs text-gray-500 dark:text-slate-400">
                  Issued: {book.issued}
                </div>
                <div className={`text-xs font-semibold flex items-center gap-1 ${isWarning ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-slate-300'}`}>
                  <Clock className="w-3.5 h-3.5" /> Due: {book.due}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex gap-2 items-start text-xs text-blue-700 dark:text-blue-300">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>Remember to renew your books before the due date to avoid late fines of ₹5 per day.</p>
      </div>
    </div>
  );
}
