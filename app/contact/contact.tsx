"use client";

import {
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";

const currentYear = 2026;

export default function Contact() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div
      id="contact"
      className="relative flex flex-col overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white text-slate-950 transition-colors duration-500 dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-white"
    >
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#24375a]/10 blur-3xl animate-pulse dark:bg-[#24375a]/20 md:h-96 md:w-96"></div>

        <div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#91BF48]/10 blur-3xl animate-pulse dark:bg-[#91BF48]/10 md:h-96 md:w-96"
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className="absolute left-1/2 top-1/2 h-48 w-48 rounded-full bg-[#4a5f8a]/10 blur-3xl animate-pulse dark:bg-[#4a5f8a]/15 md:h-64 md:w-64"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="contact-grid pointer-events-none absolute inset-0 opacity-70 dark:opacity-100"></div>

      {/* Contact Section */}
      <section className="relative flex flex-1 items-center justify-center px-4 pb-20 pt-24 sm:px-6 md:px-8 lg:px-16">
        <div className="relative z-10 w-full max-w-6xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-[#91BF48]/25 bg-[#91BF48]/10 px-4 py-2 text-sm font-black uppercase tracking-wider text-[#4b7a16] shadow-sm backdrop-blur-sm dark:border-[#24375a]/50 dark:bg-[#24375a]/30 dark:text-[#91BF48]">
            <Send size={16} className="animate-pulse" />
            Get in Touch
          </div>

          {/* Main Heading */}
          <h2 className="mb-6 animate-fade-in text-4xl font-black leading-[1.1] tracking-tight animation-delay-200 sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-slate-950 dark:text-white">LETS</span>
            <br />
            <span className="animate-gradient bg-gradient-to-r from-[#24375a] via-[#4a5f8a] to-[#91BF48] bg-clip-text text-transparent">
              CONNECT
            </span>
          </h2>

          {/* Subheading */}
          <p className="mx-auto mb-12 max-w-2xl animate-fade-in text-base leading-relaxed text-slate-600 animation-delay-400 dark:text-gray-400 sm:text-lg md:mb-16 md:text-xl">
            Reach out to discuss how our{" "}
            <span className="font-bold text-[#91BF48]">
              AI-powered solutions
            </span>{" "}
            can transform your business.
          </p>

          {/* Contact Content */}
          <div className="grid gap-8 animate-fade-in animation-delay-600 md:grid-cols-2 md:gap-12">
            {/* Contact Info */}
            <div className="space-y-5 text-left sm:space-y-6">
              <div className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#24375a] hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-[#91BF48]">
                <div className="flex items-start gap-4">
                  <div className="rounded-full border border-slate-200 bg-slate-50 p-3 transition-all duration-300 group-hover:border-[#91BF48] dark:border-gray-700 dark:bg-gray-800/60">
                    <Mail size={24} className="text-[#91BF48]" />
                  </div>

                  <div>
                    <h3 className="mb-1 font-black text-slate-950 dark:text-white">
                      Email
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400 sm:text-base">
                      info@tokilotech.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#24375a] hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-[#91BF48]">
                <div className="flex items-start gap-4">
                  <div className="rounded-full border border-slate-200 bg-slate-50 p-3 transition-all duration-300 group-hover:border-[#91BF48] dark:border-gray-700 dark:bg-gray-800/60">
                    <Phone size={24} className="text-[#91BF48]" />
                  </div>

                  <div>
                    <h3 className="mb-1 font-black text-slate-950 dark:text-white">
                      Phone
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400 sm:text-base">
                      +94 77 123 4567
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#24375a] hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-[#91BF48]">
                <div className="flex items-start gap-4">
                  <div className="rounded-full border border-slate-200 bg-slate-50 p-3 transition-all duration-300 group-hover:border-[#91BF48] dark:border-gray-700 dark:bg-gray-800/60">
                    <MapPin size={24} className="text-[#91BF48]" />
                  </div>

                  <div>
                    <h3 className="mb-1 font-black text-slate-950 dark:text-white">
                      Address
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400 sm:text-base">
                      Tokilo Technologies
                      <br />
                      Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-slate-200 bg-white p-5 text-left shadow-xl shadow-slate-200/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20 sm:p-6"
            >
              <div className="mb-5">
                <h3 className="text-2xl font-black text-slate-950 dark:text-white">
                  Send a Message
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">
                  Tell us about your project or idea. We will get back to you
                  soon.
                </p>
              </div>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-full border border-slate-300 bg-white px-6 py-4 text-slate-950 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-full border border-slate-300 bg-white px-6 py-4 text-slate-950 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500"
                />

                <textarea
                  placeholder="Your Message"
                  className="h-40 w-full resize-none rounded-3xl border border-slate-300 bg-white px-6 py-4 text-slate-950 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-500"
                />

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-8 py-4 font-black text-white shadow-lg shadow-[#24375a]/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#24375a]/40"
                >
                  Send Message
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute left-10 top-1/4 h-20 w-20 rotate-12 animate-float rounded-lg border-2 border-[#24375a]/15 dark:border-[#24375a]/30"></div>

          <div className="absolute right-10 top-1/3 h-16 w-16 animate-float-delayed rounded-full border-2 border-[#91BF48]/25 dark:border-[#91BF48]/30"></div>

          <div className="absolute bottom-1/4 left-20 h-12 w-12 rotate-45 animate-float rounded-lg bg-gradient-to-br from-[#24375a]/10 to-[#4a5f8a]/10 dark:from-[#24375a]/20 dark:to-[#4a5f8a]/20"></div>

          <div className="absolute bottom-1/3 right-20 h-24 w-24 rotate-6 animate-float-delayed rounded-lg border-2 border-[#4a5f8a]/20 dark:border-[#4a5f8a]/30"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-200 bg-white/95 py-12 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {/* Company Info */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center group">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#24375a] to-[#4a5f8a] opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-75"></div>

                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#24375a] to-[#4a5f8a] transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="h-6 w-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                </div>

                <div className="ml-3">
                  <div className="text-lg font-black tracking-wide text-slate-950 transition-colors duration-300 group-hover:text-[#91BF48] dark:text-white">
                    TOKILO TECHNOLOGIES
                  </div>

                  <div className="text-xs font-medium tracking-wider text-[#91BF48]">
                    AI & SOFTWARE SOLUTIONS
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                Harnessing AI to drive innovation and transform businesses
                worldwide.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Follow Us
              </h3>

              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  aria-label="Twitter"
                  className="rounded-full border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:border-[#91BF48] hover:bg-white dark:border-gray-700 dark:bg-gray-800/60 dark:hover:bg-gray-800"
                >
                  <Twitter size={20} className="text-[#91BF48]" />
                </a>

                <a
                  href="https://linkedin.com"
                  aria-label="LinkedIn"
                  className="rounded-full border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:border-[#91BF48] hover:bg-white dark:border-gray-700 dark:bg-gray-800/60 dark:hover:bg-gray-800"
                >
                  <Linkedin size={20} className="text-[#91BF48]" />
                </a>

                <a
                  href="https://github.com"
                  aria-label="GitHub"
                  className="rounded-full border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:border-[#91BF48] hover:bg-white dark:border-gray-700 dark:bg-gray-800/60 dark:hover:bg-gray-800"
                >
                  <Github size={20} className="text-[#91BF48]" />
                </a>

                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="rounded-full border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:border-[#91BF48] hover:bg-white dark:border-gray-700 dark:bg-gray-800/60 dark:hover:bg-gray-800"
                >
                  <Facebook size={20} className="text-[#91BF48]" />
                </a>
              </div>
            </div>

            {/* Partners */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Our Partners
              </h3>

              <div className="flex flex-wrap gap-3">
                {["Google Cloud", "AWS", "Microsoft Azure", "OpenAI"].map(
                  (partner) => (
                    <div
                      key={partner}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors duration-300 hover:text-[#91BF48] dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300"
                    >
                      {partner}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-gray-800 dark:text-gray-500 md:flex-row">
            <div>
              © {currentYear} Tokilo Technologies. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              <a
                href="/privacy"
                className="transition-colors duration-300 hover:text-[#91BF48]"
              >
                Privacy Policy
              </a>

              <a
                href="/terms"
                className="transition-colors duration-300 hover:text-[#91BF48]"
              >
                Terms of Service
              </a>

              <a
                href="/cookies"
                className="transition-colors duration-300 hover:text-[#91BF48]"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

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

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .contact-grid {
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

        :global(html.dark) .contact-grid {
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
    </div>
  );
}