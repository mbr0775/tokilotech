'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Target, Zap, Users } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: '150+', label: 'Projects Completed', icon: CheckCircle },
    { value: '50+', label: 'Happy Clients', icon: Users },
    { value: '10+', label: 'Years Experience', icon: Target },
    { value: '24/7', label: 'Support Available', icon: Zap },
  ];

  // Slideshow images
  const images = [
    { src: 'https://images.unsplash.com/photo-1516321310766-61f6f8c0b51f?w=800', alt: 'Team collaboration' },
    { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', alt: 'Business meeting' },
    { src: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800', alt: 'Innovative workspace' },
    { src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800', alt: 'Professional strategy' },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden"
      id="about"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#24375a] rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#91BF48] rounded-full blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-[#24375a]/30 border border-[#24375a]/50 rounded-full text-xs font-semibold text-[#91BF48] uppercase tracking-wider backdrop-blur-sm">
              About Us
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24375a] to-[#4a5f8a]">Tokilo Technologies</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Building the future of intelligent software solutions with innovation and excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-[#24375a] transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">
                  Tokilo Technologies is an emerging AI and software development company dedicated to creating intelligent digital solutions. We help businesses automate operations, improve decision-making, and deliver exceptional customer experiences through cutting-edge technology.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-[#24375a] transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-4">What We Do</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We offer end-to-end software services including web applications, mobile apps, backend systems, and secure database integration using React.js, ASP.NET, MySQL, and PostgreSQL.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Our focus extends to AI technologies like machine learning, data analytics, and intelligent automation that solve real-world business challenges.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-8 py-4 bg-[#24375a] text-white rounded-full font-semibold hover:bg-[#2d4666] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#24375a]/30 flex items-center gap-2 group">
                  Get Started
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-gray-700 text-white rounded-full font-semibold hover:border-[#91BF48] hover:bg-[#91BF48]/10 transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Slideshow */}
          <div className={`relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-[#24375a]/20 border border-gray-800 relative group">
              {images.map((image, index: number) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImage ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                </div>
              ))}
              
              {/* Image caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-semibold text-lg">{images[currentImage].alt}</p>
              </div>
            </div>
            
            {/* Dot Navigation */}
            <div className="flex justify-center gap-3 mt-6">
              {images.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? 'w-8 bg-[#24375a]'
                      : 'w-2 bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index: number) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-800 hover:border-[#24375a] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#24375a]/20 group"
                  style={{
                    animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#24375a] to-[#4a5f8a] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={20} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-[#4a5f8a] transition-colors duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-400 leading-tight">{stat.label}</p>
                  <div className="mt-4 h-1 w-0 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] rounded-full group-hover:w-full transition-all duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision Section */}
        <div className={`mt-20 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] rounded-2xl p-12 relative overflow-hidden transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Vision for the Future
            </h3>
            <p className="text-gray-200 mb-8 text-lg max-w-3xl mx-auto leading-relaxed">
              We plan to expand into AI-driven enterprise solutions including predictive analytics, chatbot systems, and computer vision applications. Our commitment is to become a trusted technology partner for businesses embracing digital transformation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-[#24375a] rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Join Our Journey
              </button>
            </div>
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
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}