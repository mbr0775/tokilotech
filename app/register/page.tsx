"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const ADMIN_EMAIL = "mubassirnasar@gmail.com";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = email.trim().toLowerCase();

    setMessage("");
    setError("");

    if (password.length < 6) {
      setError("Password must have at least 6 characters.");
      return;
    }

    setIsLoading(true);

    const role = enteredEmail === ADMIN_EMAIL ? "admin" : "user";

    const { error: signUpError } = await supabase.auth.signUp({
      email: enteredEmail,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setMessage(
      role === "admin"
        ? "Admin account created. Please check your email, then login."
        : "Account created successfully. Please check your email, then login."
    );

    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 dark:bg-gray-950 dark:text-white sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900 lg:grid-cols-2">
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#24375a] via-[#304a72] to-[#91BF48] p-10 text-white lg:block">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/20 blur-3xl"></div>

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                  <ShieldCheck size={34} />
                </div>

                <h1 className="mb-5 text-5xl font-black leading-tight">
                  Create Your Account
                </h1>

                <p className="max-w-md text-lg leading-relaxed text-white/80">
                  Register to access Tokilo Technologies updates, project
                  previews, and future client features.
                </p>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-sm font-semibold text-white/80">
                  Admin access is automatic for
                </p>
                <p className="mt-1 text-lg font-bold">{ADMIN_EMAIL}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[#24375a] dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Website
            </button>

            <div className="mb-8 text-center sm:text-left">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#24375a] to-[#4a5f8a] text-white sm:mx-0">
                <UserPlus size={30} />
              </div>

              <h2 className="text-3xl font-black sm:text-4xl">
                Register Account
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                Create your Tokilo Technologies account.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Full Name</span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-slate-950 outline-none transition focus:border-[#91BF48] dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />
              </label>

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
                    placeholder="Create password"
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

              {message && (
                <p className="rounded-2xl bg-green-50 p-4 text-sm font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-300">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-gradient-to-r from-[#24375a] to-[#4a5f8a] px-5 py-4 font-black text-white shadow-lg shadow-[#24375a]/20 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-slate-600 dark:text-gray-400">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="font-bold text-[#24375a] hover:underline dark:text-[#91BF48]"
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}