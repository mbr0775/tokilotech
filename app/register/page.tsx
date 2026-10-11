import type { Metadata } from "next";
import PublicShell from "../ui/PublicShell";
import AuthForm from "../ui/AuthForm";
export const metadata: Metadata = {
  title: "Create an Account | Tokilo Technologies",
  description: "Create a Tokilo Technologies account using your email address.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: true },
};
export default function RegisterPage() {
  return (
    <PublicShell>
      <AuthForm mode="register" />
    </PublicShell>
  );
}
