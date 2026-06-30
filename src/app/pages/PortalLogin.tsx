import React, { useState } from 'react';
import { User, Lock, Mail, Phone, ArrowRight, ShieldCheck, ArrowLeft, Key } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

type StudentLoginForm = {
  studentId: string;
  password: string;
};

type ParentLoginForm = {
  contact: string;
};

export function PortalLogin() {
  const [loginType, setLoginType] = useState<'student' | 'parent'>('student');
  const [loginStep, setLoginStep] = useState<'request-otp' | 'verify-otp'>('request-otp');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [parentContact, setParentContact] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');

  const {
    register: registerStudent,
    handleSubmit: handleStudentSubmit,
    formState: { errors: studentErrors },
  } = useForm<StudentLoginForm>();

  const {
    register: registerParent,
    handleSubmit: handleParentSubmit,
    formState: { errors: parentErrors },
  } = useForm<ParentLoginForm>();

  const onStudentLogin: SubmitHandler<StudentLoginForm> = (data) => {
    setIsLoading(true);
    console.log('Student Login:', data);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('studentId', data.studentId);
      toast.success('Successfully logged in as Student!');
      window.location.href = import.meta.env.BASE_URL + '#/student-dashboard';
    }, 1000);
  };

  const onParentLogin: SubmitHandler<ParentLoginForm> = (data) => {
    setIsLoading(true);
    console.log('Parent Login (OTP request):', data);
    
    // Generate a random 6-digit mock OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setGeneratedOtp(otp);
      setParentContact(data.contact);
      setLoginStep('verify-otp');
      setOtpInput('');
      setOtpError('');
      
      toast.success(`Mock OTP sent to ${data.contact}!`, {
        description: `Your verification code is: ${otp}`,
        duration: 10000,
      });
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput.trim()) {
      setOtpError('Please enter the OTP code');
      return;
    }

    setIsLoading(true);
    setOtpError('');

    // Simulate OTP verification API call
    setTimeout(() => {
      setIsLoading(false);
      if (otpInput.trim() === generatedOtp) {
        toast.success('OTP verified successfully!');
        // Save user role session
        localStorage.setItem('userRole', 'parent');
        localStorage.setItem('userContact', parentContact);
        // Redirect to parent dashboard
        window.location.href = import.meta.env.BASE_URL + '#/parent-dashboard';
      } else {
        setOtpError('Invalid OTP code. Please check and try again.');
        toast.error('Verification failed', {
          description: 'The OTP code you entered is incorrect.',
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-950 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
        
        {/* Header Section */}
        <div className="bg-blue-900 dark:bg-slate-800 p-6 text-center transition-colors">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-white/10 rounded-full">
              <ShieldCheck className="h-8 w-8 text-amber-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Secure Portal</h2>
          <p className="text-blue-200 dark:text-slate-400 text-sm mt-1">
            {loginStep === 'verify-otp' ? 'Enter the code sent to your device' : 'Access your personalized dashboard'}
          </p>
        </div>

        {/* Toggle Section - Only show when requesting OTP */}
        {loginStep === 'request-otp' && (
          <div className="flex p-1 bg-gray-100 dark:bg-slate-950 m-6 rounded-lg transition-colors">
            <button
              onClick={() => setLoginType('student')}
              className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all ${
                loginType === 'student'
                  ? 'bg-white dark:bg-slate-800 text-blue-900 dark:text-amber-400 shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
              }`}
            >
              Student Login
            </button>
            <button
              onClick={() => setLoginType('parent')}
              className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all ${
                loginType === 'parent'
                  ? 'bg-white dark:bg-slate-800 text-blue-900 dark:text-amber-400 shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300'
              }`}
            >
              Parent Login
            </button>
          </div>
        )}

        {/* Form Section */}
        <div className="px-6 pb-8 pt-4">
          {loginStep === 'verify-otp' ? (
            /* Parent Verify OTP View */
            <form className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300" onSubmit={handleVerifyOtp}>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Verification Code (OTP)
                  </label>
                  <button 
                    type="button" 
                    onClick={() => setLoginStep('request-otp')}
                    className="text-xs text-blue-600 dark:text-amber-500 hover:underline flex items-center gap-1 font-medium"
                  >
                    <ArrowLeft className="w-3 h-3" /> Change
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">
                  Sent to: <span className="font-semibold text-gray-700 dark:text-slate-300">{parentContact}</span>
                </p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="otp"
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-950 text-gray-900 dark:text-white tracking-widest text-lg font-bold placeholder:tracking-normal placeholder:font-normal focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 transition-colors"
                    placeholder="Enter 6-digit OTP"
                  />
                </div>
                {otpError && <p className="mt-1 text-xs text-red-500">{otpError}</p>}
                
                {/* Mock helper alert */}
                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-100 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-400">
                  <p className="font-semibold">Simulated SMS Verification:</p>
                  <p className="mt-1">Enter code: <span className="font-mono font-bold text-sm bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-amber-200 dark:border-amber-800 select-all">{generatedOtp}</span></p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-[#161616] bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-900 transition-colors disabled:opacity-70"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedOtp(newOtp);
                    toast.success('New OTP sent!', {
                      description: `Your new code is: ${newOtp}`,
                      duration: 10000,
                    });
                  }}
                  className="text-xs text-center text-blue-600 dark:text-amber-500 hover:underline py-1 font-medium"
                >
                  Resend Verification Code
                </button>
              </div>
            </form>
          ) : loginType === 'student' ? (
            /* Student Form */
            <form className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300" onSubmit={handleStudentSubmit(onStudentLogin)}>
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                  Student ID / Admission Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="studentId"
                    type="text"
                    {...registerStudent('studentId', { required: 'Student ID is required' })}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 transition-colors"
                    placeholder="e.g. MPS2023001"
                  />
                </div>
                {studentErrors.studentId && <p className="mt-1 text-xs text-red-500">{studentErrors.studentId.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    {...registerStudent('password', { required: 'Password is required' })}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                {studentErrors.password && <p className="mt-1 text-xs text-red-500">{studentErrors.password.message}</p>}
                <div className="mt-2 flex justify-end">
                  <button type="button" className="text-xs text-blue-600 dark:text-amber-500 hover:underline">
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-[#161616] bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-900 transition-colors disabled:opacity-70"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            </form>
          ) : (
            /* Parent Request OTP Form */
            <form className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300" onSubmit={handleParentSubmit(onParentLogin)}>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                  Registered Mobile Number or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="contact"
                    type="text"
                    {...registerParent('contact', { required: 'Contact info is required' })}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:focus:ring-amber-400 dark:focus:border-amber-400 transition-colors"
                    placeholder="Enter mobile or email"
                  />
                </div>
                {parentErrors.contact && <p className="mt-1 text-xs text-red-500">{parentErrors.contact.message}</p>}
                <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
                  An OTP will be sent to your registered contact for verification.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white dark:text-[#161616] bg-blue-900 hover:bg-blue-800 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 dark:focus:ring-amber-500 dark:focus:ring-offset-slate-900 transition-colors disabled:opacity-70"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
                {!isLoading && <Mail className="ml-2 h-4 w-4" />}
              </button>
            </form>
          )}
          
          <div className="mt-6 text-center text-xs text-gray-500 dark:text-slate-500">
            <p>Accounts are admin-generated.</p>
            <p>Contact the school office for access issues.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
