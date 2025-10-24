'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-[#24375a]/20 border-b border-gray-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#24375a] to-[#4a5f8a] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              
              {/* Logo circle */}
              <div className="relative w-12 h-12 bg-gradient-to-br from-[#24375a] to-[#4a5f8a] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            
            <div className="ml-3">
              <div className="text-white font-bold text-lg tracking-wide group-hover:text-[#91BF48] transition-colors duration-300">
                TOKILO TECHNOLOGIES
              </div>
              <div className="text-[#91BF48] text-xs tracking-wider font-medium">
                AI & SOFTWARE SOLUTIONS
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href.substring(1));
                }}
                className="text-gray-300 font-semibold text-sm tracking-wide hover:text-white transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#24375a] to-[#91BF48] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            
            {/* CTA Button */}
            <button className="px-6 py-2.5 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-[#24375a]/50 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#91BF48] transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 py-4 border-t border-gray-800">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href.substring(1));
                }}
                className="text-gray-300 font-semibold text-sm tracking-wide hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg transition-all duration-300"
                style={{
                  animation: isMobileMenuOpen ? `fadeInUp 0.3s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                {link.name}
              </a>
            ))}
            <button 
              className="px-6 py-2.5 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-[#24375a]/50 transition-all duration-300 mx-4"
              style={{
                animation: isMobileMenuOpen ? `fadeInUp 0.3s ease-out ${navLinks.length * 0.1}s both` : 'none'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}