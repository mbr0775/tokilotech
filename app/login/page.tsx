"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const ADMIN_EMAIL = "mubassirnasar@gmail.com";
const ADMIN_PROJECT_ADD_ROUTE = "/admin/projects/add";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const redirectExistingSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      if (user?.email?.toLowerCase() === ADMIN_EMAIL) {
        router.replace(ADMIN_PROJECT_ADD_ROUTE);
        router.refresh();
        return;
      }

      setCheckingSession(false);
    };

    redirectExistingSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    setError("");
    setLoading(true);

    try {
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

      if (signInError) {
        throw signInError;
      }

      const signedInEmail = data.user?.email?.toLowerCase();

      if (signedInEmail === ADMIN_EMAIL) {
        router.replace(ADMIN_PROJECT_ADD_ROUTE);
        router.refresh();
        return;
      }

      // A valid non-admin account can continue to the public website.
      router.replace("/");
      router.refresh();
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-5 dark:bg-[#08101F]">
        <div className="rounded-2xl bg-white px-6 py-4 font-bold text-[#17233d] shadow-xl dark:bg-[#0b1120] dark:text-white">
          Checking your session...
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-5 dark:bg-[#08101F]">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_rgba(23,35,61,0.18)] dark:bg-[#0b1120] lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[#17233d] p-12 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#91BF48]/20 blur-3xl" />

          <div>
            <div className="inline-flex rounded-2xl bg-white p-3">
              <Image
                src="/tokilotechlogo.png"
                width={220}
                height={60}
                alt="Tokilo Technologies"
                className="h-12 w-auto object-contain"
                priority
              />
            </div>

            <h1 className="mt-12 text-5xl font-black leading-tight text-white">
              Build smarter
              <span className="block text-[#91BF48]">digital solutions</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
              Welcome to Tokilo Technologies. Create intelligent software, AI
              solutions, and scalable digital products.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "AI Powered Development",
              "Web & Mobile Applications",
              "Cloud Technology",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white">
                <Sparkles className="text-[#91BF48]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-4xl font-black text-[#17233d] dark:text-white">
                Welcome back
              </h2>
              <p className="mt-3 text-slate-500 dark:text-slate-300">
                Login to continue your Tokilo journey.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-[#17233d] dark:text-white"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 outline-none focus:border-[#91BF48] dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-[#17233d] dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-12 outline-none focus:border-[#91BF48] dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600 dark:bg-red-950/40 dark:text-red-300"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#91BF48] py-4 font-black text-[#17233d] transition hover:bg-[#9dcc52] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Login"}
                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="mt-6 w-full text-center text-sm font-bold text-[#17233d] hover:text-[#91BF48] dark:text-white"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
