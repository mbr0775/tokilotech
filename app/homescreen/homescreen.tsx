'use client';

import { ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';

export default function HomeScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden" id="home">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#24375a] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-[#91BF48] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 md:w-64 h-48 md:h-64 bg-[#4a5f8a] rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6">
        <div className="relative z-10 text-center max-w-6xl w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#24375a]/30 border border-[#24375a]/50 rounded-full text-xs sm:text-sm font-semibold text-[#91BF48] mb-6 sm:mb-8 backdrop-blur-sm animate-fade-in">
            <Sparkles size={14} className="animate-pulse sm:w-4 sm:h-4" />
            <span className="uppercase tracking-wider">AI-Powered Solutions</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight leading-[1.1] animate-fade-in animation-delay-200">
            <span className="text-white">THE FUTURE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24375a] via-[#4a5f8a] to-[#91BF48] animate-gradient">
              IS INTELLIGENT
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-400 text-sm sm:text-lg md:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400 px-2">
            Harness the power of <span className="text-[#91BF48] font-semibold">AI and intelligent software</span> to transform your business with cutting-edge solutions
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 animate-fade-in animation-delay-600 px-4">
            <button 
              onClick={() => alert('Navigate to About')}
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl hover:shadow-[#24375a]/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={() => alert('Navigate to Services')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-gray-700 text-white rounded-full font-semibold text-base sm:text-lg hover:border-[#91BF48] hover:bg-[#91BF48]/10 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center animate-fade-in animation-delay-800 px-4">
            <div className="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-full hover:border-[#24375a] hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              <Zap size={16} className="text-[#91BF48] group-hover:animate-pulse sm:w-[18px] sm:h-[18px]" />
              <span className="text-gray-300 text-xs sm:text-sm font-medium">Fast Deployment</span>
            </div>
            <div className="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-full hover:border-[#24375a] hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              <Brain size={16} className="text-[#91BF48] group-hover:animate-pulse sm:w-[18px] sm:h-[18px]" />
              <span className="text-gray-300 text-xs sm:text-sm font-medium">AI-Powered</span>
            </div>
            <div className="group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-full hover:border-[#24375a] hover:bg-gray-800 transition-all duration-300 cursor-pointer">
              <Sparkles size={16} className="text-[#91BF48] group-hover:animate-pulse sm:w-[18px] sm:h-[18px]" />
              <span className="text-gray-300 text-xs sm:text-sm font-medium">Scalable Solutions</span>
            </div>
          </div>
        </div>

        {/* Floating Elements - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          {/* Top Left */}
          <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-[#24375a]/30 rounded-lg rotate-12 animate-float"></div>
          
          {/* Top Right */}
          <div className="absolute top-1/3 right-10 w-16 h-16 border-2 border-[#91BF48]/30 rounded-full animate-float-delayed"></div>
          
          {/* Bottom Left */}
          <div className="absolute bottom-1/4 left-20 w-12 h-12 bg-gradient-to-br from-[#24375a]/20 to-[#4a5f8a]/20 rounded-lg rotate-45 animate-float"></div>
          
          {/* Bottom Right */}
          <div className="absolute bottom-1/3 right-20 w-24 h-24 border-2 border-[#4a5f8a]/30 rounded-lg rotate-6 animate-float-delayed"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-[#91BF48] rounded-full mt-1.5 sm:mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

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

        .animation-delay-800 {
          animation-delay: 800ms;
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

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
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

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
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