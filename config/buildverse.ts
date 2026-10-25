// ============================================================
// BUILD-VERSE 2026 — the ONE file to edit for event content
// ============================================================
// Everything the page and the registration API show or enforce lives here.
// Change a value, redeploy, done. Nothing else needs touching.
// Dates are written with the +05:30 (IST) offset on purpose.
// ============================================================

export interface BuildVerseConfig {
  name: string;
  tagline: string;
  organiser: string;
  /** Registration closes at this moment (server enforces it, not just the page). */
  registrationDeadline: string;
  teamSize: { min: number; max: number };
  feeInr: number;
  /** Who may register. Shown on the page and in the FAQ. */
  eligibility: string;
  /** `art: true` shows the supplied ₹1,50,000+ artwork. Set it to false if you change the amount. */
  prize: { headline: string; totalInr: number | null; art: boolean; details: string; items: string[] };
  /** Empty array => "To be revealed soon" is shown instead. */
  judges: { name: string; title: string }[];
  days: {
    date: string; // ISO date, IST
    label: string;
    title: string;
    mode: string;
    time: string; // "TBA" until announced
    venue?: string;
    description: string;
  }[];
  utkrisht: { show: boolean; text: string };
  themes: { title: string; description: string }[];
  rules: string[];
  faqs: { q: string; a: string }[];
  /** Leave phone/whatsapp empty to hide them. */
  contacts: { name: string; phone: string }[];
  whatsappUrl: string;
  payment: {
    /** Ask for a transaction (UTR) id in the form. */
    collectReference: boolean;
    /** Plain-text instructions shown above the field. */
    instructions: string;
  };
  siteUrl: string;
}

export const BUILDVERSE: BuildVerseConfig = {
  name: "BUILD-VERSE 2026",
  tagline: "Learn. Innovate. Pitch.",
  organiser: "AWS Student Builders Group, Tula's University",
  // 28 Oct 2026, 12:59 PM IST. Must be BEFORE the Day 1 workshop starts.
  registrationDeadline: "2026-10-28T12:59:00+05:30",
  teamSize: { min: 1, max: 4 },
  feeInr: 100,
  eligibility: "Open to all students of Tula's University.",
  prize: {
    headline: "₹1,50,000+",
    totalInr: 150000,
    art: true,
    // TODO(organisers): replace with the confirmed breakdown before launch.
    details: "Cash rewards and other prizes. The final allocation and eligibility conditions will be confirmed by the organising team.",
    items: [],
  },
  judges: [],
  days: [
    {
      date: "2026-10-29",
      label: "29 October 2026",
      title: "Online Workshop",
      mode: "Hybrid (via Google Meet)",
      time: "TBA",
      description: "Expert sessions on AI-assisted development workflows and modern tools.",
    },
    {
      date: "2026-10-30",
      label: "30 October 2026",
      title: "Build & Pitch",
      mode: "Hybrid (presentation at campus)",
      time: "2:30 PM – 5:30 PM",
      venue: "New Seminar Hall, Tula's University",
      description: "Product demonstration and pitching to the judging panel.",
    },
  ],
  utkrisht: { show: true, text: "Part of Utkrisht 2026 (30–31 October)" },
  themes: [
    { title: "Sustainable Future", description: "Build solutions for a cleaner, greener and more sustainable world." },
    { title: "Smart Campus", description: "Solve real problems on campus with technology." },
    { title: "Health & Wellbeing", description: "Build for better health, accessibility and wellbeing." },
    { title: "AI for Everyday Life", description: "Create helpful AI-powered tools for daily life and productivity." },
    { title: "Social Impact", description: "Use technology to create positive social change." },
  ],
  rules: [
    "Team size: 1–4 participants per team. Solo participation is allowed.",
    "Registration fee: ₹100 per team.",
    "Build an original product or solution. Plagiarism is not allowed.",
    "You may use tools and technologies introduced in the workshop, including but not limited to AWS Kiro, Google Antigravity, Cursor and other relevant tools.",
    "Submit a working prototype and present it to the judging panel.",
    "Follow the event timeline, submission guidelines and judging criteria shared by the organising team.",
  ],
  faqs: [
    { q: "Who can participate?", a: "Any student of Tula's University. Register as a solo participant or a team of up to 4." },
    { q: "Do I need a team to participate?", a: "No. You can take part alone or with up to 3 teammates." },
    { q: "What is the registration fee?", a: "₹100 per team, not per person." },
    { q: "What kind of projects can we build?", a: "Any original product that fits one of the five themes. A working prototype is required for the pitch." },
    { q: "Which tools and technologies can we use?", a: "Anything introduced in the workshop, such as AWS Kiro, Google Antigravity and Cursor, plus other relevant tools. Your solution must be original." },
    { q: "How will the evaluation be done?", a: "Teams demo their prototype and pitch to a panel of judges on 30 October. Detailed judging criteria will be shared by the organising team." },
    { q: "Will accommodation be provided?", a: "No. The event is for Tula's University students." },
    { q: "Whom can I contact for further queries?", a: "Use the contact details in the footer, or join the WhatsApp community." },
  ],
  // TODO(organisers): fill in the real numbers (kept empty so nothing wrong is shown).
  contacts: [
    { name: "Piyush Rawat", phone: "" },
    { name: "Oskar Rana", phone: "" },
  ],
  whatsappUrl: "",
  payment: {
    collectReference: true,
    // TODO(organisers): add the UPI id / QR instructions.
    instructions: "Pay the registration fee as instructed by the organisers, then enter the transaction (UTR) ID below.",
  },
  siteUrl: "/",
};
