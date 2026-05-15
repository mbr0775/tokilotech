"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const ADMIN_EMAIL = "mubassirnasar@gmail.com";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = email.trim().toLowerCase();

    setError("");

    if (!enteredEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: enteredEmail,
      password,
    });

    setIsLoading(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    if (enteredEmail === ADMIN_EMAIL) {
      router.push("/admin/projects");
      return;
    }

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 dark:bg-gray-950 dark:text-white sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center justify-center">
        <div className="w-full">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#24375a] dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Website
          </button>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900 sm:p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#24375a] to-[#4a5f8a] text-white shadow-lg shadow-[#24375a]/20">
                <Lock size={30} />
              </div>

              <h1 className="text-3xl font-black sm:text-4xl">
                Login Account
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                Login to access Tokilo Technologies updates and project features.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Mail size={16} />
                  Email Address
                </span>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-slate-950 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <Lock size={16} />
                  Password
                </span>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 pr-14 text-slate-950 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-[#24375a] dark:text-gray-400 dark:hover:text-white"
                    aria-label="Show or hide password"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </label>

              {error && (
                <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-5 py-4 font-black text-white shadow-lg shadow-[#24375a]/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm text-slate-600 dark:text-gray-400">
                No account yet?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="font-bold text-[#24375a] hover:underline dark:text-[#91BF48]"
                >
                  Register here
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}