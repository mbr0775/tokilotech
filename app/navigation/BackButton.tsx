"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ className, showLabel = false }: { className?: string; showLabel?: boolean }) {
  const router = useRouter();
  return (
    <button type="button" className={className} aria-label="Go back" title="Go back"
      onClick={() => window.history.length > 1 ? router.back() : router.push("/")}>
      <ArrowLeft size={18} aria-hidden="true" />
      {showLabel && <span>Back</span>}
    </button>
  );
}
