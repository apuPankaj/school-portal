import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import logo from '../../../imports/mps_Logo.png';

export function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-300 pt-16 pb-8 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Info */}
          <div className="space-y-6">
            <div className="bg-white p-2 rounded-lg inline-block">
              <ImageWithFallback 
                src={logo} 
                alt="MPS Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Modern Public School Balasore is dedicated to delivering excellence in education, focusing on holistic development and character building for over two decades.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {['About Us', 'Academics', 'Admissions', 'Facilities', 'Gallery', 'Career', 'Contact Us'].map((link) => (
                <li key={link}>
                  <button className="text-gray-400 hover:text-amber-400 flex items-center transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-400">
                  Modern Public School Campus,<br />
                  Station Road, Balasore,<br />
                  Odisha - 756001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-amber-500 mr-3 flex-shrink-0" size={20} />
                <span className="text-gray-400">+91 6782 123456 / 78901</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-amber-500 mr-3 flex-shrink-0" size={20} />
                <a href="mailto:info@mpsbalasore.edu.in" className="text-gray-400 hover:text-amber-400 transition-colors">
                  info@mpsbalasore.edu.in
                </a>
              </li>
            </ul>
          </div>

          {/* Map Placeholder */}
          <div className="h-full min-h-[200px]">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Location Map</h3>
            <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 relative flex items-center justify-center group cursor-pointer">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1619468129361-605ebea04b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjBuYXZpZ2F0aW9uJTIwcGlufGVufDF8fHx8MTc4MjYwNTU2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Map Placeholder"
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 transition-opacity"
              />
              <div className="relative z-10 flex flex-col items-center">
                <MapPin className="text-amber-500 mb-2 transform group-hover:scale-110 transition-transform" size={32} />
                <span className="text-sm font-medium text-white bg-blue-900/90 px-3 py-1 rounded shadow">View on Google Maps</span>
              </div>
            </div>
          </div>
          
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Modern Public School Balasore. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <button className="hover:text-amber-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-amber-400 transition-colors">Terms of Service</button>
            <button className="hover:text-amber-400 transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
