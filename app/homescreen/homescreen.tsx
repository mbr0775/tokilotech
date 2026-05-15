"use client";

import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react";

export default function HomeScreen() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white text-slate-950 transition-colors duration-500 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-white"
    >
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#24375a]/10 blur-3xl animate-pulse md:h-96 md:w-96 dark:bg-[#24375a]/20"></div>

        <div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#91BF48]/10 blur-3xl animate-pulse md:h-96 md:w-96 dark:bg-[#91BF48]/10"
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className="absolute left-1/2 top-1/2 h-48 w-48 rounded-full bg-[#4a5f8a]/10 blur-3xl animate-pulse md:h-64 md:w-64 dark:bg-[#4a5f8a]/15"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70 dark:opacity-100"></div>

      {/* Hero Section */}
      <div className="relative flex min-h-screen items-center justify-center px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <div className="relative z-10 w-full max-w-6xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-[#91BF48]/25 bg-[#91BF48]/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#4b7a16] shadow-sm backdrop-blur-sm sm:mb-8 sm:px-4 sm:py-2 sm:text-sm dark:border-[#24375a]/50 dark:bg-[#24375a]/30 dark:text-[#91BF48]">
            <Sparkles size={14} className="animate-pulse sm:h-4 sm:w-4" />
            AI-Powered Solutions
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 animate-fade-in text-4xl font-black leading-[1.1] tracking-tight animation-delay-200 sm:mb-6 sm:text-5xl md:text-7xl lg:text-8xl">
            <span className="text-slate-950 dark:text-white">THE FUTURE</span>
            <br />
            <span className="animate-gradient bg-gradient-to-r from-[#24375a] via-[#4a5f8a] to-[#91BF48] bg-clip-text text-transparent">
              IS INTELLIGENT
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-8 max-w-3xl animate-fade-in px-2 text-sm leading-relaxed text-slate-600 animation-delay-400 sm:mb-12 sm:text-lg md:text-2xl dark:text-gray-400">
            Harness the power of{" "}
            <span className="font-bold text-[#91BF48]">
              AI and intelligent software
            </span>{" "}
            to transform your business with cutting-edge solutions
          </p>

          {/* CTA Buttons */}
          <div className="mb-10 flex animate-fade-in flex-col flex-wrap justify-center gap-3 px-4 animation-delay-600 sm:mb-16 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-6 py-3 text-base font-black text-white shadow-lg shadow-[#24375a]/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#24375a]/40 sm:px-8 sm:py-4 sm:text-lg"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
              />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("services")}
              className="rounded-full border-2 border-slate-300 bg-white/70 px-6 py-3 text-base font-black text-slate-900 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#91BF48] hover:bg-[#91BF48]/10 sm:px-8 sm:py-4 sm:text-lg dark:border-gray-700 dark:bg-transparent dark:text-white dark:hover:border-[#91BF48] dark:hover:bg-[#91BF48]/10"
            >
              Learn More
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex animate-fade-in flex-wrap justify-center gap-2 px-4 animation-delay-800 sm:gap-4">
            <div className="group flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#24375a] hover:bg-slate-50 sm:px-6 sm:py-3 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-[#24375a] dark:hover:bg-gray-800">
              <Zap
                size={16}
                className="text-[#91BF48] group-hover:animate-pulse sm:h-[18px] sm:w-[18px]"
              />
              <span className="text-xs font-bold text-slate-700 sm:text-sm dark:text-gray-300">
                Fast Deployment
              </span>
            </div>

            <div className="group flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#24375a] hover:bg-slate-50 sm:px-6 sm:py-3 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-[#24375a] dark:hover:bg-gray-800">
              <Brain
                size={16}
                className="text-[#91BF48] group-hover:animate-pulse sm:h-[18px] sm:w-[18px]"
              />
              <span className="text-xs font-bold text-slate-700 sm:text-sm dark:text-gray-300">
                AI-Powered
              </span>
            </div>

            <div className="group flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#24375a] hover:bg-slate-50 sm:px-6 sm:py-3 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-[#24375a] dark:hover:bg-gray-800">
              <Sparkles
                size={16}
                className="text-[#91BF48] group-hover:animate-pulse sm:h-[18px] sm:w-[18px]"
              />
              <span className="text-xs font-bold text-slate-700 sm:text-sm dark:text-gray-300">
                Scalable Solutions
              </span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute left-10 top-1/4 h-20 w-20 animate-float rounded-lg border-2 border-[#24375a]/15 rotate-12 dark:border-[#24375a]/30"></div>

          <div className="absolute right-10 top-1/3 h-16 w-16 animate-float-delayed rounded-full border-2 border-[#91BF48]/25 dark:border-[#91BF48]/30"></div>

          <div className="absolute bottom-1/4 left-20 h-12 w-12 animate-float rounded-lg bg-gradient-to-br from-[#24375a]/10 to-[#4a5f8a]/10 rotate-45 dark:from-[#24375a]/20 dark:to-[#4a5f8a]/20"></div>

          <div className="absolute bottom-1/3 right-20 h-24 w-24 animate-float-delayed rounded-lg border-2 border-[#4a5f8a]/20 rotate-6 dark:border-[#4a5f8a]/30"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce sm:bottom-10">
          <div className="flex h-8 w-5 justify-center rounded-full border-2 border-slate-300 sm:h-10 sm:w-6 dark:border-gray-600">
            <div className="mt-1.5 h-2 w-1 animate-scroll rounded-full bg-[#91BF48] sm:mt-2 sm:h-3 sm:w-1.5"></div>
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
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-20px) rotate(12deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
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
          0%,
          100% {
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

        .hero-grid {
          background-image: linear-gradient(
              rgba(36, 55, 90, 0.06) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(36, 55, 90, 0.06) 1px,
              transparent 1px
            );
          background-size: 50px 50px;
        }

        :global(html.dark) .hero-grid {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
        }
      `}</style>
    </section>
  );
}