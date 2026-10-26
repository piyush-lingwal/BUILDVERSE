import { redirect } from "next/navigation";
import { BUILDVERSE as C } from "@/config/buildverse";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  redirect(C.registrationFormUrl);
}
