import test from "node:test";
import assert from "node:assert/strict";
import { validateRegistration, normalizePhone } from "../lib/validate.ts";
import { registrationState, countdownParts } from "../lib/state.ts";
import { registerTeam } from "../lib/register.ts";
import { BUILDVERSE } from "../config/buildverse.ts";

const NOW = Date.parse("2026-10-26T10:00:00+05:30");
const cfg = { ...BUILDVERSE, registrationDeadline: "2026-10-28T23:59:00+05:30" };
const good = () => ({
  teamName: "Cloud Ninjas",
  leader: { name: "Asha Rawat", email: "Asha@Example.com", rollNumber: "23CS001", phone: "98765 43210", course: "B.Tech CSE", year: "3rd" },
  members: [{ name: "Ravi Kumar", email: "ravi@example.com", rollNumber: "23CS002" }],
  paymentRef: "ab12cd34ef56",
  consent: true,
});
const fail = (body: unknown, now = NOW) => { const r = validateRegistration(body, now, cfg); assert.equal(r.ok, false); return r as Extract<ReturnType<typeof validateRegistration>, { ok: false }>; };

test("a good registration is normalised (lowercase email, +91 phone, upper-case payment id)", () => {
  const r = validateRegistration(good(), NOW, cfg);
  assert.ok(r.ok);
  if (r.ok) {
    assert.equal(r.value.leader.email, "asha@example.com");
    assert.equal(r.value.leader.phone, "+91 9876543210");
    assert.equal(r.value.paymentRef, "AB12CD34EF56");
    assert.equal(r.value.members.length, 1);
  }
});

test("solo participation (no teammates) is valid", () => {
  const b = good(); b.members = [];
  assert.ok(validateRegistration(b, NOW, cfg).ok);
});

test("a team of 5 (leader + 4) is REJECTED, a team of 4 is accepted", () => {
  const mk = (n: number) => Array.from({ length: n }, (_, i) => ({ name: `Mate ${i}`, email: `m${i}@e.com`, rollNumber: `ROLL${i}00` }));
  const ok = good(); ok.members = mk(3);
  assert.ok(validateRegistration(ok, NOW, cfg).ok);
  const bad = good(); bad.members = mk(4);
  assert.ok(fail(bad).fieldErrors.members);
});

test("closed after the deadline (403), and a broken deadline closes registration", () => {
  assert.equal(fail(good(), Date.parse("2026-10-29T00:00:00+05:30")).status, 403);
  assert.equal(registrationState(NOW, "not-a-date"), "closed");
  assert.equal(registrationState(NOW, cfg.registrationDeadline), "open");
});

test("duplicates inside the team are caught (email case-insensitive, roll number)", () => {
  const b = good(); b.members[0].email = "ASHA@example.com";
  assert.ok(fail(b).fieldErrors["members.0.email"]);
  const c = good(); c.members[0].rollNumber = "23cs001";
  assert.ok(fail(c).fieldErrors["members.0.rollNumber"]);
});

test("field rules: bad email, bad phone, short names, no consent, bad payment id", () => {
  const b = good() as any;
  b.leader.email = "nope"; b.leader.phone = "12345"; b.leader.name = "A"; b.consent = false; b.paymentRef = "x!";
  const f = fail(b).fieldErrors;
  for (const k of ["leader.email", "leader.phone", "leader.name", "consent", "paymentRef"]) assert.ok(f[k], k);
});

test("honeypot filled => rejected without field hints", () => {
  const b = { ...good(), website: "http://spam" };
  const r = fail(b); assert.equal(r.status, 400); assert.deepEqual(r.fieldErrors, {});
});

test("garbage input never throws", () => {
  for (const x of [null, undefined, 5, "str", [], { leader: 7, members: "x" }]) fail(x);
});

test("oversized strings are cut, not stored whole", () => {
  const b = good(); b.teamName = "x".repeat(500);
  const r = validateRegistration(b, NOW, cfg); assert.ok(r.ok);
  if (r.ok) assert.equal(r.value.teamName.length, 60);
});

test("normalizePhone accepts +91/91 prefixes and rejects numbers not starting 6-9", () => {
  assert.equal(normalizePhone("+91 98765-43210"), "+91 9876543210");
  assert.equal(normalizePhone("919876543210"), "+91 9876543210");
  assert.equal(normalizePhone("1234567890"), null);
});

test("countdown splits correctly and never goes negative", () => {
  const p = countdownParts(Date.parse("2026-10-26T10:00:00+05:30"), "2026-10-28T23:59:00+05:30");
  assert.deepEqual(p, { days: 2, hours: 13, minutes: 59, seconds: 0 });
  assert.deepEqual(countdownParts(NOW, "2020-01-01T00:00:00Z"), { days: 0, hours: 0, minutes: 0, seconds: 0 });
});

test("registerTeam maps outcomes; a thrown port error becomes a safe 500", async () => {
  const r = validateRegistration(good(), NOW, cfg); assert.ok(r.ok); if (!r.ok) return;
  assert.equal((await registerTeam(r.value, { saveTeam: async () => ({ kind: "saved", teamId: "t1" }) })).status, 201);
  assert.equal((await registerTeam(r.value, { saveTeam: async () => ({ kind: "duplicate" }) })).status, 409);
  const boom = await registerTeam(r.value, { saveTeam: async () => { throw new Error("db password=secret"); } });
  assert.equal(boom.status, 500);
  assert.ok(!JSON.stringify(boom).includes("secret"));
});

test("config sanity: deadline is before the first event day and dates are consistent", () => {
  assert.ok(Date.parse(BUILDVERSE.registrationDeadline) < Date.parse(BUILDVERSE.days[0].date + "T23:59:59+05:30"));
  assert.equal(BUILDVERSE.days[0].time, "TBA");
  assert.equal(BUILDVERSE.teamSize.max, 4);
});
