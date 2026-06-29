import React, { useState, useEffect } from 'react';
import { 
  FileText, CheckCircle2, ChevronRight, ChevronLeft, Calendar, 
  User, Phone, Mail, MapPin, Calculator, HelpCircle, ArrowRight, 
  Search, ShieldAlert, BadgeInfo, Building
} from 'lucide-react';
import { toast } from 'sonner';

export function Admission() {
  const currentYear = new Date().getFullYear();
  const nextYearShort = (currentYear + 1).toString().slice(-2);
  const academicYear = `${currentYear}-${nextYearShort}`;

  const [activeTab, setActiveTab] = useState<'guidelines' | 'apply' | 'fees' | 'track'>('guidelines');

  // Handle URL Hash Navigation on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#apply') setActiveTab('apply');
    else if (hash === '#fees') setActiveTab('fees');
    else if (hash === '#track') setActiveTab('track');
    else if (hash === '#guidelines') setActiveTab('guidelines');
  }, []);

  // Guidelines Tab - Age Eligibility Calculator State
  const [calcGrade, setCalcGrade] = useState('Class 1');
  const [calcDob, setCalcDob] = useState('');
  const [eligibilityResult, setEligibilityResult] = useState<{
    eligible: boolean;
    message: string;
  } | null>(null);

  // Online Application Wizard State
  const [formStep, setFormStep] = useState(1);
  const [studentName, setStudentName] = useState('');
  const [studentDob, setStudentDob] = useState('');
  const [studentGender, setStudentGender] = useState('Male');
  const [appliedGrade, setAppliedGrade] = useState('Class 1');
  const [lastSchool, setLastSchool] = useState('');
  
  const [parentName, setParentName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [address, setAddress] = useState('');

  const [hasBirthCert, setHasBirthCert] = useState(false);
  const [hasReportCard, setHasReportCard] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);

  const [birthCertName, setBirthCertName] = useState('');
  const [reportCardName, setReportCardName] = useState('');
  const [photoName, setPhotoName] = useState('');

  const [generatedAppId, setGeneratedAppId] = useState('');

  // Tracker State
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedApplication, setTrackedApplication] = useState<{
    appId: string;
    studentName: string;
    grade: string;
    date: string;
    status: 'Submitted' | 'Verified' | 'Interview' | 'Approved';
    interviewTime?: string;
  } | null>(null);

  // Fees Calculator State
  const [feeGrade, setFeeGrade] = useState('Class 1');
  const [useTransport, setUseTransport] = useState(false);

  // Local storage for saving applications
  const [savedApplications, setSavedApplications] = useState<any[]>(() => {
    const saved = localStorage.getItem('admissionApplications');
    return saved !== null ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('admissionApplications', JSON.stringify(savedApplications));
  }, [savedApplications]);

  // Age limits dictionary (standard age limits as of June 1, 2026)
  const classAgeRules: Record<string, number> = {
    'Nursery': 3,
    'LKG': 4,
    'UKG': 5,
    'Class 1': 6,
    'Class 2': 7,
    'Class 3': 8,
    'Class 4': 9,
    'Class 5': 10,
    'Class 6': 11,
    'Class 7': 12,
    'Class 8': 13,
    'Class 9': 14,
    'Class 10': 15,
    'Class 11': 16,
    'Class 12': 17
  };

  const handleCheckAge = () => {
    if (!calcDob) {
      toast.error('Date of Birth Required', { description: 'Please enter the student\'s birthdate.' });
      return;
    }

    const birthDate = new Date(calcDob);
    const targetDate = new Date(`${currentYear}-06-01`);
    let age = targetDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = targetDate.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && targetDate.getDate() < birthDate.getDate())) {
      age--;
    }

    const minAge = classAgeRules[calcGrade] || 3;

    if (age >= minAge && age < minAge + 2) {
      setEligibilityResult({
        eligible: true,
        message: `Eligible! The student is ${age} years old, which fits the required age bracket (minimum ${minAge} years) for admission to ${calcGrade} in the ${academicYear} session.`
      });
    } else if (age < minAge) {
      setEligibilityResult({
        eligible: false,
        message: `Underage: The student is only ${age} years old. A minimum age of ${minAge} years is required for ${calcGrade} as of June 1, ${currentYear}.`
      });
    } else {
      setEligibilityResult({
        eligible: true,
        message: `Overage (Approved): The student is ${age} years old. While older than average for ${calcGrade} (ideal age: ${minAge}), they are eligible subject to previous report card validation.`
      });
    }
  };

  const handleNextStep = () => {
    if (formStep === 1) {
      if (!studentName.trim() || !studentDob || !lastSchool.trim()) {
        toast.error('Incomplete profile', { description: 'Please fill in all student details.' });
        return;
      }
    } else if (formStep === 2) {
      if (!parentName.trim() || !parentPhone.trim() || !parentEmail.trim() || !address.trim()) {
        toast.error('Incomplete contacts', { description: 'Please fill in parent/guardian contact details.' });
        return;
      }
    }
    setFormStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasBirthCert || !hasPhoto) {
      toast.error('Document Upload Missing', {
        description: 'You must check and confirm the upload of Birth Certificate and Photo.'
      });
      return;
    }

    const appId = `MPS-ADM-${Date.now().toString().slice(-4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newApp = {
      appId,
      studentName,
      grade: appliedGrade,
      parentPhone,
      date: today,
      status: 'Submitted' as const
    };

    setSavedApplications(prev => [newApp, ...prev]);
    setGeneratedAppId(appId);
    setFormStep(4);
    
    // Clear forms
    setStudentName('');
    setStudentDob('');
    setLastSchool('');
    setParentName('');
    setMotherName('');
    setParentPhone('');
    setParentEmail('');
    setAddress('');
    setHasBirthCert(false);
    setHasReportCard(false);
    setHasPhoto(false);
    setBirthCertName('');
    setReportCardName('');
    setPhotoName('');

    toast.success('Application Received!', {
      description: `Your application code is ${appId}. Keep this ID to track your status.`
    });
  };

  const handleTrackQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) {
      toast.error('Query Required', { description: 'Please input an Application ID or Phone Number.' });
      return;
    }

    // Try finding in local storage first
    const found = savedApplications.find(
      app => app.appId.toLowerCase() === trackQuery.trim().toLowerCase() || app.parentPhone === trackQuery.trim()
    );

    if (found) {
      setTrackedApplication(found);
      toast.success('Application Found!');
    } else {
      // Demo fallbacks for user testing convenience
      if (trackQuery.trim().toUpperCase() === 'MPS-DEMO-101' || trackQuery.trim() === '9876543210') {
        setTrackedApplication({
          appId: 'MPS-DEMO-101',
          studentName: 'Aarav Sharma',
          grade: 'Class 5',
          date: `28 Jun ${currentYear}`,
          status: 'Interview',
          interviewTime: `05th July ${currentYear} at 10:30 AM`
        });
        toast.success('Loaded Demo Application Status');
      } else {
        setTrackedApplication(null);
        toast.error('Not Found', {
          description: 'No active application found matching that ID or Mobile number. Try "MPS-DEMO-101" to test.'
        });
      }
    }
  };

  // Grade Fee configuration details
  const getFeeDetails = (grade: string) => {
    let tuition = 1200;
    let admission = 4500;
    let exam = 1000;
    
    if (grade.includes('Nursery') || grade.includes('KG')) {
      tuition = 1200;
      admission = 4500;
      exam = 800;
    } else if (parseInt(grade.replace('Class ', ''), 10) <= 5) {
      tuition = 1600;
      admission = 5000;
      exam = 1000;
    } else if (parseInt(grade.replace('Class ', ''), 10) <= 8) {
      tuition = 2000;
      admission = 6000;
      exam = 1200;
    } else {
      tuition = 2600;
      admission = 7500;
      exam = 1800;
    }

    const transportFee = useTransport ? 1200 : 0;
    const total = tuition + admission + exam + transportFee;

    return { tuition, admission, exam, transportFee, total };
  };

  const fees = getFeeDetails(feeGrade);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 dark:text-white tracking-tight">MPS Admissions {academicYear}</h1>
          <p className="text-gray-650 dark:text-slate-400 mt-3 text-lg max-w-2xl mx-auto">
            Welcome to the admissions portal of Modern Public School, Balasore. Enroll your child today for academic excellence.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center border-b border-gray-205 dark:border-slate-800 gap-2 mb-10 text-sm font-semibold">
          {[
            { id: 'guidelines', label: 'Guidelines & Criteria' },
            { id: 'apply', label: 'Online Application' },
            { id: 'fees', label: 'Fee Structure' },
            { id: 'track', label: 'Track Status' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-6 relative transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'text-blue-900 dark:text-amber-400 border-b-2 border-blue-900 dark:border-amber-400 font-bold scale-102'
                  : 'text-gray-550 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 shadow-sm transition-colors">
          
          {/* 1. Guidelines & Eligibility Tab */}
          {activeTab === 'guidelines' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Age Criteria Info */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                      <Building className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                      Class Age Criteria
                    </h2>
                    <p className="text-gray-650 dark:text-slate-400 text-sm mt-2">
                      CBSE guidelines stipulate specific minimum ages (completed as of June 1 of the admission year):
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/40 border border-gray-150 dark:border-slate-800 rounded-xl overflow-hidden text-sm">
                    <div className="grid grid-cols-2 p-3.5 bg-gray-100 dark:bg-slate-800 font-bold text-gray-700 dark:text-slate-350">
                      <span>Grade Applied</span>
                      <span>Min Age Required</span>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-slate-800/50">
                      {[
                        { grade: 'Nursery', age: '3 Years' },
                        { grade: 'LKG', age: '4 Years' },
                        { grade: 'Class 1', age: '6 Years' },
                        { grade: 'Class 5', age: '10 Years' },
                        { grade: 'Class 9', age: '14 Years' }
                      ].map((rule, idx) => (
                        <div key={idx} className="grid grid-cols-2 p-3 text-gray-650 dark:text-slate-400">
                          <span>{rule.grade}</span>
                          <span>{rule.age}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Age Calculator Tool */}
                <div className="p-6 bg-blue-50/40 dark:bg-slate-800/30 rounded-2xl border border-blue-100/50 dark:border-slate-800 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 dark:text-amber-400 flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Eligibility Calculator
                    </h3>
                    <p className="text-xs text-gray-550 dark:text-slate-400 mt-1">
                      Check if your child meets the age rules for the desired class.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-350 mb-1">Select Target Grade</label>
                      <select 
                        value={calcGrade}
                        onChange={(e) => setCalcGrade(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-gray-305 dark:border-slate-705 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white"
                      >
                        {Object.keys(classAgeRules).map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-350 mb-1">Student Date of Birth</label>
                      <input 
                        type="date"
                        value={calcDob}
                        onChange={(e) => setCalcDob(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-gray-305 dark:border-slate-705 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white"
                      />
                    </div>
                    <button 
                      onClick={handleCheckAge}
                      className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-slate-850 dark:hover:bg-slate-700 text-white font-bold py-2 rounded-lg text-sm transition-colors cursor-pointer"
                    >
                      Check Eligibility
                    </button>
                    
                    {eligibilityResult && (
                      <div className={`p-4 rounded-xl border flex items-start gap-2.5 text-xs animate-in slide-in-from-top-3 duration-250 ${
                        eligibilityResult.eligible 
                          ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-900/50 dark:text-green-400' 
                          : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400'
                      }`}>
                        {eligibilityResult.eligible ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />}
                        <div>
                          <p className="font-bold">{eligibilityResult.eligible ? 'Age Requirement Met' : 'Age Criteria Warning'}</p>
                          <p className="mt-1 leading-relaxed">{eligibilityResult.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Admission Guidelines Info */}
              <div className="border-t border-gray-150 dark:border-slate-800 pt-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Required Documents for Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-650 dark:text-slate-400">
                  {[
                    'Self-attested copy of Birth Certificate (issued by Municipal Corporation/Panchayat)',
                    'Original Transfer Certificate (TC) from CBSE/State board recognized school (if applicable)',
                    'Report card / Marksheet of the qualifying class of previous school',
                    'Passport size photographs of the student (4 copies) and parents (2 copies)',
                    'Photocopy of student Aadhaar card',
                    'Caste certificate issued by competent authority (SC/ST/OBC) if applicable'
                  ].map((doc, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">{idx + 1}</span>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Online Application Wizard Tab */}
          {activeTab === 'apply' && (
            <div className="animate-in fade-in duration-300">
              
              {/* Progress Tracker Header */}
              {formStep <= 3 && (
                <div className="flex items-center justify-center max-w-lg mx-auto mb-10 gap-2 text-xs font-bold text-gray-550 dark:text-slate-400">
                  <div className={`flex flex-col items-center gap-1.5 ${formStep >= 1 ? 'text-blue-900 dark:text-amber-400 font-extrabold' : ''}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${formStep >= 1 ? 'border-blue-900 dark:border-amber-400 bg-blue-900 dark:bg-slate-850 text-white dark:text-amber-400' : 'border-gray-300'}`}>1</span>
                    <span>Student Profile</span>
                  </div>
                  <div className="w-12 h-0.5 bg-gray-250 dark:bg-slate-805"></div>
                  <div className={`flex flex-col items-center gap-1.5 ${formStep >= 2 ? 'text-blue-900 dark:text-amber-400 font-extrabold' : ''}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${formStep >= 2 ? 'border-blue-900 dark:border-amber-400 bg-blue-900 dark:bg-slate-850 text-white dark:text-amber-400' : 'border-gray-300'}`}>2</span>
                    <span>Parent Contacts</span>
                  </div>
                  <div className="w-12 h-0.5 bg-gray-250 dark:bg-slate-805"></div>
                  <div className={`flex flex-col items-center gap-1.5 ${formStep >= 3 ? 'text-blue-900 dark:text-amber-400 font-extrabold' : ''}`}>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center border-2 ${formStep >= 3 ? 'border-blue-900 dark:border-amber-400 bg-blue-900 dark:bg-slate-850 text-white dark:text-amber-400' : 'border-gray-300'}`}>3</span>
                    <span>Upload & Tick</span>
                  </div>
                </div>
              )}

              {/* Step Forms */}
              <form onSubmit={handleSubmitApplication} className="max-w-2xl mx-auto space-y-6">
                
                {/* Step 1: Student Information */}
                {formStep === 1 && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Student Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-350 mb-1">Student Full Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Priyanshu Mohanty"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-350 mb-1">Grade Applied For</label>
                        <select 
                          value={appliedGrade}
                          onChange={(e) => setAppliedGrade(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                        >
                          {Object.keys(classAgeRules).map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1">Date of Birth</label>
                        <input 
                          type="date"
                          value={studentDob}
                          onChange={(e) => setStudentDob(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1">Gender</label>
                        <select 
                          value={studentGender}
                          onChange={(e) => setStudentGender(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1">Previous School Attended</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Public School Balasore"
                        value={lastSchool}
                        onChange={(e) => setLastSchool(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                      />
                    </div>

                    <button 
                      type="button" 
                      onClick={handleNextStep}
                      className="w-full mt-6 bg-blue-900 hover:bg-blue-800 dark:bg-slate-850 dark:hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      Next Step <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Step 2: Parent / Guardian Info */}
                {formStep === 2 && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Parent / Guardian Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1">Father's / Guardian Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Father's Name"
                          value={parentName}
                          onChange={(e) => setParentName(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1">Mother's Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Mother's Name"
                          value={motherName}
                          onChange={(e) => setMotherName(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1">Mobile Contact Phone</label>
                        <input 
                          type="tel" 
                          placeholder="10-digit number"
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-305 dark:border-slate-705 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="email@example.com"
                          value={parentEmail}
                          onChange={(e) => setParentEmail(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-305 dark:border-slate-705 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-355 mb-1">Residential Address</label>
                      <textarea 
                        rows={3}
                        placeholder="House No, Road Name, Area, Balasore, Odisha"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none resize-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <button 
                        type="button" 
                        onClick={handlePrevStep}
                        className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-750 dark:text-slate-200 font-bold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 border border-transparent dark:border-slate-700"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>
                      <button 
                        type="button" 
                        onClick={handleNextStep}
                        className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-slate-850 dark:hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        Next Step <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Document Checklist Confirmation */}
                {formStep === 3 && (
                  <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Documents Upload & Tick</h3>
                    
                    <p className="text-xs text-gray-550 dark:text-slate-400">
                      Please upload scanned copies of the required documents. Ticks will auto-enable on valid uploads:
                    </p>

                    <div className="space-y-4 bg-gray-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-gray-150 dark:border-slate-800">
                      
                      {/* Document 1: Birth Certificate */}
                      <div className="p-3.5 bg-white dark:bg-slate-900/60 rounded-xl border border-gray-150 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input 
                            type="checkbox"
                            checked={hasBirthCert}
                            readOnly
                            className="w-5 h-5 rounded border-gray-300 dark:border-slate-700 text-blue-900 focus:ring-blue-900 shrink-0 mt-0.5 accent-blue-900 pointer-events-none"
                          />
                          <div>
                            <span className="text-sm font-bold text-gray-800 dark:text-white">Birth Certificate copy (Required)</span>
                            <p className="text-xs text-gray-550 dark:text-slate-450 mt-0.5 font-medium">Municipal Corporation or Panchayat certificate</p>
                            {birthCertName && (
                              <p className="text-xs text-green-600 dark:text-green-450 font-bold mt-1.5 flex items-center gap-1">📄 {birthCertName}</p>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0">
                          <input 
                            type="file"
                            id="file-birthcert"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setBirthCertName(file.name);
                                setHasBirthCert(true);
                                toast.success('Birth Certificate uploaded successfully!');
                              }
                            }}
                          />
                          {hasBirthCert ? (
                            <button
                              type="button"
                              onClick={() => {
                                setBirthCertName('');
                                setHasBirthCert(false);
                              }}
                              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                            >
                              Remove file
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => document.getElementById('file-birthcert')?.click()}
                              className="text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-650 transition-colors cursor-pointer"
                            >
                              Choose File
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Document 2: Previous Report Card */}
                      <div className="p-3.5 bg-white dark:bg-slate-900/60 rounded-xl border border-gray-150 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input 
                            type="checkbox"
                            checked={hasReportCard}
                            readOnly
                            className="w-5 h-5 rounded border-gray-300 dark:border-slate-700 text-blue-900 focus:ring-blue-900 shrink-0 mt-0.5 accent-blue-900 pointer-events-none"
                          />
                          <div>
                            <span className="text-sm font-bold text-gray-800 dark:text-white">Qualifying Class Marksheet (Optional)</span>
                            <p className="text-xs text-gray-550 dark:text-slate-455 mt-0.5 font-medium">Report card or transcript of previous class</p>
                            {reportCardName && (
                              <p className="text-xs text-green-600 dark:text-green-455 font-bold mt-1.5 flex items-center gap-1">📄 {reportCardName}</p>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0">
                          <input 
                            type="file"
                            id="file-reportcard"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setReportCardName(file.name);
                                setHasReportCard(true);
                                toast.success('Report Card uploaded successfully!');
                              }
                            }}
                          />
                          {hasReportCard ? (
                            <button
                              type="button"
                              onClick={() => {
                                setReportCardName('');
                                setHasReportCard(false);
                              }}
                              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                            >
                              Remove file
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => document.getElementById('file-reportcard')?.click()}
                              className="text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-650 transition-colors cursor-pointer"
                            >
                              Choose File
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Document 3: Passport Photo */}
                      <div className="p-3.5 bg-white dark:bg-slate-900/60 rounded-xl border border-gray-150 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <input 
                            type="checkbox"
                            checked={hasPhoto}
                            readOnly
                            className="w-5 h-5 rounded border-gray-300 dark:border-slate-700 text-blue-900 focus:ring-blue-900 shrink-0 mt-0.5 accent-blue-900 pointer-events-none"
                          />
                          <div>
                            <span className="text-sm font-bold text-gray-800 dark:text-white">Passport Size Photo of Student (Required)</span>
                            <p className="text-xs text-gray-555 dark:text-slate-450 mt-0.5 font-medium">Recent color photograph for school records</p>
                            {photoName && (
                              <p className="text-xs text-green-600 dark:text-green-455 font-bold mt-1.5 flex items-center gap-1">📄 {photoName}</p>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0">
                          <input 
                            type="file"
                            id="file-photo"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setPhotoName(file.name);
                                setHasPhoto(true);
                                toast.success('Passport photo uploaded successfully!');
                              }
                            }}
                          />
                          {hasPhoto ? (
                            <button
                              type="button"
                              onClick={() => {
                                setPhotoName('');
                                setHasPhoto(false);
                              }}
                              className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                            >
                              Remove file
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => document.getElementById('file-photo')?.click()}
                              className="text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-650 transition-colors cursor-pointer"
                            >
                              Choose File
                            </button>
                          )}
                        </div>
                      </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <button 
                        type="button" 
                        onClick={handlePrevStep}
                        className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-755 dark:text-slate-200 font-bold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 border border-transparent dark:border-slate-700"
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>
                      <button 
                        type="submit" 
                        className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-slate-850 dark:hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        Submit Application
                      </button>
                    </div>
                  </div>
                )}


                {/* Step 4: Submission Confirmation */}
                {formStep === 4 && (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-150 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Application Submitted!</h4>
                      <p className="text-sm text-green-650 dark:text-green-455 font-semibold mt-1">Application ID: {generatedAppId}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-4 px-6 leading-relaxed max-w-md mx-auto">
                        Thank you for applying to Modern Public School. We have saved your application. You can use the ID above to track the validation and interview scheduling status.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        type="button" 
                        onClick={() => { setFormStep(1); setActiveTab('guidelines'); }}
                        className="bg-gray-205 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200 font-bold py-2 px-6 rounded-lg text-sm transition-colors cursor-pointer border border-transparent dark:border-slate-700"
                      >
                        Go to Guidelines
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { setTrackQuery(generatedAppId); setFormStep(1); setActiveTab('track'); }}
                        className="bg-blue-900 hover:bg-blue-800 dark:bg-slate-850 dark:hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        Track Status <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* 3. Fee Structure Calculator Tab */}
          {activeTab === 'fees' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Calculator parameters */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                      <Calculator className="w-6 h-6 text-blue-900 dark:text-amber-400" />
                      Fee Structure Calculator
                    </h2>
                    <p className="text-gray-650 dark:text-slate-400 text-sm mt-2">
                      Estimate the session dues based on class and transport preferences. All fees are in Indian Rupees (INR).
                    </p>
                  </div>
                  <div className="space-y-4 p-5 bg-gray-50 dark:bg-slate-805 border border-gray-150 dark:border-slate-800 rounded-2xl">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-slate-350 mb-1">Select Grade / Class</label>
                      <select 
                        value={feeGrade}
                        onChange={(e) => setFeeGrade(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg py-2 px-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                      >
                        {Object.keys(classAgeRules).map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    
                    <label className="flex items-center gap-3 cursor-pointer p-2 bg-white dark:bg-slate-900/50 rounded-lg border border-gray-250 dark:border-slate-800">
                      <input 
                        type="checkbox"
                        checked={useTransport}
                        onChange={(e) => setUseTransport(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-900 focus:ring-blue-900 accent-blue-900"
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">Opt for School Bus Transport</span>
                        <p className="text-[10px] text-gray-550 dark:text-slate-450">Estimated charge: ₹1,200 per month</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="p-6 bg-blue-50/40 dark:bg-slate-800/30 rounded-2xl border border-blue-100/50 dark:border-slate-800 space-y-6">
                  <h3 className="text-lg font-bold text-blue-900 dark:text-amber-400">Dues Breakdown ({feeGrade})</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-650 dark:text-slate-400">
                      <span>Admission Charges (One-time)</span>
                      <span className="font-semibold">₹{fees.admission.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-gray-650 dark:text-slate-400">
                      <span>Tuition Fee (Monthly)</span>
                      <span className="font-semibold">₹{fees.tuition.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-gray-650 dark:text-slate-400">
                      <span>Examination Charges (Annual)</span>
                      <span className="font-semibold">₹{fees.exam.toLocaleString('en-IN')}</span>
                    </div>
                    {useTransport && (
                      <div className="flex justify-between text-gray-650 dark:text-slate-400">
                        <span>Transport Fee (Monthly)</span>
                        <span className="font-semibold">₹{fees.transportFee.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-205 dark:border-slate-700 pt-3 flex justify-between font-bold text-gray-900 dark:text-white text-base">
                      <span>Provisional Payable Dues</span>
                      <span className="text-blue-900 dark:text-amber-400">₹{fees.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-800 text-[11px] text-gray-500 dark:text-slate-450 leading-relaxed flex gap-2">
                    <BadgeInfo className="w-5 h-5 shrink-0 text-blue-800 dark:text-amber-400 mt-0.5" />
                    <span>These rates are indicative estimates for the {academicYear} session. Lab fees for senior secondary classes are additional and calculated post subject selections.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Inquiry Status Tracker Tab */}
          {activeTab === 'track' && (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
              
              {/* Tracker Form */}
              <form onSubmit={handleTrackQuery} className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Track Admission Status</h2>
                  <p className="text-xs text-gray-550 dark:text-slate-455 mt-1">
                    Enter the phone number used in the application form or your Application ID (e.g. "MPS-DEMO-101").
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Search className="w-4 h-4 text-gray-450 absolute left-3 top-3.5" />
                    <input 
                      type="text" 
                      placeholder="Enter Application ID or 10-digit Phone..."
                      value={trackQuery}
                      onChange={(e) => setTrackQuery(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-300 dark:border-slate-750 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 outline-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-blue-900 hover:bg-blue-800 dark:bg-slate-855 dark:hover:bg-slate-700 text-white font-bold px-6 rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Track
                  </button>
                </div>
              </form>

              {/* Tracking Results Log */}
              {trackedApplication ? (
                <div className="bg-gray-50 dark:bg-slate-800/40 border border-gray-250 dark:border-slate-800 rounded-2xl p-6 space-y-6 animate-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-slate-800 gap-2">
                    <div>
                      <p className="text-xs text-gray-555 dark:text-slate-400">Application Number</p>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">{trackedApplication.appId}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-555 dark:text-slate-400">Applicant Student</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
                        {trackedApplication.studentName} ({trackedApplication.grade})
                      </p>
                    </div>
                  </div>

                  {/* Horizontal status tracker timeline */}
                  <div className="space-y-4">
                    <h5 className="text-xs font-semibold text-gray-700 dark:text-slate-350 uppercase tracking-wider">Processing Timeline</h5>
                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-250 dark:before:bg-slate-800">
                      
                      {/* Step 1 */}
                      <div className="relative flex items-start gap-4">
                        <div className="absolute -left-6 w-4.5 h-4.5 rounded-full bg-green-500 flex items-center justify-center border-2 border-white dark:border-slate-900">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">Application Received</p>
                          <p className="text-xs text-gray-500 mt-0.5">Submitted successfully on {trackedApplication.date}.</p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative flex items-start gap-4">
                        <div className={`absolute -left-6 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 ${
                          ['Verified', 'Interview', 'Approved'].includes(trackedApplication.status) ? 'bg-green-500' : 'bg-yellow-500'
                        }`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">Document Review</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {['Verified', 'Interview', 'Approved'].includes(trackedApplication.status) 
                              ? 'Verification of birth records and mark sheets complete.' 
                              : 'Birth certificate and photo under evaluation by registrar.'}
                          </p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative flex items-start gap-4">
                        <div className={`absolute -left-6 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 ${
                          trackedApplication.status === 'Approved' ? 'bg-green-500' : 
                          trackedApplication.status === 'Interview' ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">Interactive Interview</p>
                          <p className="text-xs text-gray-550 dark:text-slate-400 mt-0.5">
                            {trackedApplication.status === 'Approved' ? 'Interview successfully cleared.' : 
                             trackedApplication.status === 'Interview' ? `Scheduled Interview: ${trackedApplication.interviewTime || '05th July 2026'}. Please visit campus.` :
                             'Pending document verification completion.'}
                          </p>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div className="relative flex items-start gap-4">
                        <div className={`absolute -left-6 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 ${
                          trackedApplication.status === 'Approved' ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">Admission Decision</p>
                          <p className="text-xs text-gray-550 dark:text-slate-400 mt-0.5">
                            {trackedApplication.status === 'Approved' 
                              ? 'Provisional Admission Approved! Please visit administration block to pay dues.' 
                              : 'Pending parent interview completion.'}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 bg-gray-55 dark:bg-slate-900/50 rounded-2xl border border-gray-205 dark:border-slate-805">
                  <HelpCircle className="w-10 h-10 text-gray-400 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">No active timeline tracked.</p>
                  <p className="text-xs mt-1 text-gray-450">Please submit an application first or track "MPS-DEMO-101" to verify status timeline.</p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
