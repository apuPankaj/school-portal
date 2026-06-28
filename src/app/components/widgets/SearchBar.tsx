import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { navLinks, NavLink } from '../../data/mockData';

// Flatten the navigation links for easy searching
const getSearchableLinks = () => {
  const links: { name: string; href: string; parent?: string }[] = [];
  navLinks.forEach(link => {
    if (link.href) {
      links.push({ name: link.name, href: link.href });
    }
    if (link.subLinks) {
      link.subLinks.forEach(sub => {
        links.push({ name: sub.name, href: sub.href, parent: link.name });
      });
    }
  });
  return links;
};

const searchableLinks = getSearchableLinks();

interface SearchBarProps {
  className?: string;
  onNavigate?: () => void;
}

export function SearchBar({ className = "", onNavigate }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof searchableLinks>([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchableLinks.filter(link => 
      link.name.toLowerCase().includes(lowerQuery) || 
      (link.parent && link.parent.toLowerCase().includes(lowerQuery))
    ).slice(0, 5); // Limit to top 5 results

    setResults(filtered);
    setIsOpen(true);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (href: string) => {
    navigate(href);
    setQuery("");
    setIsOpen(false);
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query.trim()) setIsOpen(true); }}
          placeholder="Search site..." 
          className="w-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white text-sm rounded-full pl-10 pr-4 py-2 focus:bg-white dark:focus:bg-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 transition-all outline-none border border-transparent dark:border-slate-700"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden z-50">
          <div className="max-h-64 overflow-y-auto py-2">
            {results.map((result, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(result.href)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex flex-col items-start"
              >
                <span className="font-medium text-blue-900 dark:text-blue-100 text-sm">
                  {result.name}
                </span>
                {result.parent && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    in {result.parent}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && results.length === 0 && query.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 p-4 text-center z-50">
          <p className="text-sm text-gray-500 dark:text-gray-400">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
