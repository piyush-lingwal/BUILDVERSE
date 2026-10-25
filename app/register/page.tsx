import type { Metadata } from "next";
import Link from "next/link";
import { BUILDVERSE as C } from "@/config/buildverse";
import { registrationState } from "@/lib/state";
import { Header, BvFooter } from "@/components/Sections";
import { RegisterForm } from "@/components/RegisterForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  const open = registrationState(Date.now(), C.registrationDeadline) === "open";
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold text-violet-950">Register your team</h1>
        <p className="mt-2 text-violet-950/75">{C.eligibility} Teams of {C.teamSize.min}–{C.teamSize.max}. Fee: ₹{C.feeInr} per team.</p>
        <div className="mt-8">
          {open ? <RegisterForm /> : (
            <div role="status" className="rounded-2xl border border-violet-200 bg-white p-8">
              <h2 className="text-xl font-bold">Registration is closed.</h2>
              <p className="mt-2 text-violet-950/75">Thank you for your interest. Contact the organisers if you think this is a mistake.</p>
              <Link href="/" className="mt-4 inline-block font-semibold text-violet-700 underline">Back to the event page</Link>
            </div>
          )}
        </div>
      </main>
      <BvFooter />
    </>
  );
}
