// Server glue: saves a team through the atomic database function.
import type { SupabaseClient } from "@supabase/supabase-js";
import type { RegistrationPorts } from "./register";

export function supabasePorts(db: SupabaseClient): RegistrationPorts {
  return {
    async saveTeam(r) {
      const { data, error } = await db.rpc("register_buildverse_team", {
        p_team_name: r.teamName,
        p_payment_ref: r.paymentRef,
        p_leader: r.leader,
        p_members: r.members,
      });
      if (error) {
        if (error.code === "23505") return { kind: "duplicate" };
        console.error("[buildverse] save failed:", error.code, error.message);
        return { kind: "error" };
      }
      return { kind: "saved", teamId: String(data) };
    },
  };
}
