"use client";

import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Layers3,
  Sparkles,
} from "lucide-react";

const capabilities = [
  "Web & mobile products",
  "AI-powered automation",
  "Scalable cloud systems",
];

export default function HomeScreen() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative isolate min-h-[760px] overflow-hidden bg-[#91BF48] pt-24 text-slate-950 dark:bg-[#789f3f] dark:text-white lg:min-h-screen lg:pt-0"
    >
      {/* Desktop organic white panel */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 1440 820"
        preserveAspectRatio="none"
      >
        <path
          className="fill-[#f8fafc] dark:fill-[#0a0f1c]"
          d="M0 0H825C840 96 834 166 792 229C744 301 700 348 722 402C747 462 868 472 936 520C1007 570 1032 657 1108 718C1157 757 1210 789 1266 820H0V0Z"
        />
      </svg>

      {/* Mobile light background area */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-[#f8fafc] dark:bg-[#0a0f1c] lg:hidden" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 lg:min-h-screen lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:px-10 lg:pb-8 lg:pt-28 xl:px-14">
        {/* Left content */}
        <div className="max-w-2xl animate-hero-copy lg:pb-14">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#91BF48]/35 bg-[#91BF48]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#527b1f] dark:border-[#91BF48]/35 dark:bg-[#91BF48]/10 dark:text-[#b8dc82]">
            <Sparkles size={15} aria-hidden="true" />
            Software & AI Partner
          </div>

          <h1 className="max-w-[760px] text-[clamp(3.25rem,6vw,6.6rem)] font-black leading-[0.92] tracking-[-0.065em] text-[#16213a] dark:text-white">
            We build digital
            <span className="mt-2 block font-serif font-medium italic tracking-[-0.055em] text-[#91BF48]">
              products that grow.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">
            Tokilo Technologies creates modern websites, mobile applications,
            intelligent automation, and dependable software systems for
            ambitious businesses.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#91BF48] px-6 text-sm font-black text-[#17233d] shadow-[0_14px_30px_rgba(145,191,72,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#9dcc52] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#91BF48]/30"
            >
              Explore our projects
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 text-sm font-black text-[#17233d] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#17233d] hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/40 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:border-white/50 dark:hover:bg-white/10"
            >
              Start a project
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
            {capabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300"
              >
                <CheckCircle2
                  size={18}
                  className="shrink-0 text-[#91BF48]"
                  aria-hidden="true"
                />
                {capability}
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="relative mx-auto flex w-full max-w-[650px] items-center justify-center pb-4 pt-12 sm:pt-16 lg:min-h-[680px] lg:pb-0 lg:pt-10">
          <div className="absolute left-[6%] top-[14%] h-28 w-28 rounded-full border border-white/40" />
          <div className="absolute bottom-[15%] right-[5%] h-16 w-16 rotate-12 rounded-[1.35rem] border border-[#17233d]/15 bg-white/20 backdrop-blur" />
          <div className="absolute right-[10%] top-[7%] h-5 w-5 rounded-full bg-white/[0.08]5 shadow-lg" />

          <div className="relative w-full animate-hero-visual">
            {/* Main browser/product card */}
            <div className="relative mx-auto w-[88%] overflow-hidden rounded-[2rem] border border-white/[0.55] bg-white/[0.92] p-3 shadow-[0_35px_90px_rgba(23,35,61,0.25)] backdrop-blur-xl sm:p-4 lg:w-[86%] dark:border-white/20 dark:bg-[#10192b]/95">
              <div className="rounded-[1.45rem] border border-slate-200 bg-[#f8fafc] p-4 sm:p-5 dark:border-white/10 dark:bg-[#0b1220]">
                <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#17233d] shadow-md">
                      <Image
                        src="/tokilotechlogo.png"
                        alt="Tokilo Technologies"
                        width={34}
                        height={34}
                        className="h-8 w-8 object-contain"
                        priority
                      />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#17233d] dark:text-white">
                        Tokilo Workspace
                      </p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Product delivery dashboard
                      </p>
                    </div>
                  </div>
                  <div className="hidden rounded-full bg-[#91BF48]/15 px-3 py-1.5 text-[11px] font-black text-[#557c23] sm:block dark:text-[#b9dd82]">
                    Live project
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
                  <div className="rounded-2xl bg-[#17233d] p-5 text-white shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/[0.55]">
                          Delivery progress
                        </p>
                        <p className="mt-2 text-4xl font-black tracking-tight">
                          84%
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#91BF48] text-[#17233d]">
                        <Layers3 size={24} aria-hidden="true" />
                      </div>
                    </div>

                    <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/15">
                      <div className="h-full w-[84%] rounded-full bg-[#91BF48]" />
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-white/[0.08] p-3">
                        <p className="text-[11px] font-semibold text-white/[0.55]">
                          Features
                        </p>
                        <p className="mt-1 text-lg font-black">24</p>
                      </div>
                      <div className="rounded-xl bg-white/[0.08] p-3">
                        <p className="text-[11px] font-semibold text-white/[0.55]">
                          Sprint
                        </p>
                        <p className="mt-1 text-lg font-black">06</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#91BF48]/15 text-[#6f982f] dark:text-[#b8dc82]">
                        <BrainCircuit size={21} aria-hidden="true" />
                      </div>
                      <p className="mt-4 text-sm font-black text-[#17233d] dark:text-white">
                        AI automation
                      </p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">
                        Faster workflows with intelligent tools.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#17233d]/[0.08] text-[#17233d] dark:bg-white/10 dark:text-white">
                        <Code2 size={21} aria-hidden="true" />
                      </div>
                      <p className="mt-4 text-sm font-black text-[#17233d] dark:text-white">
                        Product engineering
                      </p>
                      <p className="mt-1 text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">
                        Reliable web, mobile, and backend delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating project card */}
            <div className="absolute -bottom-8 left-0 hidden w-52 rounded-2xl border border-white/[0.60] bg-white/[0.95] p-4 shadow-[0_20px_50px_rgba(23,35,61,0.2)] backdrop-blur-xl sm:block dark:border-white/15 dark:bg-[#10192b]/95">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#91BF48] text-[#17233d]">
                  <Sparkles size={21} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Built for growth
                  </p>
                  <p className="text-sm font-black text-[#17233d] dark:text-white">
                    Fast. Smart. Scalable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-copy {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-visual {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-hero-copy {
          animation: hero-copy 800ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .animate-hero-visual {
          animation: hero-visual 900ms 120ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-hero-copy,
          .animate-hero-visual {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
