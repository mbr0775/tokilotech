"use client";

import { useState, useEffect, useRef } from "react";
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
  LucideIcon,
  ArrowRight,
} from "lucide-react";

type ServiceCategory = "software" | "ai" | "enterprise";

interface Service {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  category: ServiceCategory;
}

const services: Service[] = [
  {
    id: 1,
    icon: Code,
    title: "Web Application Development",
    description:
      "Build powerful, responsive web applications with modern frameworks and best practices.",
    features: ["React.js", "Next.js", "Progressive Web Apps", "Real-time Features"],
    category: "software",
  },
  {
    id: 2,
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile solutions for iOS and Android.",
    features: ["React Native", "Native Performance", "Cross-platform", "App Store Launch"],
    category: "software",
  },
  {
    id: 3,
    icon: Database,
    title: "Backend & Database Systems",
    description:
      "Robust backend architecture with secure database integration.",
    features: ["ASP.NET Core", "RESTful APIs", "MySQL", "PostgreSQL"],
    category: "software",
  },
  {
    id: 4,
    icon: Brain,
    title: "Machine Learning Solutions",
    description:
      "Intelligent ML models that learn from your data and improve over time.",
    features: ["Custom Models", "Neural Networks", "Deep Learning", "Model Training"],
    category: "ai",
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights for better decision making.",
    features: ["Data Visualization", "Business Intelligence", "Reporting", "Dashboards"],
    category: "ai",
  },
  {
    id: 6,
    icon: Zap,
    title: "Intelligent Automation",
    description:
      "Automate repetitive tasks and streamline business processes with AI.",
    features: ["Process Automation", "Workflow Optimization", "RPA", "Smart Tools"],
    category: "ai",
  },
  {
    id: 7,
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "Forecast trends and outcomes using advanced statistical algorithms.",
    features: ["Forecasting", "Risk Analysis", "Pattern Recognition", "Trend Prediction"],
    category: "enterprise",
  },
  {
    id: 8,
    icon: MessageSquare,
    title: "Chatbot Systems",
    description:
      "AI-powered conversational interfaces for customer engagement.",
    features: ["NLP Integration", "24/7 Support", "Multi-language", "Custom Training"],
    category: "enterprise",
  },
  {
    id: 9,
    icon: Eye,
    title: "Computer Vision",
    description:
      "Advanced image and video analysis for intelligent visual processing.",
    features: ["Object Detection", "Image Recognition", "Video Analysis", "OCR"],
    category: "enterprise",
  },
];

const categories = [
  { id: "all", label: "All Services", icon: Cpu },
  { id: "software", label: "Software Development", icon: Code },
  { id: "ai", label: "AI Solutions", icon: Brain },
  { id: "enterprise", label: "Enterprise Solutions", icon: TrendingUp },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);
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

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white px-4 py-16 text-slate-950 transition-colors duration-500 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-white sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-16"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#24375a]/10 blur-3xl animate-pulse dark:bg-[#24375a]/20 md:h-96 md:w-96"></div>

        <div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#91BF48]/10 blur-3xl animate-pulse dark:bg-[#91BF48]/10 md:h-96 md:w-96"
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
              Our Services
            </span>
          </div>

          <h2 className="mb-5 text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Smart Solutions for{" "}
            <span className="bg-gradient-to-r from-[#24375a] via-[#4a5f8a] to-[#91BF48] bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h2>

          <p className="mx-auto max-w-3xl px-4 text-base leading-relaxed text-slate-600 dark:text-gray-400 sm:text-lg md:text-xl">
            Comprehensive technology solutions designed to transform your
            business, improve operations, and drive digital innovation.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`mb-12 flex flex-wrap justify-center gap-3 transition-all delay-200 duration-1000 sm:mb-16 sm:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-black transition-all duration-300 hover:scale-105 sm:px-6 sm:py-3 ${
                  isActive
                    ? "bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white shadow-lg shadow-[#24375a]/25"
                    : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
                }`}
              >
                <IconComponent size={18} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredServices.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#24375a] hover:shadow-2xl hover:shadow-[#24375a]/10 dark:border-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:hover:border-[#24375a] dark:hover:shadow-[#24375a]/20 sm:p-8 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animation: isVisible
                    ? `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    : "none",
                }}
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#24375a] to-[#4a5f8a] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <IconComponent size={32} className="text-white" />
                  </div>

                  <div className="absolute inset-0 h-16 w-16 rounded-xl bg-[#24375a] opacity-25 blur-xl transition-opacity group-hover:opacity-45 dark:opacity-50 dark:group-hover:opacity-75"></div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-black text-slate-950 transition-colors group-hover:text-[#24375a] dark:text-white dark:group-hover:text-[#91BF48] sm:text-2xl">
                  {service.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-gray-400 sm:text-base">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-500 transition-colors group-hover:text-slate-700 dark:text-gray-500 dark:group-hover:text-gray-300"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-[#91BF48]"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-[#24375a] to-[#91BF48] transition-all duration-500 group-hover:w-full"></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div
          className={`mt-16 text-center transition-all delay-500 duration-1000 sm:mt-20 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#24375a] to-[#4a5f8a] p-6 shadow-2xl shadow-[#24375a]/20 sm:p-10 md:p-12">
            <div className="bg-grid-pattern absolute inset-0 opacity-10"></div>

            <div className="relative z-10">
              <h3 className="mb-4 text-2xl font-black text-white sm:text-3xl md:text-4xl">
                Ready to Transform Your Business?
              </h3>

              <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">
                Let us discuss how our software and AI solutions can help you
                achieve your business goals.
              </p>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-black text-[#24375a] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 sm:px-8 sm:py-4 sm:text-lg"
              >
                Schedule a Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" />
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