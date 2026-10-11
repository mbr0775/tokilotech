import type { Metadata } from "next";
import PublicShell from "../ui/PublicShell";
import AuthForm from "../ui/AuthForm";
export const metadata: Metadata = {
  title: "Sign In | Tokilo Technologies",
  description: "Sign in to your Tokilo Technologies account.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};
export default function LoginPage() {
  return (
    <PublicShell>
      <AuthForm mode="login" />
    </PublicShell>
  );
}
