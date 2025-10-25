'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  Smartphone, 
  Database, 
  Brain, 
  BarChart3, 
  Zap, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  Cpu,
  LucideIcon
} from 'lucide-react';

interface Service {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  category: 'software' | 'ai' | 'enterprise';
}

const services: Service[] = [
  {
    id: 1,
    icon: Code,
    title: 'Web Application Development',
    description: 'Build powerful, responsive web applications with modern frameworks and best practices.',
    features: ['React.js', 'Next.js', 'Progressive Web Apps', 'Real-time Features'],
    category: 'software'
  },
  {
    id: 2,
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile solutions for iOS and Android.',
    features: ['React Native', 'Native Performance', 'Cross-platform', 'App Store Launch'],
    category: 'software'
  },
  {
    id: 3,
    icon: Database,
    title: 'Backend & Database Systems',
    description: 'Robust backend architecture with secure database integration.',
    features: ['ASP.NET Core', 'RESTful APIs', 'MySQL', 'PostgreSQL'],
    category: 'software'
  },
  {
    id: 4,
    icon: Brain,
    title: 'Machine Learning Solutions',
    description: 'Intelligent ML models that learn from your data and improve over time.',
    features: ['Custom Models', 'Neural Networks', 'Deep Learning', 'Model Training'],
    category: 'ai'
  },
  {
    id: 5,
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights for better decision making.',
    features: ['Data Visualization', 'Business Intelligence', 'Reporting', 'Dashboards'],
    category: 'ai'
  },
  {
    id: 6,
    icon: Zap,
    title: 'Intelligent Automation',
    description: 'Automate repetitive tasks and streamline business processes with AI.',
    features: ['Process Automation', 'Workflow Optimization', 'RPA', 'Smart Tools'],
    category: 'ai'
  },
  {
    id: 7,
    icon: TrendingUp,
    title: 'Predictive Analytics',
    description: 'Forecast trends and outcomes using advanced statistical algorithms.',
    features: ['Forecasting', 'Risk Analysis', 'Pattern Recognition', 'Trend Prediction'],
    category: 'enterprise'
  },
  {
    id: 8,
    icon: MessageSquare,
    title: 'Chatbot Systems',
    description: 'AI-powered conversational interfaces for customer engagement.',
    features: ['NLP Integration', '24/7 Support', 'Multi-language', 'Custom Training'],
    category: 'enterprise'
  },
  {
    id: 9,
    icon: Eye,
    title: 'Computer Vision',
    description: 'Advanced image and video analysis for intelligent visual processing.',
    features: ['Object Detection', 'Image Recognition', 'Video Analysis', 'OCR'],
    category: 'enterprise'
  }
];

const categories = [
  { id: 'all', label: 'All Services', icon: Cpu },
  { id: 'software', label: 'Software Development', icon: Code },
  { id: 'ai', label: 'AI Solutions', icon: Brain },
  { id: 'enterprise', label: 'Enterprise Solutions', icon: TrendingUp }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden"
      id="services"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24375a] rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#24375a] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24375a] to-[#4a5f8a]">Services</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive technology solutions designed to transform your business and drive innovation
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-[#24375a] text-white shadow-lg shadow-[#24375a]/50'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <IconComponent size={20} />
                <span className="font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 hover:border-[#24375a] transition-all duration-500 hover:shadow-2xl hover:shadow-[#24375a]/20 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#24375a] to-[#4a5f8a] rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 bg-[#24375a] rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#4a5f8a] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-400 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#24375a]"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect Line */}
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#24375a] to-[#4a5f8a] rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Transform Your Business?
              </h3>
              <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
                Let us discuss how our solutions can help you achieve your goals
              </p>
              <button className="px-8 py-4 bg-white text-[#24375a] rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Schedule a Consultation
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