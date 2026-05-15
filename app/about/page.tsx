"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle, Target, Zap, Users } from "lucide-react";

const stats = [
  { value: "150+", label: "Projects Completed", icon: CheckCircle },
  { value: "50+", label: "Happy Clients", icon: Users },
  { value: "10+", label: "Years Experience", icon: Target },
  { value: "24/7", label: "Support Available", icon: Zap },
];

const images = [
  {
    src: "https://images.unsplash.com/photo-1516321310766-61f6f8c0b51f?w=1200",
    alt: "Team collaboration",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
    alt: "Business meeting",
  },
  {
    src: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1200",
    alt: "Innovative workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200",
    alt: "Professional strategy",
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }

      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImage((previousImage) => (previousImage + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentImage(index);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white px-4 py-16 text-slate-950 transition-colors duration-500 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-white sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-16"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-[#24375a]/10 blur-3xl animate-pulse dark:bg-[#24375a]/20 md:h-96 md:w-96"></div>

        <div
          className="absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full bg-[#91BF48]/10 blur-3xl animate-pulse dark:bg-[#91BF48]/10 md:h-96 md:w-96"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div
          className={`mb-12 text-center transition-all duration-1000 sm:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-4 inline-block">
            <span className="rounded-full border border-[#91BF48]/25 bg-[#91BF48]/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#4b7a16] shadow-sm backdrop-blur-sm dark:border-[#24375a]/50 dark:bg-[#24375a]/30 dark:text-[#91BF48]">
              About Us
            </span>
          </div>

          <h2 className="mb-5 px-2 text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            About{" "}
            <span className="bg-gradient-to-r from-[#24375a] via-[#4a5f8a] to-[#91BF48] bg-clip-text text-transparent">
              Tokilo Technologies
            </span>
          </h2>

          <p className="mx-auto max-w-3xl px-4 text-base leading-relaxed text-slate-600 dark:text-gray-400 sm:text-lg md:text-xl">
            Building the future of intelligent software solutions with
            innovation and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <div
            className={`transition-all delay-200 duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="space-y-5 sm:space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#24375a] hover:shadow-xl dark:border-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:hover:border-[#24375a] sm:p-8">
                <h3 className="mb-3 text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
                  Our Mission
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400 sm:text-base">
                  Tokilo Technologies is an emerging AI and software development
                  company dedicated to creating intelligent digital solutions.
                  We help businesses automate operations, improve
                  decision-making, and deliver exceptional customer experiences
                  through cutting-edge technology.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#24375a] hover:shadow-xl dark:border-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:hover:border-[#24375a] sm:p-8">
                <h3 className="mb-3 text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
                  What We Do
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-gray-400 sm:text-base">
                  We offer end-to-end software services including web
                  applications, mobile apps, backend systems, and secure
                  database integration using React.js, ASP.NET, MySQL, and
                  PostgreSQL.
                </p>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400 sm:text-base">
                  Our focus extends to AI technologies like machine learning,
                  data analytics, and intelligent automation that solve
                  real-world business challenges.
                </p>
              </div>

              <div className="flex flex-col flex-wrap gap-3 pt-2 sm:flex-row sm:gap-4 sm:pt-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#24375a]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#24375a]/30 sm:px-8 sm:py-4 sm:text-base"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("services")}
                  className="rounded-full border-2 border-slate-300 bg-white px-6 py-3 text-sm font-black text-slate-900 shadow-sm transition-all duration-300 hover:scale-105 hover:border-[#91BF48] hover:bg-[#91BF48]/10 dark:border-gray-700 dark:bg-transparent dark:text-white dark:hover:border-[#91BF48] dark:hover:bg-[#91BF48]/10 sm:px-8 sm:py-4 sm:text-base"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Right Slideshow */}
          <div
            className={`relative transition-all delay-400 duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-200/70 dark:border-gray-800 dark:bg-gray-900 dark:shadow-[#24375a]/20">
              {images.map((image, index) => (
                <div
                  key={image.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImage ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                </div>
              ))}

              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0 sm:p-6">
                <p className="text-base font-black text-white sm:text-lg">
                  {images[currentImage].alt}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-center gap-2 sm:gap-3">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? "w-8 bg-[#24375a] dark:bg-[#91BF48]"
                      : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mt-12 transition-all delay-600 duration-1000 sm:mt-16 md:mt-20 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#24375a] hover:shadow-xl hover:shadow-[#24375a]/10 dark:border-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:hover:border-[#24375a] dark:hover:shadow-[#24375a]/20 sm:p-6"
                  style={{
                    animation: isVisible
                      ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#24375a] to-[#4a5f8a] transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                      <IconComponent className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                    </div>
                  </div>

                  <h3 className="mb-1 text-2xl font-black text-slate-950 transition-colors duration-300 group-hover:text-[#24375a] dark:text-white dark:group-hover:text-[#91BF48] sm:text-3xl md:text-4xl">
                    {stat.value}
                  </h3>

                  <p className="text-xs leading-tight text-slate-600 dark:text-gray-400 sm:text-sm">
                    {stat.label}
                  </p>

                  <div className="mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-[#24375a] to-[#91BF48] transition-all duration-500 group-hover:w-full"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision */}
        <div
          className={`relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#24375a] to-[#4a5f8a] p-6 shadow-2xl shadow-[#24375a]/20 transition-all delay-800 duration-1000 sm:mt-16 sm:p-10 md:mt-20 md:p-12 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="bg-grid-pattern absolute inset-0 opacity-10"></div>

          <div className="relative z-10 text-center">
            <h3 className="mb-4 text-2xl font-black text-white sm:text-3xl md:text-4xl">
              Our Vision for the Future
            </h3>

            <p className="mx-auto mb-8 max-w-3xl px-2 text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">
              We plan to expand into AI-driven enterprise solutions including
              predictive analytics, chatbot systems, and computer vision
              applications. Our commitment is to become a trusted technology
              partner for businesses embracing digital transformation.
            </p>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="rounded-full bg-white px-6 py-3 text-base font-black text-[#24375a] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 sm:px-8 sm:py-4 sm:text-lg"
            >
              Join Our Journey
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              rgba(255, 255, 255, 0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.12) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}