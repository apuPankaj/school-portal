import React from 'react';
import { 
  CreditCard, CalendarDays, FileText, MessageSquare, Bus, 
  Download, IndianRupee, MapPin, Phone, Send, CheckCircle2,
  Clock, XCircle, Users
} from 'lucide-react';

export function FeeManagementWidget() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <CreditCard className="w-6 h-6 text-blue-700 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fee Management</h2>
      </div>
      
      <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-slate-400">Current Dues</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <IndianRupee className="w-4 h-4 mr-0.5" /> 12,500
          </span>
        </div>
        <div className="flex justify-between items-center text-red-600 dark:text-red-400 text-sm">
          <span>Late Fines</span>
          <span className="flex items-center"><IndianRupee className="w-3.5 h-3.5 mr-0.5" /> 250</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
          <div className="flex justify-between items-center font-semibold">
            <span className="text-gray-900 dark:text-white">Total Payable</span>
            <span className="text-lg text-blue-700 dark:text-amber-400 flex items-center">
              <IndianRupee className="w-4 h-4 mr-0.5" /> 12,750
            </span>
          </div>
        </div>
      </div>

      <button className="w-full bg-amber-500 hover:bg-amber-600 text-[#161616] font-semibold py-2.5 rounded-lg shadow-sm transition-colors mb-4">
        Pay Now
      </button>
      <div className="text-xs text-center text-gray-500 dark:text-slate-500 mb-6">
        Accepts UPI, Credit/Debit Cards, Net Banking
      </div>

      <div className="mt-auto">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Recent Receipts</h3>
        <div className="space-y-2">
          {[
            { term: 'Term 1 Tuition Fee', date: '10 Apr 2026' },
            { term: 'Annual Charges', date: '05 Apr 2026' }
          ].map((receipt, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700/50">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{receipt.term}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">{receipt.date}</div>
              </div>
              <button className="p-2 text-blue-600 dark:text-amber-400 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition-colors" title="Download PDF">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AttendanceTrackingWidget() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <CalendarDays className="w-6 h-6 text-green-700 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Attendance Tracking</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="font-medium text-gray-900 dark:text-white">June 2026</span>
        <span className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">
          85% Attendance
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2 text-xs font-medium text-gray-500 dark:text-slate-400">
        <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-sm mb-6">
        {Array.from({ length: 30 }).map((_, i) => {
          const day = i + 1;
          let statusClass = "bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-slate-500";
          
          if (day <= 28) {
            const isWeekend = (i % 7 === 0 || i % 7 === 6);
            if (isWeekend) statusClass = "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-medium";
            else if (day === 12 || day === 15) statusClass = "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold";
            else if (day === 20) statusClass = "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 font-bold";
            else statusClass = "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium";
          }

          return (
            <div key={i} className={`aspect-square flex items-center justify-center rounded-md ${statusClass}`}>
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-y-2 text-xs text-gray-600 dark:text-slate-300">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-400"></div> Present</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-400"></div> Absent</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> Half-Day</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-400"></div> Holiday</div>
      </div>
    </div>
  );
}

export function LeaveApplicationWidget() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
          <FileText className="w-6 h-6 text-amber-700 dark:text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Leave Application</h2>
      </div>

      <form className="space-y-4 flex-grow flex flex-col" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Leave Type</label>
          <select className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outline-none transition-colors">
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Emergency</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">From Date</label>
            <input type="date" className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">To Date</label>
            <input type="date" className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outline-none transition-colors" />
          </div>
        </div>

        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Reason</label>
          <textarea 
            rows={3}
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outline-none transition-colors resize-none h-full"
            placeholder="Briefly describe the reason for leave..."
          ></textarea>
        </div>

        <button className="w-full mt-auto flex justify-center items-center gap-2 bg-blue-900 hover:bg-blue-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-2.5 rounded-lg transition-colors border border-transparent dark:border-slate-700">
          <Send className="w-4 h-4" />
          Submit to Class Teacher
        </button>
      </form>
    </div>
  );
}

export function CommunicationHubWidget() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors lg:col-span-2 xl:col-span-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <MessageSquare className="w-6 h-6 text-purple-700 dark:text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Communication Hub</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-purple-50 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700/50 transition-colors group">
          <Users className="w-6 h-6 text-gray-400 group-hover:text-purple-600 dark:text-slate-400 dark:group-hover:text-purple-400 mb-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Request PTM</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700/50 transition-colors group">
          <MessageSquare className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400 mb-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Message Teachers</span>
        </button>
      </div>

      <div className="mt-auto">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Recent Messages</h3>
        <div className="space-y-3">
          <div className="flex gap-3 items-start p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-xs shrink-0">
              MR
            </div>
            <div>
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Mr. Rajesh (Maths)</span>
                <span className="text-xs text-gray-500 dark:text-slate-400">2h ago</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-2">
                Please ensure your ward completes the assignment on Trigonometry by tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

export function TransportTrackingWidget() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <Bus className="w-6 h-6 text-yellow-700 dark:text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transport Tracking</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          In Transit
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Map Placeholder */}
        <div className="relative w-full h-48 md:h-full bg-gray-100 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden min-h-[200px]">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ 
            backgroundImage: 'radial-gradient(circle at center, #64748b 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }}></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <MapPin className="w-8 h-8 text-amber-500 mb-2" />
            <p className="text-sm font-medium text-gray-600 dark:text-slate-400">Real-time GPS Tracking</p>
            <p className="text-xs text-gray-500 mt-1">Bus is currently near Gandhi Chowk</p>
          </div>
          
          {/* Simulated Route Line */}
          <div className="absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-blue-500/50 rounded-full transform -rotate-12"></div>
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-600 border-2 border-white rounded-full transform -translate-x-1.5 -translate-y-1.5"></div>
          <div className="absolute top-[22%] left-[45%] w-4 h-4 bg-amber-500 border-2 border-white rounded-full transform -translate-x-2 -translate-y-2 animate-bounce shadow-lg flex items-center justify-center">
            <Bus className="w-2 h-2 text-white" />
          </div>
          <div className="absolute bottom-[35%] right-1/4 w-3 h-3 bg-green-500 border-2 border-white rounded-full transform translate-x-1.5 translate-y-1.5"></div>
        </div>

        {/* Transport Info */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-700/50">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3">Route Details</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Route No.</span>
                <span className="text-sm font-bold text-blue-700 dark:text-amber-400">R-14 (North Zone)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Est. Arrival Time</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">03:45 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Stoppage</span>
                <span className="text-sm font-medium text-gray-600 dark:text-slate-300">Mallikashpur</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-slate-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Santosh Kumar</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">Driver</div>
              </div>
            </div>
            <button className="p-2.5 bg-blue-100 hover:bg-blue-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-blue-700 dark:text-amber-400 rounded-full transition-colors">
              <Phone className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
