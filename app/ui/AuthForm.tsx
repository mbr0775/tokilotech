"use client";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, ShieldCheck, UserPlus } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./editorial.module.css";
import ui from "../design.module.css";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const register = mode === "register";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(!register);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (register) return;
    let active = true;
    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!active) return;
        if (data.user) {
          router.replace(
            data.user.email?.toLowerCase() === "mubassirnasar@gmail.com"
              ? "/admin/projects/add"
              : "/",
          );
          router.refresh();
        }
      })
      .catch(() => {
        if (active)
          setError(
            "Unable to check your session. You can try signing in below.",
          );
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [register, router]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);
    try {
      if (register) {
        const { data, error: cause } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`,
            data: { full_name: name.trim() },
          },
        });
        if (cause) throw cause;
        if (data.session) {
          router.replace("/");
          router.refresh();
        } else {
          setMessage(
            "Please check your email to confirm your account. You can then sign in on the website or mobile app.",
          );
          setName("");
          setEmail("");
          setPassword("");
        }
      } else {
        const { data, error: cause } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (cause) throw cause;
        router.replace(
          data.user?.email?.toLowerCase() === "mubassirnasar@gmail.com"
            ? "/admin/projects/add"
            : "/",
        );
        router.refresh();
      }
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to continue. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className={styles.auth}>
      <div className={styles.authArt}>
        <span className={ui.eyebrow}>Tokilo / Your account</span>
        <h1>
          {register ? "Your next chapter." : "Welcome back."}
          <span>{register ? "Starts here." : "Let's get to work."}</span>
        </h1>
        <p>
          {register
            ? "Create your Tokilo account with your name, email, and a secure password."
            : "Sign in to your Tokilo account. Project administrators can continue to the showcase workspace."}
        </p>
        <div className={styles.authGlyph} aria-hidden="true">
          <ShieldCheck size={80} strokeWidth={1} />
        </div>
        <span className={ui.eyebrow}>CONNECTED. CONSIDERED. TOKILO.</span>
      </div>
      <form
        className={styles.formPanel}
        onSubmit={submit}
        aria-busy={busy || checking}
      >
        <h2>{register ? "Create an account" : "Sign in"}</h2>
        <p>
          {register
            ? "A few details and you're ready to begin."
            : "Use the email and password for your account."}
        </p>
        <div className={ui.fields}>
          {register && (
            <label className={ui.field}>
              Full name
              <input
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
              />
            </label>
          )}
          <label className={ui.field}>
            Email address
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>
          <label className={`${ui.field} ${styles.password}`}>
            Password
            <input
              name="password"
              type={show ? "text" : "password"}
              autoComplete={register ? "new-password" : "current-password"}
              minLength={register ? 6 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={register ? "At least 6 characters" : "Your password"}
            />
            <button
              type="button"
              aria-label={show ? "Hide password" : "Show password"}
              aria-pressed={show}
              onClick={() => setShow((v) => !v)}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>
        </div>
        {error && (
          <p role="alert" className={styles.message}>
            {error}
          </p>
        )}
        {message && (
          <p role="status" className={styles.message}>
            {message}
          </p>
        )}
        <button type="submit" disabled={busy || checking} className={ui.submit}>
          {register ? <UserPlus size={17} /> : <LogIn size={17} />}
          {checking
            ? "Checking your session…"
            : busy
              ? "Please wait…"
              : register
                ? "Create account"
                : "Sign in"}
        </button>
        <div className={styles.authLinks}>
          <p>
            {register ? "Already have an account?" : "New to Tokilo?"}{" "}
            <Link href={register ? "/login" : "/register"}>
              {register ? "Sign in" : "Create an account"}
            </Link>
          </p>
          {!register && (
            <a href="mailto:mubassirnasar@gmail.com?subject=Account%20sign-in%20help">
              Need help signing in?
            </a>
          )}
          {register && (
            <p>
              Read our <Link href="/privacy-policy">privacy policy</Link> and{" "}
              <Link href="/terms-and-conditions">terms and conditions</Link>.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
