export type NavLink = {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { 
    name: 'About MPS', 
    subLinks: [
      { name: 'Prospectus', href: '/prospectus' },
      { name: 'Our Profile', href: '/about' },
      { name: 'Vision / Mission', href: '/vision-mission' },
      { name: 'Chairmans Message', href: '/chairmans-message' },
      { name: 'Joint Chairmans Message', href: '/joint-chairmans-message' },
      { name: 'General Secretary Message', href: '/general-secretary-message' },
      { name: 'Principal Message', href: '/principal-message' },
      { name: 'Vice Principal Message', href: '/vice-principal-message' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Award & Accolades', href: '/awards' },
      { name: 'School Anthem', href: '/school-anthem' },
      { name: 'Student Achievers', href: '/student-achievers' }
    ]
  },
  { 
    name: 'Admission', 
    subLinks: [
      { name: 'Admission Guidelines', href: '/admission#guidelines' },
      { name: 'Online Application Form', href: '/admission#apply' },
      { name: 'Fee Structure', href: '/admission#fees' },
      { name: 'Track Application', href: '/admission#track' }
    ]
  },
  { 
    name: 'Beyond Academic', 
    subLinks: [
      { name: 'Summer Camp', href: '/summer-camp' },
      { name: 'Study Tour', href: '/study-tour' },
      { name: 'Sports', href: '/sports' },
      { name: 'Performing Arts', href: '/performing-arts' },
      { name: 'Annual Function', href: '/annual-function' },
      { name: 'Annual Exhibition', href: '/annual-exhibition' },
      { name: 'Quiz Competition', href: '/quiz-competition' },
      { name: 'Spelling Competition', href: '/spelling-competition' },
      { name: 'Personality Development', href: '/personality-development' },
      { name: 'Alumni Association', href: '/alumni-association' },
      { name: 'Extra-Curricular Activities', href: '/extra-curricular' }
    ]
  },
  { 
    name: 'Gallery', 
    subLinks: [
      { name: 'Photo Gallery', href: '/photo-gallery' },
      { name: 'Video Gallery', href: '/video-gallery' }
    ]
  },
  { 
    name: 'Contact Us', 
    subLinks: [
      { name: 'Contact With Us', href: '/contact' },
      { name: 'Career With Us', href: '/career' }
    ]
  },
  { 
    name: 'Public Disclosure', 
    subLinks: [
      { name: 'Public Disclosure', href: '/public-disclosure' },
      { name: 'Teacher\'s Details', href: '/teacher-details' }
    ]
  }
];

export const quickLinks = [
  'About Us', 'Academics', 'Admissions', 'Facilities', 'Gallery', 'Career', 'Contact Us'
];

export const footerLinks = {
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com"
  },
  legal: ['Privacy Policy', 'Terms of Service', 'Sitemap']
};
