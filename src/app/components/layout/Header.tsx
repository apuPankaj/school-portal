import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Search } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from '../../../imports/mps_Logo.png';
import { useTheme } from 'next-themes';
import { Link } from 'react-router';
import { SearchBar } from '../widgets/SearchBar';

import { navLinks } from '../../data/mockData';

import { toast } from 'sonner';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setUserRole(localStorage.getItem('userRole'));
    
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('userRole'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentId');
    localStorage.removeItem('userContact');
    setUserRole(null);
    toast.success('Logged out successfully!');
    window.location.href = import.meta.env.BASE_URL;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 shadow-md transition-colors duration-300">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <ImageWithFallback 
                src={logo} 
                alt="Modern Public School Logo" 
                className="h-16 w-auto object-contain dark:brightness-110"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex lg:space-x-3 xl:space-x-6 items-center">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <div className="flex items-center text-blue-900 dark:text-blue-100 hover:text-amber-500 dark:hover:text-amber-400 font-medium text-sm transition-colors cursor-pointer py-2 whitespace-nowrap">
                    {link.name}
                    <ChevronDown className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" />
                  </div>
                ) : (
                  <Link
                    to={link.href!}
                    className="text-blue-900 dark:text-blue-100 hover:text-amber-500 dark:hover:text-amber-400 font-medium text-sm transition-colors py-2 block whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.subLinks && (
                  <div className="absolute top-full left-0 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 dark:border-slate-700 z-50">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.name}
                        to={subLink.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-slate-700 dark:hover:text-amber-400 transition-colors"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Theme Toggle Desktop */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full text-blue-900 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            <div className="flex items-center space-x-3 ml-2">
              <SearchBar className="hidden xl:block w-56" />
              {userRole && (
                <Link
                  to={userRole === 'student' ? '/student-dashboard' : '/parent-dashboard'}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-400 px-3 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm"
                >
                  Dashboard
                </Link>
              )}
              {userRole ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm cursor-pointer border border-transparent"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/portal-login"
                  className="bg-amber-500 hover:bg-amber-600 text-[#161616] px-4 py-2 rounded-md font-semibold text-sm transition-colors shadow-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile menu button & Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-blue-900 dark:text-amber-400 focus:outline-none"
              >
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-900 dark:text-blue-100 hover:text-amber-500 dark:hover:text-amber-400 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            
            {/* Mobile Search */}
            <div className="px-3 mb-4 mt-2">
              <SearchBar onNavigate={() => setIsMobileMenuOpen(false)} />
            </div>

            {navLinks.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  <details className="group">
                    <summary className="flex justify-between items-center px-3 py-3 rounded-md text-base font-medium text-blue-900 dark:text-blue-100 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer list-none">
                      {link.name}
                      <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-gray-500" />
                    </summary>
                    <div className="pl-6 pb-2 space-y-1">
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          to={subLink.href}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={link.href!}
                    className="block px-3 py-3 rounded-md text-base font-medium text-blue-900 dark:text-blue-100 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="px-3 py-4 mt-2 space-y-3 border-t border-gray-100 dark:border-slate-800">
              {userRole && (
                <Link
                  to={userRole === 'student' ? '/student-dashboard' : '/parent-dashboard'}
                  className="w-full flex justify-center bg-blue-100 hover:bg-blue-200 text-blue-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-400 px-5 py-3 rounded-md font-semibold text-sm transition-colors shadow-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {userRole ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex justify-center bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-md font-semibold text-sm transition-colors shadow-sm cursor-pointer border border-transparent"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/portal-login"
                  className="w-full flex justify-center bg-amber-500 hover:bg-amber-600 text-[#161616] px-5 py-3 rounded-md font-semibold text-sm transition-colors shadow-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Portal Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
