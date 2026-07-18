"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Compass,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const principles = [
  {
    icon: Compass,
    number: "01",
    title: "Understand the real problem",
    description:
      "We begin with your users, business goals, and operational challenges before choosing the technology.",
  },
  {
    icon: Layers3,
    number: "02",
    title: "Design the right system",
    description:
      "We turn requirements into a clear product experience, dependable architecture, and practical delivery plan.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Build, launch, and improve",
    description:
      "We deliver in focused stages, test carefully, and keep improving the product after launch.",
  },
];

const strengths = [
  {
    icon: Code2,
    title: "Product-minded engineering",
    description:
      "Web, mobile, backend, and cloud systems designed around real business outcomes.",
  },
  {
    icon: BrainCircuit,
    title: "Practical AI",
    description:
      "Intelligent automation and data-driven features that solve useful, measurable problems.",
  },
  {
    icon: ShieldCheck,
    title: "Built for growth",
    description:
      "Maintainable foundations that can evolve as your users, team, and operations expand.",
  },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden bg-[#f8fafc] px-5 py-20 text-slate-950 transition-colors duration-300 dark:bg-[#0a0f1c] dark:text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32 xl:px-14"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#91BF48]/10 blur-3xl dark:bg-[#91BF48]/[0.08]" />
        <div className="absolute -left-28 bottom-16 h-72 w-72 rounded-full bg-[#17233d]/[0.08] blur-3xl dark:bg-white/[0.04]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(23,35,61,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(23,35,61,0.035)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_80%,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Main story */}
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#91BF48]/35 bg-[#91BF48]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#5e8728] dark:text-[#b8dc82]">
              <Sparkles size={15} aria-hidden="true" />
              About Tokilo
            </div>

            <h2 className="mt-7 max-w-3xl text-[clamp(2.6rem,5vw,5.25rem)] font-black leading-[0.96] tracking-[-0.06em] text-[#17233d] dark:text-white">
              Technology should make
              <span className="mt-2 block font-serif font-medium italic tracking-[-0.045em] text-[#91BF48]">
                growth feel simpler.
              </span>
            </h2>

            <div className="mt-7 max-w-2xl space-y-5 text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">
              <p>
                Tokilo Technologies is an emerging software and AI company
                creating digital products for startups, small businesses, and
                growing brands.
              </p>

              <p>
                We combine product thinking, user-focused design, and dependable
                engineering to build websites, mobile applications, backend
                systems, automation tools, and intelligent software that solve
                real operational problems.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#17233d] px-6 text-sm font-black text-white shadow-[0_14px_35px_rgba(23,35,61,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#213151] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#17233d]/20 dark:bg-[#91BF48] dark:text-[#17233d] dark:hover:bg-[#9dcc52]"
              >
                See what we build
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/75 px-6 text-sm font-black text-[#17233d] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#17233d] hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
              >
                Talk to our team
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Process visual */}
          <div
            className={`relative transition-all delay-150 duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#91BF48] opacity-90 sm:h-48 sm:w-48" />
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rotate-12 rounded-[1.8rem] border border-[#17233d]/10 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-white/5" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#17233d] p-5 shadow-[0_35px_90px_rgba(23,35,61,0.22)] sm:p-7 lg:p-8">
              <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#91BF48]/15 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.17em] text-[#b8dc82]">
                      Our delivery approach
                    </p>
                    <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl">
                      From idea to useful product
                    </h3>
                  </div>

                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#91BF48] text-[#17233d] sm:flex">
                    <Workflow size={24} aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {principles.map((principle) => {
                    const Icon = principle.icon;

                    return (
                      <article
                        key={principle.number}
                        className="group grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.055] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#91BF48]/40 hover:bg-white/[0.085] sm:p-5"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#91BF48] text-[#17233d] shadow-lg shadow-black/10">
                          <Icon size={22} aria-hidden="true" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <h4 className="text-base font-black text-white sm:text-lg">
                              {principle.title}
                            </h4>
                            <span className="text-xs font-black tracking-[0.12em] text-white/35">
                              {principle.number}
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-medium leading-6 text-slate-300">
                            {principle.description}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#91BF48]/25 bg-[#91BF48]/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      size={21}
                      className="shrink-0 text-[#b8dc82]"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-bold text-white">
                      Clear communication throughout every stage.
                    </p>
                  </div>

                  <span className="text-xs font-black uppercase tracking-[0.13em] text-[#b8dc82]">
                    MBR Group company
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths */}
        <div
          className={`mt-16 grid gap-4 transition-all delay-300 duration-1000 sm:mt-20 md:grid-cols-3 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {strengths.map((strength) => {
            const Icon = strength.icon;

            return (
              <article
                key={strength.title}
                className="group rounded-[1.6rem] border border-slate-200 bg-white/80 p-6 shadow-[0_12px_35px_rgba(23,35,61,0.055)] backdrop-blur-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#91BF48]/45 hover:shadow-[0_20px_50px_rgba(23,35,61,0.10)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#91BF48]/15 text-[#688f31] transition duration-300 group-hover:bg-[#91BF48] group-hover:text-[#17233d] dark:text-[#b8dc82]">
                  <Icon size={23} aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-xl font-black tracking-[-0.025em] text-[#17233d] dark:text-white">
                  {strength.title}
                </h3>

                <p className="mt-3 text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">
                  {strength.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          section *,
          section *::before,
          section *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
