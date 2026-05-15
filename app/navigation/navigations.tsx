"use client";

import { useEffect, useState } from "react";
import {
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserCircle,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { useTheme } from "../theme-provider";
import { supabase } from "../../lib/supabaseClient";

export default function Navigation() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getLoggedUser = async () => {
      const { data } = await supabase.auth.getUser();
      setLoggedUser(data.user);
    };

    getLoggedUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getUserDisplayName = () => {
    if (!loggedUser) {
      return "";
    }

    const fullName = loggedUser.user_metadata?.full_name;

    if (fullName) {
      return fullName;
    }

    return loggedUser.email?.split("@")[0] || "User";
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const goToLogin = () => {
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLoggedUser(null);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-white/95 text-slate-900 shadow-lg shadow-[#24375a]/10 border-b border-slate-200 backdrop-blur-md dark:bg-gray-900/95 dark:text-white dark:border-gray-800 dark:shadow-[#24375a]/20"
          : "bg-transparent text-slate-900 dark:text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center group cursor-pointer text-left"
            aria-label="Go to home"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#24375a] to-[#4a5f8a] rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>

              <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#24375a] to-[#4a5f8a] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
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
              <div className="font-bold text-sm sm:text-lg tracking-wide group-hover:text-[#91BF48] transition-colors duration-300">
                TOKILO TECHNOLOGIES
              </div>
              <div className="text-[#91BF48] text-[10px] sm:text-xs tracking-wider font-medium">
                AI & SOFTWARE SOLUTIONS
              </div>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.href.substring(1));
                }}
                className="text-slate-700 dark:text-gray-300 font-semibold text-sm tracking-wide hover:text-[#24375a] dark:hover:text-white transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#24375a] to-[#91BF48] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            {loggedUser ? (
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-bold text-slate-800 shadow-sm dark:border-gray-700 dark:bg-gray-900/80 dark:text-white">
                  <UserCircle size={17} />
                  {getUserDisplayName()}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/30"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={goToLogin}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-800 transition hover:scale-105 hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-700 dark:text-white dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
              >
                <LogIn size={16} />
                Login
              </button>
            )}

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2.5 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-[#24375a]/40 transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-900 dark:text-white hover:text-[#91BF48] transition-colors duration-300"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen
              ? "max-h-[44rem] opacity-100 mt-6"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 py-4 border-t border-slate-200 dark:border-gray-800">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.href.substring(1));
                }}
                className="text-slate-700 dark:text-gray-300 font-semibold text-sm tracking-wide hover:text-[#24375a] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800/50 px-4 py-2 rounded-lg transition-all duration-300"
                style={{
                  animation: isMobileMenuOpen
                    ? `fadeInUp 0.3s ease-out ${index * 0.08}s both`
                    : "none",
                }}
              >
                {link.name}
              </a>
            ))}

            {loggedUser ? (
              <div
                className="mx-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-800/60"
                style={{
                  animation: isMobileMenuOpen
                    ? `fadeInUp 0.3s ease-out ${navLinks.length * 0.08}s both`
                    : "none",
                }}
              >
                <div className="mb-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <UserCircle size={18} />
                  {getUserDisplayName()}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50 dark:border-red-900/60 dark:hover:bg-red-950/30"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={goToLogin}
                className="mx-4 inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-2.5 text-sm font-bold text-slate-800 transition hover:border-[#24375a] hover:text-[#24375a] dark:border-gray-700 dark:text-white dark:hover:border-[#91BF48] dark:hover:text-[#91BF48]"
                style={{
                  animation: isMobileMenuOpen
                    ? `fadeInUp 0.3s ease-out ${navLinks.length * 0.08}s both`
                    : "none",
                }}
              >
                <LogIn size={16} />
                Login
              </button>
            )}

            <div
              className="mx-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-gray-800 dark:bg-gray-800/60"
              style={{
                animation: isMobileMenuOpen
                  ? `fadeInUp 0.3s ease-out ${(navLinks.length + 1) * 0.08}s both`
                  : "none",
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Theme
                  </p>
                  <p className="text-xs text-slate-500 dark:text-gray-400">
                    Current: {theme === "dark" ? "Dark" : "Light"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:scale-105 dark:bg-gray-950 dark:text-white dark:ring-gray-700"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2.5 bg-gradient-to-r from-[#24375a] to-[#4a5f8a] text-white rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-[#24375a]/50 transition-all duration-300 mx-4"
              style={{
                animation: isMobileMenuOpen
                  ? `fadeInUp 0.3s ease-out ${(navLinks.length + 2) * 0.08}s both`
                  : "none",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}