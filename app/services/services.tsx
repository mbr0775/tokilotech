"use client";

import { useState } from "react";
import Link from "next/link";
import { Code, Smartphone, Database, Brain, BarChart3, Zap, MessageSquare, Eye, TrendingUp, Cpu, type LucideIcon, ArrowRight } from "lucide-react";
import styles from "../design.module.css";
import MotionSurface from "../motion/MotionSurface";

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
    features: [
      "React.js",
      "Next.js",
      "Progressive Web Apps",
      "Real-time Features",
    ],
    category: "software",
  },
  {
    id: 2,
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile solutions for iOS and Android.",
    features: [
      "React Native",
      "Native Performance",
      "Cross-platform",
      "App Store Launch",
    ],
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
    features: [
      "Custom Models",
      "Neural Networks",
      "Deep Learning",
      "Model Training",
    ],
    category: "ai",
  },
  {
    id: 5,
    icon: BarChart3,
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights for better decision making.",
    features: [
      "Data Visualization",
      "Business Intelligence",
      "Reporting",
      "Dashboards",
    ],
    category: "ai",
  },
  {
    id: 6,
    icon: Zap,
    title: "Intelligent Automation",
    description:
      "Automate repetitive tasks and streamline business processes with AI.",
    features: [
      "Process Automation",
      "Workflow Optimization",
      "RPA",
      "Smart Tools",
    ],
    category: "ai",
  },
  {
    id: 7,
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "Forecast trends and outcomes using advanced statistical algorithms.",
    features: [
      "Forecasting",
      "Risk Analysis",
      "Pattern Recognition",
      "Trend Prediction",
    ],
    category: "enterprise",
  },
  {
    id: 8,
    icon: MessageSquare,
    title: "Chatbot Systems",
    description:
      "AI-powered conversational interfaces for customer engagement.",
    features: [
      "NLP Integration",
      "24/7 Support",
      "Multi-language",
      "Custom Training",
    ],
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
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredServices = activeCategory === "all" ? services : services.filter((service) => service.category === activeCategory);

  return (
    <section id="services" aria-labelledby="services-heading" className={`${styles.section} ${styles.surface}`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div data-scroll-reveal="left"><span className={styles.eyebrow}>Our Services</span><h2 id="services-heading" className={styles.heading}>Our Services</h2></div>
          <p className={styles.intro} data-scroll-reveal="right" data-scroll-delay="1">Comprehensive technology solutions designed to transform your business and drive innovation.</p>
        </div>
        <div className={styles.serviceFilters} role="group" aria-label="Service categories" data-scroll-reveal="up">
          {categories.map((category) => {
            const Icon = category.icon;
            return <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} aria-pressed={activeCategory === category.id} aria-controls="service-results" className={styles.filter}><Icon size={15} aria-hidden="true" />{category.label}</button>;
          })}
        </div>
        <div id="service-results" className={styles.serviceGrid}>
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <MotionSurface key={service.id} className={styles.serviceCard} delay={(index % 3) * 0.07}>
                <div className={styles.serviceTop}><Icon size={34} strokeWidth={1} aria-hidden="true" /><span>{String(service.id).padStart(2, "0")}</span></div>
                <h3>{service.title}</h3><p>{service.description}</p>
                <ul className={styles.features}>{service.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </MotionSurface>
            );
          })}
        </div>
        <div className={styles.serviceCta} data-scroll-reveal="up">
          <div><h3>Ready to Transform Your Business?</h3><p>Let us discuss how our solutions can help you achieve your goals.</p></div>
          <Link href="/shedule_contact" className={styles.pill}><ArrowRight size={17} aria-hidden="true" />Schedule a Consultation</Link>
        </div>
      </div>
    </section>
  );
}
