'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Building2, 
  MessageSquare,
  Send,
  CheckCircle,
  ArrowLeft,
  Linkedin,
  Twitter
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactSchedule() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        date: '',
        time: '',
        message: ''
      });
    }, 3000);
  };

  const timeSlots = [
    '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM',
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
  ];

  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Software Engineer',
      email: 'john@company.com',
      phone: '+1 (234) 567-8901',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Sarah Johnson',
      role: 'Designer',
      email: 'sarah@company.com',
      phone: '+1 (234) 567-8902',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Team Lead',
      email: 'michael@company.com',
      phone: '+1 (234) 567-8903',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      linkedin: '#',
      twitter: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden py-20 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24375a] rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#91BF48] rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Schedule a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24375a] to-[#91BF48]">Consultation</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Let's discuss how we can help transform your business with our innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information & Team Members */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#24375a]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-[#91BF48]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <a href="mailto:info@company.com" className="text-white hover:text-[#91BF48] transition-colors">
                      info@company.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#24375a]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-[#91BF48]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <a href="tel:+1234567890" className="text-white hover:text-[#91BF48] transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#24375a]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#91BF48]" size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Location</p>
                    <p className="text-white">
                      123 Tech Street<br />
                      Silicon Valley, CA 94000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold mb-6 text-white">Our Team</h2>
              
              <div className="space-y-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#24375a]/50 group-hover:border-[#91BF48] transition-all duration-300"
                        />
                        <div className="absolute inset-0 w-16 h-16 rounded-full bg-[#24375a]/0 group-hover:bg-[#24375a]/20 transition-all duration-300"></div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                        <p className="text-[#91BF48] text-sm mb-2">{member.role}</p>
                        
                        <div className="space-y-1">
                          <a 
                            href={`mailto:${member.email}`}
                            className="text-gray-400 text-xs hover:text-white transition-colors flex items-center gap-1"
                          >
                            <Mail size={12} />
                            {member.email}
                          </a>
                          <a 
                            href={`tel:${member.phone}`}
                            className="text-gray-400 text-xs hover:text-white transition-colors flex items-center gap-1"
                          >
                            <Phone size={12} />
                            {member.phone}
                          </a>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <a 
                            href={member.linkedin}
                            className="w-7 h-7 bg-[#24375a]/20 rounded-full flex items-center justify-center hover:bg-[#24375a] transition-colors"
                          >
                            <Linkedin size={14} className="text-gray-400 hover:text-white" />
                          </a>
                          <a 
                            href={member.twitter}
                            className="w-7 h-7 bg-[#24375a]/20 rounded-full flex items-center justify-center hover:bg-[#24375a] transition-colors"
                          >
                            <Twitter size={14} className="text-gray-400 hover:text-white" />
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {index < teamMembers.length - 1 && (
                      <div className="h-px bg-gray-800 mt-6"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <Clock className="text-[#91BF48]" size={24} />
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 border border-gray-800">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-500" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                  <p className="text-gray-400 text-lg">
                    We've received your consultation request. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">
                        <User className="inline mr-2" size={18} />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#91BF48] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">
                        <Mail className="inline mr-2" size={18} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#91BF48] transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">
                        <Phone className="inline mr-2" size={18} />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#91BF48] transition-colors"
                        placeholder="+1 (234) 567-890"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">
                        <Building2 className="inline mr-2" size={18} />
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#91BF48] transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">
                        <Calendar className="inline mr-2" size={18} />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#91BF48] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">
                        <Clock className="inline mr-2" size={18} />
                        Preferred Time *
                      </label>
                      <div className="relative">
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#91BF48] transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">
                      <MessageSquare className="inline mr-2" size={18} />
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#91BF48] transition-colors resize-none"
                      placeholder="Tell us more about your project or any specific requirements..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-[#24375a]/50 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    Schedule Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}