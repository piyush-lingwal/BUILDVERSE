// POST /api/register — public. Validates, then saves a team atomically.
import { NextRequest, NextResponse } from "next/server";
import { BUILDVERSE } from "@/config/buildverse";
import { validateRegistration } from "@/lib/validate";
import { registerTeam } from "@/lib/register";
import { supabasePorts } from "@/lib/ports";
import { getAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const NO_STORE = { "Cache-Control": "no-store" };
const MAX_BODY_BYTES = 20_000;

export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ success: false, error: "Request too large." }, { status: 413, headers: NO_STORE });
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400, headers: NO_STORE });
  }

  const checked = validateRegistration(body, Date.now(), BUILDVERSE);
  if (!checked.ok) {
    return NextResponse.json(
      { success: false, error: checked.error, fieldErrors: checked.fieldErrors },
      { status: checked.status, headers: NO_STORE }
    );
  }

  const db = getAdminClient();
  if (!db) {
    return NextResponse.json({ success: false, error: "Registration is temporarily unavailable." }, { status: 500, headers: NO_STORE });
  }
  const out = await registerTeam(checked.value, supabasePorts(db));
  return NextResponse.json(out.body, { status: out.status, headers: NO_STORE });
}
