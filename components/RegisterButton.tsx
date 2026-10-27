"use client";

import { ArrowRight } from "lucide-react";
import { BUILDVERSE as C } from "@/config/buildverse";
import { useRegistrationOpen } from "./useRegistrationOpen";

export function RegisterButton({ className = "", label = "Register Your Team" }: { className?: string; label?: string }) {
  const open = useRegistrationOpen();
  if (!open) {
    return <span className={`inline-flex items-center justify-center rounded-xl bg-violet-200 px-6 py-3 font-semibold text-violet-700 ${className}`}>Registration closed</span>;
  }
  return (
    <a
      href={C.registrationFormUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ${className}`}
    >
      {label} <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}
