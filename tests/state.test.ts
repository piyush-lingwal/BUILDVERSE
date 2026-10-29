import test from "node:test";
import assert from "node:assert/strict";
import { registrationState, countdownParts, getFormState, isFormClickable } from "../lib/state.ts";
import { BUILDVERSE } from "../config/buildverse.ts";

const NOW = Date.parse("2026-10-26T10:00:00+05:30");
const deadline = "2026-10-28T23:59:00+05:30";

test("registrationState: returns open before deadline, closed after or on invalid date", () => {
  assert.equal(registrationState(NOW, deadline), "open");
  assert.equal(registrationState(Date.parse("2026-10-29T00:00:00+05:30"), deadline), "closed");
  assert.equal(registrationState(NOW, "invalid-date-string"), "closed");
});

test("countdownParts: splits correctly and never goes negative", () => {
  const p = countdownParts(Date.parse("2026-10-26T10:00:00+05:30"), "2026-10-28T23:59:00+05:30");
  assert.deepEqual(p, { days: 2, hours: 13, minutes: 59, seconds: 0 });
  assert.deepEqual(countdownParts(NOW, "2020-01-01T00:00:00Z"), { days: 0, hours: 0, minutes: 0, seconds: 0 });
});

test("config sanity: deadline is before the first event day and URLs are valid", () => {
  assert.ok(Date.parse(BUILDVERSE.registrationDeadline) < Date.parse(BUILDVERSE.days[0].date + "T23:59:59+05:30"));
  assert.ok(BUILDVERSE.registrationFormUrl.startsWith("https://"));
});

test("schedule sanity: steps are in time order, ranges are valid, and the three phases are linked", () => {
  const steps = BUILDVERSE.days.flatMap((d) => d.steps);
  const starts = steps.filter((s) => s.start).map((s) => Date.parse(s.start!));
  assert.ok(starts.every((t) => !Number.isNaN(t)), "every start parses (use the +05:30 offset)");
  assert.deepEqual([...starts].sort((a, b) => a - b), starts, "steps are listed in time order");
  for (const s of steps.filter((x) => x.end)) assert.ok(Date.parse(s.end!) > Date.parse(s.start!), `${s.title}: end after start`);
  assert.deepEqual(BUILDVERSE.phases.map((p) => p.n), [1, 2, 3]);
  for (const p of BUILDVERSE.phases) assert.ok(steps.some((s) => s.phase === p.n), `phase ${p.n} has a step`);
  const dates = BUILDVERSE.days.map((d) => d.date);
  assert.deepEqual([...dates].sort(), dates, "days are in date order");
});

test("form state & sanity: Form 1 & Form 2 URLs and time-based clickability", () => {
  const { ideaSubmission, progressReport } = BUILDVERSE.forms;
  assert.equal(ideaSubmission.url, "https://forms.gle/UqiiMdr3BeDUVdkG6");
  assert.equal(progressReport.url, "https://forms.gle/186ogkj7tcjq6kKQ6");

  assert.equal(ideaSubmission.opensAt, "2026-10-29T18:00:00+05:30");
  assert.equal(progressReport.opensAt, "2026-10-30T00:00:00+05:30");

  const beforeForm1 = Date.parse("2026-10-29T17:59:00+05:30");
  const atForm1 = Date.parse("2026-10-29T18:00:00+05:30");
  const duringDay1Night = Date.parse("2026-10-29T21:00:00+05:30");
  const atForm2 = Date.parse("2026-10-30T00:00:00+05:30");

  // Before Form 1 opens:
  assert.equal(getFormState(beforeForm1, ideaSubmission.opensAt), "upcoming");
  assert.equal(isFormClickable(beforeForm1, ideaSubmission.opensAt), false);
  assert.equal(isFormClickable(beforeForm1, progressReport.opensAt), false);

  // When Form 1 opens:
  assert.equal(getFormState(atForm1, ideaSubmission.opensAt), "open");
  assert.equal(isFormClickable(atForm1, ideaSubmission.opensAt), true);
  assert.equal(isFormClickable(atForm1, progressReport.opensAt), false);

  // Later on Day 1:
  assert.equal(isFormClickable(duringDay1Night, ideaSubmission.opensAt), true);
  assert.equal(isFormClickable(duringDay1Night, progressReport.opensAt), false);

  // When Form 2 opens (midnight):
  assert.equal(getFormState(atForm2, progressReport.opensAt), "open");
  assert.equal(isFormClickable(atForm2, progressReport.opensAt), true);
});
