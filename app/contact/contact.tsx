'use client';

import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Github, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden flex flex-col" id="contact">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24375a] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#91BF48] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#4a5f8a] rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

      {/* Contact Section */}
      <div className="relative flex-1 flex items-center justify-center pt-20 px-6">
        <div className="relative z-10 text-center max-w-5xl w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#24375a]/30 border border-[#24375a]/50 rounded-full text-sm font-semibold text-[#91BF48] mb-8 backdrop-blur-sm animate-fade-in">
            <Send size={16} className="animate-pulse" />
            <span className="uppercase tracking-wider">Get in Touch</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] animate-fade-in animation-delay-200">
            <span className="text-white">LETS</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24375a] via-[#4a5f8a] to-[#91BF48] animate-gradient">
              CONNECT
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-gray-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
            Reach out to discuss how our <span className="text-[#91BF48] font-semibold">AI-powered solutions</span> can transform your business
          </p>

          {/* Contact Content */}
          <div className="grid md:grid-cols-2 gap-12 animate-fade-in animation-delay-600">
            {/* Contact Info */}
            <div className="text-left space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-gray-800/50 rounded-full border border-gray-700 group-hover:border-[#91BF48] transition-all duration-300">
                  <Mail size={24} className="text-[#91BF48]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email</h3>
                  <p className="text-gray-400">info@tokilotech.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-gray-800/50 rounded-full border border-gray-700 group-hover:border-[#91BF48] transition-all duration-300">
                  <Phone size={24} className="text-[#91BF48]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-gray-800/50 rounded-full border border-gray-700 group-hover:border-[#91BF48] transition-all duration-300">
                  <MapPin size={24} className="text-[#91BF48]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Address</h3>
                  <p className="text-gray-400">123 AI Innovation Street<br />Tech Valley, CA 94043</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6 text-left">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 placeholder-gray-500 focus:border-[#91BF48] focus:outline-none transition-all duration-300" 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 placeholder-gray-500 focus:border-[#91BF48] focus:outline-none transition-all duration-300" 
              />
              <textarea 
                placeholder="Your Message" 
                className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-3xl text-gray-300 placeholder-gray-500 focus:border-[#91BF48] focus:outline-none transition-all duration-300 h-40 resize-none"
              />
              <button 
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-[#24375a]/50 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left */}
          <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-[#24375a]/30 rounded-lg rotate-12 animate-float"></div>
          
          {/* Top Right */}
          <div className="absolute top-1/3 right-10 w-16 h-16 border-2 border-[#91BF48]/30 rounded-full animate-float-delayed"></div>
          
          {/* Bottom Left */}
          <div className="absolute bottom-1/4 left-20 w-12 h-12 bg-gradient-to-br from-[#24375a]/20 to-[#4a5f8a]/20 rounded-lg rotate-45 animate-float"></div>
          
          {/* Bottom Right */}
          <div className="absolute bottom-1/3 right-20 w-24 h-24 border-2 border-[#4a5f8a]/30 rounded-lg rotate-6 animate-float-delayed"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-12 bg-gray-900/95 border-t border-gray-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Company Info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#24375a] to-[#4a5f8a] rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-[#24375a] to-[#4a5f8a] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-white"
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
              <p className="text-gray-400 text-sm">
                Harnessing AI to drive innovation and transform businesses worldwide.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-semibold text-lg">Follow Us</h3>
              <div className="flex gap-4">
                <a href="https://twitter.com" className="p-2 bg-gray-800/50 rounded-full border border-gray-700 hover:border-[#91BF48] hover:bg-gray-800 transition-all duration-300">
                  <Twitter size={20} className="text-[#91BF48]" />
                </a>
                <a href="https://linkedin.com" className="p-2 bg-gray-800/50 rounded-full border border-gray-700 hover:border-[#91BF48] hover:bg-gray-800 transition-all duration-300">
                  <Linkedin size={20} className="text-[#91BF48]" />
                </a>
                <a href="https://github.com" className="p-2 bg-gray-800/50 rounded-full border border-gray-700 hover:border-[#91BF48] hover:bg-gray-800 transition-all duration-300">
                  <Github size={20} className="text-[#91BF48]" />
                </a>
                <a href="https://facebook.com" className="p-2 bg-gray-800/50 rounded-full border border-gray-700 hover:border-[#91BF48] hover:bg-gray-800 transition-all duration-300">
                  <Facebook size={20} className="text-[#91BF48]" />
                </a>
              </div>
            </div>

            {/* Partners */}
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-semibold text-lg">Our Partners</h3>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-sm hover:text-[#91BF48] transition-colors duration-300">
                  Google Cloud
                </div>
                <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-sm hover:text-[#91BF48] transition-colors duration-300">
                  AWS
                </div>
                <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-sm hover:text-[#91BF48] transition-colors duration-300">
                  Microsoft Azure
                </div>
                <div className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-gray-300 text-sm hover:text-[#91BF48] transition-colors duration-300">
                  OpenAI
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <div>
              © {new Date().getFullYear()} Tokilo Technologies. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-[#91BF48] transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#91BF48] transition-colors duration-300">Terms of Service</a>
              <a href="/cookies" className="hover:text-[#91BF48] transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(2.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1000ms ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}