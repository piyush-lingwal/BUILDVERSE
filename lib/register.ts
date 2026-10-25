// ============================================================
// Registration flow — PURE logic over an injected port
// ============================================================

import type { Registration } from "./validate.ts";

export type SaveResult =
  | { kind: "saved"; teamId: string }
  | { kind: "duplicate" }          // someone in the team (or the payment id) is already registered
  | { kind: "error" };

export interface RegistrationPorts {
  saveTeam(r: Registration): Promise<SaveResult>;
}

export type RegisterOutcome =
  | { status: 201; body: { success: true; teamId: string } }
  | { status: 409 | 500; body: { success: false; error: string } };

export async function registerTeam(r: Registration, ports: RegistrationPorts): Promise<RegisterOutcome> {
  let res: SaveResult;
  try {
    res = await ports.saveTeam(r);
  } catch {
    res = { kind: "error" };
  }
  if (res.kind === "saved") return { status: 201, body: { success: true, teamId: res.teamId } };
  if (res.kind === "duplicate") {
    return { status: 409, body: { success: false, error: "One of these emails, roll numbers or payment IDs is already registered. If this is a mistake, contact the organisers." } };
  }
  return { status: 500, body: { success: false, error: "Something went wrong. Please try again in a moment." } };
}
