import React, { useState, useEffect } from 'react';
import { 
  CreditCard, CalendarDays, FileText, MessageSquare, Bus, 
  Download, IndianRupee, MapPin, Phone, Send, CheckCircle2,
  Clock, XCircle, Users, Loader2
} from 'lucide-react';
import { toast } from 'sonner';

export function FeeManagementWidget() {
  const [dues, setDues] = useState<number>(() => {
    const saved = localStorage.getItem('feeDues');
    return saved !== null ? parseInt(saved, 10) : 12500;
  });

  const [lateFine, setLateFine] = useState<number>(() => {
    const saved = localStorage.getItem('feeLateFine');
    return saved !== null ? parseInt(saved, 10) : 250;
  });

  const [receipts, setReceipts] = useState<Array<{ term: string; date: string }>>(() => {
    const saved = localStorage.getItem('feeReceipts');
    return saved !== null ? JSON.parse(saved) : [
      { term: 'Term 1 Tuition Fee', date: '10 Apr 2026' },
      { term: 'Annual Charges', date: '05 Apr 2026' }
    ];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [paymentStep, setPaymentStep] = useState<'select-method' | 'processing' | 'success'>('select-method');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('feeDues', dues.toString());
    localStorage.setItem('feeLateFine', lateFine.toString());
    localStorage.setItem('feeReceipts', JSON.stringify(receipts));
  }, [dues, lateFine, receipts]);

  const totalPayable = dues + lateFine;

  const handleStartPayment = () => {
    setPaymentStep('processing');
    setIsLoading(true);
    
    // Simulate transaction processing for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
      setPaymentStep('success');
    }, 2000);
  };

  const handleClosePayment = () => {
    if (paymentStep === 'success') {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }); // e.g. "29 Jun 2026"
      
      // Update receipts list and clear dues
      setReceipts(prev => [
        { term: 'Term 2 Tuition Fee', date: formattedDate },
        ...prev
      ]);
      setDues(0);
      setLateFine(0);
      toast.success('Payment Received!', {
        description: `Successfully processed transaction of ₹${totalPayable.toLocaleString('en-IN')}.`,
      });
    }
    setIsModalOpen(false);
    setPaymentStep('select-method');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <CreditCard className="w-6 h-6 text-blue-700 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Fee Management</h2>
      </div>
      
      <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
        {dues > 0 ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-slate-400">Current Dues</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                <IndianRupee className="w-4 h-4 mr-0.5" /> {dues.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center text-red-600 dark:text-red-400 text-sm">
              <span>Late Fines</span>
              <span className="flex items-center"><IndianRupee className="w-3.5 h-3.5 mr-0.5" /> {lateFine.toLocaleString('en-IN')}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-gray-900 dark:text-white">Total Payable</span>
                <span className="text-lg text-blue-700 dark:text-amber-400 flex items-center">
                  <IndianRupee className="w-4 h-4 mr-0.5" /> {totalPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-2" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">No Outstanding Dues</span>
            <span className="text-xs text-gray-500 dark:text-slate-400 mt-1">Thank you! Your payments are up to date.</span>
          </div>
        )}
      </div>

      {dues > 0 ? (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-amber-500 hover:bg-amber-600 text-[#161616] font-semibold py-2.5 rounded-lg shadow-sm transition-colors mb-4 cursor-pointer"
        >
          Pay Now
        </button>
      ) : (
        <div className="w-full bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-400 font-semibold py-2.5 rounded-lg text-center border border-green-200 dark:border-green-900/50 mb-4 text-sm">
          Account Clear
        </div>
      )}
      <div className="text-xs text-center text-gray-500 dark:text-slate-500 mb-6">
        Accepts UPI, Credit/Debit Cards, Net Banking
      </div>

      <div className="mt-auto">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Recent Receipts</h3>
        <div className="space-y-2">
          {receipts.map((receipt, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-gray-100 dark:border-slate-700/50 animate-in fade-in duration-300">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{receipt.term}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">{receipt.date}</div>
              </div>
              <button 
                onClick={() => toast.success(`Downloading PDF for ${receipt.term}...`)}
                className="p-2 text-blue-600 dark:text-amber-400 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-full transition-colors cursor-pointer" 
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#00000080] backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-blue-900 dark:bg-slate-800 p-5 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">School Fee Checkout</h3>
              {paymentStep !== 'processing' && (
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/85 hover:text-white text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {paymentStep === 'select-method' && (
                <div className="space-y-6">
                  {/* Summary card */}
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-gray-100 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-slate-400">Total Due Amount</p>
                      <p className="text-sm font-semibold text-gray-750 dark:text-slate-300">Term 2 School Tuition Fees</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-extrabold text-blue-900 dark:text-amber-400 flex items-center justify-end">
                        <IndianRupee className="w-4 h-4 mr-0.5" /> {totalPayable.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Payment option selectors */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 font-semibold">
                      Select Payment Method
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'upi', name: 'UPI (Paytm, Google Pay, PhonePe)', desc: 'Zero convenience fee' },
                        { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, MasterCard, RuPay' },
                        { id: 'netbanking', name: 'Net Banking', desc: 'All major Indian banks supported' }
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id as any)}
                          className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                            paymentMethod === method.id 
                              ? 'border-amber-500 bg-amber-500/5 dark:bg-amber-400/5 dark:border-amber-400 ring-2 ring-amber-500/20' 
                              : 'border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            paymentMethod === method.id 
                              ? 'border-amber-500 dark:border-amber-400 bg-amber-500 dark:bg-amber-400' 
                              : 'border-gray-300 dark:border-slate-700'
                          }`}>
                            {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-[#161616] dark:bg-slate-900 rounded-full"></div>}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{method.name}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{method.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleStartPayment}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-[#161616] font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Pay ₹{totalPayable.toLocaleString('en-IN')} Securely
                  </button>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Connecting to Gateway</h4>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Please do not close or refresh this browser tab...</p>
                  </div>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 bg-green-150 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Payment Successful!</h4>
                    <p className="text-sm text-green-600 dark:text-green-400 font-semibold mt-1">Transaction Ref: TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-3 px-4">
                      A confirmation SMS has been sent to your registered mobile number. Your receipt is now available to download.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl w-full border border-gray-100 dark:border-slate-700 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Paid To</span>
                      <span className="font-medium text-gray-900 dark:text-white">Modern Public School</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount</span>
                      <span className="font-bold text-blue-900 dark:text-amber-400">₹{totalPayable.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Method</span>
                      <span className="font-medium uppercase text-gray-900 dark:text-white">{paymentMethod}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleClosePayment}
                    className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer border border-transparent dark:border-slate-700"
                  >
                    Close & View Receipt
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
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
  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  
  const [leaveHistory, setLeaveHistory] = useState<Array<{
    id: string;
    type: string;
    fromDate: string;
    toDate: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }>>(() => {
    const saved = localStorage.getItem('leaveHistory');
    return saved !== null ? JSON.parse(saved) : [
      { id: '1', type: 'Sick Leave', fromDate: '12 Jun 2026', toDate: '13 Jun 2026', reason: 'Fever and cold', status: 'Approved' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('leaveHistory', JSON.stringify(leaveHistory));
  }, [leaveHistory]);

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate || !reason.trim()) {
      toast.error('Missing fields', {
        description: 'Please fill in all the details for the leave application.',
      });
      return;
    }

    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    };

    const newRequest = {
      id: Date.now().toString(),
      type: leaveType,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      reason: reason.trim(),
      status: 'Pending' as const
    };

    setLeaveHistory(prev => [newRequest, ...prev]);
    setFromDate('');
    setToDate('');
    setReason('');
    
    toast.success('Application Submitted!', {
      description: 'Your leave request has been sent to the class teacher.',
    });
  };

  const handleCancelLeave = (id: string) => {
    setLeaveHistory(prev => prev.filter(req => req.id !== id));
    toast.success('Application Retracted', {
      description: 'Your leave request has been cancelled.',
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
          <FileText className="w-6 h-6 text-amber-700 dark:text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Leave Application</h2>
      </div>

      <form className="space-y-4 mb-2" onSubmit={handleSubmitLeave}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Leave Type</label>
          <select 
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outline-none transition-colors"
          >
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Emergency</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">From Date</label>
            <input 
              type="date" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outline-none transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">To Date</label>
            <input 
              type="date" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outline-none transition-colors" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Reason</label>
          <textarea 
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 outline-none transition-colors resize-none"
            placeholder="Briefly describe the reason for leave..."
          ></textarea>
        </div>

        <button 
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-blue-900 hover:bg-blue-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold py-2 rounded-lg transition-colors border border-transparent dark:border-slate-700 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          Submit to Class Teacher
        </button>
      </form>

      <div className="mt-4 border-t border-gray-150 dark:border-slate-800 pt-4 flex-grow flex flex-col min-h-[160px]">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3">Recent Applications</h3>
        <div className="space-y-3 flex-grow overflow-y-auto max-h-[180px] pr-1">
          {leaveHistory.length === 0 ? (
            <p className="text-xs text-center text-gray-500 dark:text-slate-500 py-6">No recent leave applications.</p>
          ) : (
            leaveHistory.map((req) => (
              <div key={req.id} className="p-3 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-850 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-0.5 rounded-md">
                    {req.type}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    req.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400' :
                    req.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400'
                  }`}>
                    {req.status}
                  </span>
                </div>
                
                <div className="text-xs text-gray-600 dark:text-slate-400 font-medium">
                  Date: {req.fromDate} to {req.toDate}
                </div>
                <div className="text-xs text-gray-700 dark:text-slate-350 italic bg-white dark:bg-slate-900/40 p-1.5 rounded border border-gray-100/50 dark:border-slate-800">
                  "{req.reason}"
                </div>
                
                {req.status === 'Pending' && (
                  <button
                    onClick={() => handleCancelLeave(req.id)}
                    className="text-[10px] font-bold text-red-650 dark:text-red-400 hover:underline text-left mt-1 cursor-pointer w-fit"
                  >
                    Retract Request
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function CommunicationHubWidget() {
  const [activeTab, setActiveTab] = useState<'messages' | 'ptm'>('messages');
  const [isPtmModalOpen, setIsPtmModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Messages list state
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: string;
    time: string;
    body: string;
    initial: string;
    isSelf?: boolean;
  }>>(() => {
    const saved = localStorage.getItem('communicationMessages');
    return saved !== null ? JSON.parse(saved) : [
      { id: 'msg-1', sender: 'Mr. Rajesh (Maths)', time: '2h ago', body: 'Please ensure your ward completes the assignment on Trigonometry by tomorrow.', initial: 'MR' }
    ];
  });

  // PTM requests state
  const [ptmRequests, setPtmRequests] = useState<Array<{
    id: string;
    teacher: string;
    date: string;
    slot: string;
    agenda: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }>>(() => {
    const saved = localStorage.getItem('ptmRequests');
    return saved !== null ? JSON.parse(saved) : [
      { id: 'ptm-1', teacher: 'Mrs. Sneha (Science)', date: '30 Jun 2026', slot: '11:00 AM - 11:30 AM', agenda: 'Discuss term exam score', status: 'Pending' }
    ];
  });

  // Form states
  const [ptmTeacher, setPtmTeacher] = useState('Mr. Rajesh (Maths)');
  const [ptmDate, setPtmDate] = useState('');
  const [ptmSlot, setPtmSlot] = useState('10:00 AM - 10:30 AM');
  const [ptmAgenda, setPtmAgenda] = useState('');

  const [msgTeacher, setMsgTeacher] = useState('Mr. Rajesh (Maths)');
  const [msgText, setMsgText] = useState('');

  useEffect(() => {
    localStorage.setItem('communicationMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('ptmRequests', JSON.stringify(ptmRequests));
  }, [ptmRequests]);

  const handleSendTeacherMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) {
      toast.error('Empty message', {
        description: 'Please write a message before sending.',
      });
      return;
    }

    const newMsg = {
      id: Date.now().toString(),
      sender: `You (To: ${msgTeacher})`,
      time: 'Just now',
      body: msgText.trim(),
      initial: 'YO',
      isSelf: true
    };

    setMessages(prev => [newMsg, ...prev]);
    setMsgText('');
    setIsMessageModalOpen(false);
    setActiveTab('messages');
    toast.success('Message Sent!', {
      description: `Your message has been delivered to ${msgTeacher}.`,
    });
  };

  const handleBookPtm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ptmDate || !ptmAgenda.trim()) {
      toast.error('Missing fields', {
        description: 'Please select a date and specify the meeting agenda.',
      });
      return;
    }

    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    };

    const newPtm = {
      id: Date.now().toString(),
      teacher: ptmTeacher,
      date: formatDate(ptmDate),
      slot: ptmSlot,
      agenda: ptmAgenda.trim(),
      status: 'Pending' as const
    };

    setPtmRequests(prev => [newPtm, ...prev]);
    setPtmDate('');
    setPtmAgenda('');
    setIsPtmModalOpen(false);
    setActiveTab('ptm');
    toast.success('PTM Requested!', {
      description: `Meeting request sent to ${ptmTeacher} for approval.`,
    });
  };

  const handleCancelPtm = (id: string) => {
    setPtmRequests(prev => prev.filter(req => req.id !== id));
    toast.success('PTM Request Retracted', {
      description: 'Your meeting request has been cancelled.',
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 p-6 flex flex-col transition-colors lg:col-span-2 xl:col-span-1">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <MessageSquare className="w-6 h-6 text-purple-700 dark:text-purple-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Communication Hub</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button 
          onClick={() => setIsPtmModalOpen(true)}
          className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-purple-50 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700/50 transition-colors group cursor-pointer"
        >
          <Users className="w-6 h-6 text-gray-400 group-hover:text-purple-600 dark:text-slate-400 dark:group-hover:text-purple-400 mb-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Request PTM</span>
        </button>
        <button 
          onClick={() => setIsMessageModalOpen(true)}
          className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700/50 transition-colors group cursor-pointer"
        >
          <MessageSquare className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400 mb-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Message Teachers</span>
        </button>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-gray-100 dark:border-slate-805 mb-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('messages')}
          className={`pb-2.5 px-4 relative cursor-pointer ${
            activeTab === 'messages' 
              ? 'text-purple-650 dark:text-purple-450 border-b-2 border-purple-500' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-slate-350'
          }`}
        >
          Recent Messages
        </button>
        <button
          onClick={() => setActiveTab('ptm')}
          className={`pb-2.5 px-4 relative cursor-pointer ${
            activeTab === 'ptm' 
              ? 'text-purple-650 dark:text-purple-450 border-b-2 border-purple-500' 
              : 'text-gray-500 hover:text-gray-700 dark:hover:text-slate-350'
          }`}
        >
          PTM Requests
        </button>
      </div>

      {/* Tab Content View */}
      <div className="flex-grow overflow-y-auto max-h-[260px] min-h-[180px] pr-1">
        {activeTab === 'messages' ? (
          <div className="space-y-3">
            {messages.length === 0 ? (
              <p className="text-xs text-center text-gray-500 dark:text-slate-500 py-8">No recent messages.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="flex gap-3 items-start p-3 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800/60 animate-in fade-in duration-300">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    msg.isSelf 
                      ? 'bg-purple-105 dark:bg-purple-950 text-purple-700 dark:text-purple-450' 
                      : 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-450'
                  }`}>
                    {msg.initial}
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white truncate pr-1">{msg.sender}</span>
                      <span className="text-[10px] text-gray-400 shrink-0 font-medium">{msg.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-400 italic">
                      "{msg.body}"
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {ptmRequests.length === 0 ? (
              <p className="text-xs text-center text-gray-500 dark:text-slate-500 py-8">No booked PTM requests.</p>
            ) : (
              ptmRequests.map((req) => (
                <div key={req.id} className="p-3 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800/60 flex flex-col gap-1.5 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white truncate pr-2">
                      {req.teacher}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      req.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400' :
                      req.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-450'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-slate-400 font-medium">
                    Meeting: {req.date} at {req.slot}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-slate-350 italic bg-white dark:bg-slate-900/40 p-1.5 rounded border border-gray-100 dark:border-slate-850">
                    Agenda: "{req.agenda}"
                  </div>
                  {req.status === 'Pending' && (
                    <button
                      onClick={() => handleCancelPtm(req.id)}
                      className="text-[10px] font-bold text-red-600 dark:text-red-400 hover:underline text-left mt-1 cursor-pointer w-fit"
                    >
                      Cancel Meeting Request
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Message Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-[#00000080] backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-purple-900 p-5 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">Send Message to Teacher</h3>
              <button 
                onClick={() => setIsMessageModalOpen(false)}
                className="text-white/80 hover:text-white text-sm font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSendTeacherMessage}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Select Teacher
                </label>
                <select 
                  value={msgTeacher}
                  onChange={(e) => setMsgTeacher(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-750 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option>Mr. Rajesh (Maths)</option>
                  <option>Mrs. Sneha (Science)</option>
                  <option>Mr. Alok (English)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <textarea 
                  rows={4}
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  placeholder="Type your message to the teacher..."
                  className="w-full rounded-lg border border-gray-350 dark:border-slate-750 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer border border-transparent"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PTM Request Modal */}
      {isPtmModalOpen && (
        <div className="fixed inset-0 bg-[#00000080] backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-purple-900 p-5 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg">Request Parent-Teacher Meeting</h3>
              <button 
                onClick={() => setIsPtmModalOpen(false)}
                className="text-white/80 hover:text-white text-sm font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleBookPtm}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Select Teacher
                </label>
                <select 
                  value={ptmTeacher}
                  onChange={(e) => setPtmTeacher(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-slate-750 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option>Mr. Rajesh (Maths)</option>
                  <option>Mrs. Sneha (Science)</option>
                  <option>Mr. Alok (English)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Select Date
                  </label>
                  <input 
                    type="date"
                    value={ptmDate}
                    onChange={(e) => setPtmDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-750 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    Select Time Slot
                  </label>
                  <select 
                    value={ptmSlot}
                    onChange={(e) => setPtmSlot(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-slate-750 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option>10:00 AM - 10:30 AM</option>
                    <option>11:30 AM - 12:00 PM</option>
                    <option>02:00 PM - 02:30 PM</option>
                    <option>03:30 PM - 04:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
                  Meeting Agenda
                </label>
                <textarea 
                  rows={3}
                  value={ptmAgenda}
                  onChange={(e) => setPtmAgenda(e.target.value)}
                  placeholder="Describe what you want to discuss with the teacher..."
                  className="w-full rounded-lg border border-gray-350 dark:border-slate-750 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer border border-transparent"
              >
                Send Meeting Request
              </button>
            </form>
          </div>
        </div>
      )}
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
