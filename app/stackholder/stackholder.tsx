"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Award, Handshake, Users } from "lucide-react";
import member1 from "../../public/mubassir.png";
import member2 from "../../public/mubassir2.jpg";
import member3 from "../../public/mubassir3.jpg";
import member4 from "../../public/mubassir.png";
import member5 from "../../public/mubassir2.jpg";
import member6 from "../../public/mubassir.png";
import member7 from "../../public/mubassir2.jpg";
import member8 from "../../public/mubassir.png";

interface TeamMember {
  name: string;
  role: string;
  img: StaticImageData;
  bio?: string;
}

const stakeholders: TeamMember[] = [
  {
    name: "Abul Naser Mubassir",
    role: "FOUNDER & CEO",
    img: member1,
    bio: "Visionary leader driving AI innovation",
  },
  {
    name: "Sarah Johnson",
    role: "CTO",
    img: member2,
    bio: "Tech expert leading development",
  },
  {
    name: "Michael Chen",
    role: "HEAD OF AI",
    img: member3,
    bio: "Machine learning specialist",
  },
  {
    name: "Emily Rodriguez",
    role: "PRODUCT DIRECTOR",
    img: member4,
    bio: "Driving product excellence",
  },
  {
    name: "David Kim",
    role: "LEAD DEVELOPER",
    img: member5,
    bio: "Full-stack expert",
  },
  {
    name: "Jessica Martinez",
    role: "UI/UX DESIGNER",
    img: member6,
    bio: "Creating amazing experiences",
  },
];

const partners: TeamMember[] = [
  {
    name: "Tech Solutions Inc",
    role: "STRATEGIC PARTNER",
    img: member1,
    bio: "Cloud infrastructure solutions",
  },
  {
    name: "Cloud Systems Ltd",
    role: "TECHNOLOGY PARTNER",
    img: member2,
    bio: "Enterprise cloud services",
  },
  {
    name: "Data Analytics Co",
    role: "INTEGRATION PARTNER",
    img: member3,
    bio: "Big data solutions",
  },
  {
    name: "Innovation Hub",
    role: "BUSINESS PARTNER",
    img: member4,
    bio: "Startup acceleration",
  },
  {
    name: "AI Labs Global",
    role: "RESEARCH PARTNER",
    img: member5,
    bio: "AI research collaboration",
  },
  {
    name: "DevOps Pro",
    role: "INFRASTRUCTURE PARTNER",
    img: member6,
    bio: "DevOps solutions",
  },
];

const advisors: TeamMember[] = [
  {
    name: "Dr. James Wilson",
    role: "AI ADVISOR",
    img: member7,
    bio: "PhD in Machine Learning",
  },
  {
    name: "Lisa Anderson",
    role: "BUSINESS STRATEGY",
    img: member8,
    bio: "20+ years in tech",
  },
  {
    name: "Robert Kim",
    role: "TECHNOLOGY ADVISOR",
    img: member1,
    bio: "Former CTO at Fortune 500",
  },
  {
    name: "Maria Garcia",
    role: "GROWTH ADVISOR",
    img: member2,
    bio: "Scaling expert",
  },
  {
    name: "Thomas Lee",
    role: "INVESTMENT ADVISOR",
    img: member3,
    bio: "VC and angel investor",
  },
  {
    name: "Sophie Chen",
    role: "INNOVATION ADVISOR",
    img: member4,
    bio: "Innovation strategist",
  },
];

const categories = [
  { id: "stakeholders", label: "Stakeholders", icon: Users },
  { id: "partners", label: "Partners", icon: Handshake },
  { id: "advisors", label: "Advisors", icon: Award },
];

export default function Stakeholders() {
  const [activeCategory, setActiveCategory] = useState("stakeholders");
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

  const getCurrentTeam = () => {
    if (activeCategory === "stakeholders") return stakeholders;
    if (activeCategory === "partners") return partners;
    return advisors;
  };

  const team = getCurrentTeam();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="team"
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
        {/* Section Header */}
        <div
          className={`mb-12 text-center transition-all duration-1000 sm:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-4 inline-block">
            <span className="rounded-full border border-[#91BF48]/25 bg-[#91BF48]/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#4b7a16] shadow-sm backdrop-blur-sm dark:border-[#24375a]/50 dark:bg-[#24375a]/30 dark:text-[#91BF48]">
              Our People
            </span>
          </div>

          <h2 className="mb-5 text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Our{" "}
            <span className="bg-gradient-to-r from-[#24375a] via-[#4a5f8a] to-[#91BF48] bg-clip-text text-transparent">
              Team
            </span>
          </h2>

          <p className="mx-auto max-w-3xl px-4 text-base leading-relaxed text-slate-600 dark:text-gray-400 sm:text-lg md:text-xl">
            Meet the brilliant minds behind Tokilo Technologies, driving
            innovation and excellence.
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
                <IconComponent size={20} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {team.map((member, index) => (
            <div
              key={`${member.name}-${member.role}`}
              className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#24375a] hover:shadow-2xl hover:shadow-[#24375a]/10 dark:border-gray-800 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:hover:border-[#24375a] dark:hover:shadow-[#24375a]/20 ${
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
              {/* Image Section */}
              <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-gray-800">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"></div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#24375a]/90 via-[#24375a]/50 to-transparent p-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <p className="translate-y-4 text-sm leading-relaxed text-white transition-transform duration-500 group-hover:translate-y-0">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="mb-2 text-2xl font-black text-slate-950 transition-colors duration-300 group-hover:text-[#24375a] dark:text-white dark:group-hover:text-[#91BF48]">
                  {member.name}
                </h3>

                <p className="mb-4 text-sm font-black uppercase tracking-wider text-slate-500 dark:text-gray-400">
                  {member.role}
                </p>

                <div className="h-1 w-0 rounded-full bg-gradient-to-r from-[#24375a] to-[#91BF48] transition-all duration-500 group-hover:w-full"></div>
              </div>
            </div>
          ))}
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
                Want to Join Our Mission?
              </h3>

              <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base md:text-lg">
                We are always looking for talented individuals who share our
                passion for innovation.
              </p>

              <button
                type="button"
                onClick={scrollToContact}
                className="rounded-full bg-white px-6 py-3 text-base font-black text-[#24375a] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100 sm:px-8 sm:py-4 sm:text-lg"
              >
                Join Our Team
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