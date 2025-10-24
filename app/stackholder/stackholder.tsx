'use client';

import { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Users, Handshake, Award } from 'lucide-react';
import member1 from '../../public/mubassir.png';
import member2 from '../../public/mubassir2.jpg';
import member3 from '../../public/mubassir3.jpg';
import member4 from '../../public/mubassir.png';
import member5 from '../../public/mubassir2.jpg';
import member6 from '../../public/mubassir.png';
import member7 from '../../public/mubassir2.jpg';
import member8 from '../../public/mubassir.png';

interface TeamMember {
  name: string;
  role: string;
  img: StaticImageData;
  bio?: string;
}

const stakeholders: TeamMember[] = [
  { 
    name: 'Abul Naser Mubassir', 
    role: 'FOUNDER & CEO', 
    img: member1,
    bio: 'Visionary leader driving AI innovation'
  },
  { 
    name: 'Sarah Johnson', 
    role: 'CTO', 
    img: member2,
    bio: 'Tech expert leading development'
  },
  { 
    name: 'Michael Chen', 
    role: 'HEAD OF AI', 
    img: member3,
    bio: 'Machine learning specialist'
  },
  { 
    name: 'Emily Rodriguez', 
    role: 'PRODUCT DIRECTOR', 
    img: member4,
    bio: 'Driving product excellence'
  },
  { 
    name: 'David Kim', 
    role: 'LEAD DEVELOPER', 
    img: member5,
    bio: 'Full-stack expert'
  },
  { 
    name: 'Jessica Martinez', 
    role: 'UI/UX DESIGNER', 
    img: member6,
    bio: 'Creating amazing experiences'
  },
];

const partners: TeamMember[] = [
  { name: 'Tech Solutions Inc', role: 'STRATEGIC PARTNER', img: member1, bio: 'Cloud infrastructure solutions' },
  { name: 'Cloud Systems Ltd', role: 'TECHNOLOGY PARTNER', img: member2, bio: 'Enterprise cloud services' },
  { name: 'Data Analytics Co', role: 'INTEGRATION PARTNER', img: member3, bio: 'Big data solutions' },
  { name: 'Innovation Hub', role: 'BUSINESS PARTNER', img: member4, bio: 'Startup acceleration' },
  { name: 'AI Labs Global', role: 'RESEARCH PARTNER', img: member5, bio: 'AI research collaboration' },
  { name: 'DevOps Pro', role: 'INFRASTRUCTURE PARTNER', img: member6, bio: 'DevOps solutions' },
];

const advisors: TeamMember[] = [
  { name: 'Dr. James Wilson', role: 'AI ADVISOR', img: member7, bio: 'PhD in Machine Learning' },
  { name: 'Lisa Anderson', role: 'BUSINESS STRATEGY', img: member8, bio: '20+ years in tech' },
  { name: 'Robert Kim', role: 'TECHNOLOGY ADVISOR', img: member1, bio: 'Former CTO at Fortune 500' },
  { name: 'Maria Garcia', role: 'GROWTH ADVISOR', img: member2, bio: 'Scaling expert' },
  { name: 'Thomas Lee', role: 'INVESTMENT ADVISOR', img: member3, bio: 'VC and angel investor' },
  { name: 'Sophie Chen', role: 'INNOVATION ADVISOR', img: member4, bio: 'Innovation strategist' },
];

const categories = [
  { id: 'stakeholders', label: 'Stakeholders', icon: Users },
  { id: 'partners', label: 'Partners', icon: Handshake },
  { id: 'advisors', label: 'Advisors', icon: Award }
];

export default function Stakeholders() {
  const [activeCategory, setActiveCategory] = useState<string>('stakeholders');
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

  const getCurrentTeam = () => {
    if (activeCategory === 'stakeholders') return stakeholders;
    if (activeCategory === 'partners') return partners;
    return advisors;
  };

  const team = getCurrentTeam();

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden"
      id="team"
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
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24375a] to-[#4a5f8a]">Team</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Meet the brilliant minds behind Tokilo Technologies, driving innovation and excellence
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

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#24375a] transition-all duration-500 hover:shadow-2xl hover:shadow-[#24375a]/20 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
              }}
            >
              {/* Image Section */}
              <div className="aspect-square overflow-hidden bg-gray-800 relative">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#24375a]/90 via-[#24375a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <p className="text-white text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {member.bio}
                  </p>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#4a5f8a] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-4">
                  {member.role}
                </p>
                
                {/* Hover Effect Line */}
                <div className="h-1 w-0 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#24375a] to-[#4a5f8a] rounded-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Want to Join Our Mission?
              </h3>
              <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
                We are always looking for talented individuals who share our passion for innovation
              </p>
              <button className="px-8 py-4 bg-white text-[#24375a] rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
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
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}