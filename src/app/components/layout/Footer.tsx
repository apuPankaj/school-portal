import React from 'react';
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router';
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
              <a 
                href="https://www.facebook.com/mpsbalasoreofficial/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/school/mps-balasore/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/mpsbalasore_official/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@mpsbalasoreofficial" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Academics', path: '/academics' },
                { label: 'Admissions', path: '/admission' },
                { label: 'Facilities', path: '/facilities' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Career', path: '/career' },
                { label: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-amber-400 flex items-center transition-colors text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>
                    {link.label}
                  </Link>
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

          {/* Our Branches */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Our Branches</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a 
                  href="https://www.google.com/maps/search/modern+public+school+meghadambru/@21.4701321,86.8805568,6475m/data=!3m2!1e3!4b1?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-start gap-2.5 group"
                >
                  <MapPin className="text-amber-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                  <div>
                    <span className="font-bold block text-white text-sm">MPS Meghadambru</span>
                    <span className="text-xs text-gray-400 block mt-0.5">Meghadambru, Balasore</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.google.com/maps/place/Junior+Modern+Public+School/@21.4971766,86.9226369,809m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a1cf5a0f984cb2b:0x8455b1c2de0dd70!8m2!3d21.4971716!4d86.9252118!16s%2Fg%2F11c604m6mv?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-start gap-2.5 group"
                >
                  <MapPin className="text-amber-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                  <div>
                    <span className="font-bold block text-white text-sm">Junior Modern Public School</span>
                    <span className="text-xs text-gray-400 block mt-0.5">Station Road, Balasore</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.google.com/maps/place/Modern+Play+School/@21.5065238,86.9329147,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIC_2tjjVg!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAGUGPvA7h9clN_tH25WmZrbbf2az2OzMabu0PgOrc51JUpyZCoogHNctOe5GbfPWKaXUCvS13e0Ad0waJaeA_6MWCyv_cbw-TnAVaNgnyKwBFZCy2wQHVxFd97yCilICoTRyQQA%3Dw114-h86-k-no!7i1280!8i960!4m11!1m2!2m1!1sDarji+pokhari+chowk+Modern+Play+School!3m7!1s0x3a1cf59108fc7e89:0x176b9e82f1e2fec5!8m2!3d21.5064615!4d86.932854!10e5!15sCiZEYXJqaSBwb2toYXJpIGNob3drIE1vZGVybiBQbGF5IFNjaG9vbJIBF2VkdWNhdGlvbmFsX2luc3RpdHV0aW9u4AEA!16s%2Fg%2F11lzkg7nyx?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-start gap-2.5 group"
                >
                  <MapPin className="text-amber-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                  <div>
                    <span className="font-bold block text-white text-sm">Modern Play School</span>
                    <span className="text-xs text-gray-400 block mt-0.5">Darji Pokhari Chowk, Balasore</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Modern Public School Balasore. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-amber-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
