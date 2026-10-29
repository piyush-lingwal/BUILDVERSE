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
  /** The three phases. The main idea of the event: Learn at college, Build at home, Pitch at college. */
  phases: {
    n: 1 | 2 | 3;
    name: string;
    place: "college" | "home";
    placeLabel: string; // "At college" / "At home"
    when: string;
    summary: string;
  }[];
  /** One line shown under the flow and after the event ends. */
  resultsLine: string;
  /** Day-by-day schedule. Times are shown as written; `start`/`end` (ISO, IST) only drive the "Live now / Next up" badges. */
  days: {
    date: string; // ISO date, IST
    day: string; // "29"
    month: string; // "OCT"
    label: string; // "Day 01"
    title: string;
    subtitle: string;
    mascot?: "pitch" | "trophy";
    steps: {
      icon: "learn" | "idea" | "build" | "progress" | "pitch" | "result";
      phase?: 1 | 2 | 3; // links the step to the phase strip
      place?: { kind: "college" | "home"; label: string };
      time?: string; // as displayed, e.g. "2:00 PM – 5:30 PM"; leave out until announced
      timeNote?: string;
      title: string;
      description: string;
      badge: { text: string; tone: "neutral" | "info" | "warn" };
      start?: string;
      end?: string;
      form?: {
        name: string;
        url: string;
        opensAt: string;
        timeLabel: string;
        buttonLabel: string;
        closesAt?: string;
      };
    }[];
  }[];
  utkrisht: { show: boolean; text: string };
  /** Overarching theme shown above the innovation tracks. */
  trackTheme: { title: string; statement: string };
  /** 5 categories, 18 tracks. `icon` is a key into the icon map in components/Tracks.tsx. */
  trackCategories: { id: string; icon: string; name: string; hint: string; tracks: { title: string; description: string; icon: string }[] }[];
  rules: string[];
  faqs: { q: string; a: string }[];
  /** Leave phone/whatsapp empty to hide them. */
  contacts: { name: string; phone: string }[];
  whatsappUrl: string;
  siteUrl: string;
  registrationFormUrl: string;
  forms: {
    ideaSubmission: {
      name: string;
      shortName: string;
      url: string;
      opensAt: string; // ISO IST
      timeLabel: string;
      closesAt?: string;
    };
    progressReport: {
      name: string;
      shortName: string;
      url: string;
      opensAt: string; // ISO IST
      timeLabel: string;
      closesAt?: string;
    };
  };
}

export const BUILDVERSE: BuildVerseConfig = {
  name: "BUILD-VERSE 2026",
  tagline: "Learn. Innovate. Pitch.",
  organiser: "AWS Student Builders Group, Tulas University",
  registrationFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfvXQBNtTPuO_nf2rJ2lQ3YXtIHAKX1KfoFGr9vQtW7z5-KXQ/viewform",
  // 28 Oct 2026, 11:59 PM IST. Must be BEFORE the Day 1 workshop starts.
  registrationDeadline: "2026-10-28T23:59:00+05:30",
  teamSize: { min: 1, max: 4 },
  feeInr: 100,
  eligibility: "Open to all students of Tulas University.",
  prize: {
    headline: "₹1,50,000+",
    totalInr: 150000,
    art: true,
    // TODO(organisers): replace with the confirmed breakdown before launch.
    details: "Cash rewards and other prizes. The final allocation and eligibility conditions will be confirmed by the organising team.",
    items: [],
  },
  judges: [],
  phases: [
    {
      n: 1, name: "Learn", place: "college", placeLabel: "At college", when: "29 Oct · 2:00 – 5:30 PM",
      summary: "Attend the workshops in person at the New Seminar Hall. Speakers interact with students through an online meet.",
    },
    {
      n: 2, name: "Innovate", place: "home", placeLabel: "At home", when: "29 Oct evening to 30 Oct",
      summary: "Submit your idea, then build your prototype at home. Online workshops on Google Meet, with speakers guiding and mentoring you till 10 PM.",
    },
    {
      n: 3, name: "Pitch", place: "college", placeLabel: "At college", when: "30 Oct · 2:00 – 5:30 PM",
      summary: "Come back to the New Seminar Hall, demonstrate your original working product and pitch it to the judges.",
    },
  ],
  resultsLine: "Results will be announced on 31 October.",
  days: [
    {
      date: "2026-10-29",
      day: "29",
      month: "OCT",
      label: "Day 01",
      title: "Learn at college, then build at home",
      subtitle: "Hybrid workshops · Idea submission · Prototype building · Progress report",
      steps: [
        {
          icon: "learn",
          phase: 1,
          place: { kind: "college", label: "New Seminar Hall" },
          time: "2:00 PM – 5:30 PM",
          title: "Learn: Expert Workshops",
          description: "Hybrid mode. Students must be present at the venue until 5:30 PM, while the speakers interact with them through an online meet.",
          badge: { text: "Hybrid · be present at the venue", tone: "neutral" },
          start: "2026-10-29T14:00:00+05:30",
          end: "2026-10-29T17:30:00+05:30",
        },
        {
          icon: "idea",
          time: "6:00 PM",
          title: "Round 1: Idea Submission",
          description: "The first form is shared with participants. Submit your project idea, the problem you are solving and your proposed solution. Then start building.",
          badge: { text: "Form 01 opens", tone: "info" },
          start: "2026-10-29T18:00:00+05:30",
          form: {
            name: "Form 1: Idea Submission",
            url: "https://forms.gle/UqiiMdr3BeDUVdkG6",
            opensAt: "2026-10-29T18:00:00+05:30",
            timeLabel: "6:00 PM",
            buttonLabel: "Submit Idea (Form 1)",
          },
        },
        {
          icon: "build",
          phase: 2,
          place: { kind: "home", label: "Google Meet" },
          time: "6:00 PM – Next Day",
          title: "Innovate: Build at Home",
          description: "Work on your idea and build your prototype or product at home. Online workshops continue on Google Meet, where speakers guide and mentor you till 10 PM.",
          badge: { text: "Online mentoring on Meet", tone: "neutral" },
          start: "2026-10-29T18:00:00+05:30",
          end: "2026-10-29T22:00:00+05:30",
        },
        {
          icon: "progress",
          time: "12:00 AM",
          timeNote: "Midnight, night of 29–30 Oct",
          title: "Round 2: Progress Report",
          description: "At midnight, fill the progress form. Report your progress, explain your prototype and document the work completed so far.",
          badge: { text: "Form 02 opens", tone: "info" },
          start: "2026-10-30T00:00:00+05:30",
          form: {
            name: "Form 2: Project Progress Report",
            url: "https://forms.gle/186ogkj7tcjq6kKQ6",
            opensAt: "2026-10-30T00:00:00+05:30",
            timeLabel: "12:00 AM Midnight",
            buttonLabel: "Submit Progress Report (Form 2)",
          },
        },
      ],
    },
    {
      date: "2026-10-30",
      day: "30",
      month: "OCT",
      label: "Day 02",
      title: "Pitch at college",
      subtitle: "Final presentation · Project evaluation",
      mascot: "pitch",
      steps: [
        {
          icon: "pitch",
          phase: 3,
          place: { kind: "college", label: "New Seminar Hall" },
          time: "2:00 PM – 5:30 PM",
          title: "Round 3: Final Presentation & Pitch",
          description: "Present at the same venue, the New Seminar Hall. Demonstrate your original, properly built product and pitch your idea to the evaluation panel.",
          badge: { text: "Be present at the venue", tone: "neutral" },
          start: "2026-10-30T14:00:00+05:30",
          end: "2026-10-30T17:30:00+05:30",
        },
      ],
    },
    {
      date: "2026-10-31",
      day: "31",
      month: "OCT",
      label: "Results",
      title: "Results announced",
      subtitle: "The organising team announces the results of BUILD-VERSE 2026",
      mascot: "trophy",
      steps: [
        {
          icon: "result",
          title: "Results announcement",
          description: "Results will be announced on 31 October.",
          badge: { text: "At college · Auditorium", tone: "info" },
        },
      ],
    },
  ],
  forms: {
    ideaSubmission: {
      name: "Form 1: Idea Submission",
      shortName: "Form 1 (Idea Submission)",
      url: "https://forms.gle/UqiiMdr3BeDUVdkG6",
      opensAt: "2026-10-29T18:00:00+05:30",
      timeLabel: "6:00 PM, 29 Oct",
    },
    progressReport: {
      name: "Form 2: Project Progress Report",
      shortName: "Form 2 (Progress Report)",
      url: "https://forms.gle/186ogkj7tcjq6kKQ6",
      opensAt: "2026-10-30T00:00:00+05:30",
      timeLabel: "12:00 AM Midnight, night of 29–30 Oct",
    },
  },
  utkrisht: { show: true, text: "Part of Utkrisht 2026." },
  trackTheme: { title: "BUILD THE FUTURE", statement: "From Intelligent Systems to Quantum Possibilities." },
  trackCategories: [
    {
      id: "ai", icon: "brain", name: "AI & Intelligent Systems", hint: "Your idea learns, predicts, sees or acts on its own.",
      tracks: [
        { icon: "bot", title: "Agentic AI & Autonomous Systems", description: "AI agents, multi-agent collaboration, autonomous workflows, and intelligent task automation." },
        { icon: "sparkles", title: "Generative AI & Foundation Models", description: "AI-powered content generation, RAG applications, document intelligence, and domain-specific AI tools." },
        { icon: "eye", title: "Computer Vision & Spatial Computing", description: "Image recognition, video analysis, visual accessibility, augmented reality, and interactive 3D experiences." },
        { icon: "chart", title: "Data Intelligence & Predictive Analytics", description: "Forecasting, recommendation systems, decision-support tools, and data-driven applications." },
      ],
    },
    {
      id: "hardware", icon: "cpu", name: "Hardware, IoT & Cyber-Physical Systems", hint: "Your idea talks to the physical world through sensors, devices or signals.",
      tracks: [
        { icon: "wifi", title: "Smart Connected Devices & IoT Systems", description: "Sensor networks, home automation, smart campus solutions, and connected hardware devices." },
        { icon: "factory", title: "Industrial IoT & Automation", description: "Predictive maintenance, asset tracking, telemetry, and automated industrial workflows." },
        { icon: "radio", title: "Robotics & Autonomous Hardware", description: "Drones, robotic arms, obstacle-avoidance vehicles, and embedded sensor integration." },
        { icon: "shield", title: "Cyber-Physical Security & Device Intelligence", description: "Hardware-level security, anomaly detection, edge authentication, and secure firmware design." },
      ],
    },
    {
      id: "software", icon: "layers", name: "Software Engineering & Infrastructure", hint: "Your idea is a platform, a tool, a pipeline or a product for businesses.",
      tracks: [
        { icon: "cloud", title: "Cloud-Native & Distributed Applications", description: "Cloud-based platforms, serverless applications, distributed systems, APIs, and scalable digital services." },
        { icon: "code", title: "Developer Tools & Engineering Productivity", description: "CLI tools, testing automation, code analysis, CI/CD utilities, and workflow enhancements." },
        { icon: "database", title: "Data Engineering & Knowledge Systems", description: "Data pipelines, knowledge graphs, intelligent search, information retrieval, and data management systems." },
        { icon: "wallet", title: "FinTech & Digital Commerce", description: "Personal finance tools, digital payment applications, fraud prevention, business automation, and e-commerce platforms." },
      ],
    },
    {
      id: "applied", icon: "sparkles", name: "Applied Tech: Health, Education & Society", hint: "Your idea solves a problem in everyday life, health, learning or city living.",
      tracks: [
        { icon: "heart", title: "HealthTech & Assistive Technology", description: "Healthcare information tools, accessible applications, assistive interfaces, and digital wellbeing platforms." },
        { icon: "graduation", title: "EdTech & Future of Learning", description: "Adaptive learning platforms, educational simulations, skill assessment, and personalised learning applications." },
        { icon: "panels", title: "Future Interfaces & Digital Experiences", description: "Conversational interfaces, accessibility-first UX, immersive web experiences, and innovative software interactions." },
        { icon: "bus", title: "Smart Mobility & Urban Intelligence", description: "Route optimisation, transport planning, traffic analysis, logistics software, and urban service platforms." },
      ],
    },
    {
      id: "open", icon: "lightbulb", name: "Open Innovation", hint: "Your idea does not fit anywhere else. That is fine.",
      tracks: [
        { icon: "lightbulb", title: "Open Innovation", description: "An open category for any original software-based project that does not fit the other tracks. Examples include AgriTech, tourism, civic technology, productivity tools, social-impact applications, and other innovative digital solutions." },
      ],
    },
  ],
  rules: [
    "Eligibility: Open to all students of Tulas University.",
    "Team size: 1–4 participants per team. Solo participation is allowed.",
    "Registration fee: ₹100 per team.",
    "Event format: Learn at college, Build at home, Pitch at college. Phase 1 (29 Oct) and Phase 3 (30 Oct) take place at the New Seminar Hall, and participants must be present at the venue.",
    "Fill the idea submission form (Form 01) after the workshop and the progress form (Form 02) at midnight on 29–30 October.",
    "Build an original product or solution. Plagiarism is not allowed.",
    "You may use tools and technologies introduced in the workshop, including but not limited to AWS Kiro, Google Antigravity, Cursor and other relevant tools.",
    "Submit a working prototype and present it to the judging panel.",
    "Follow the event timeline, submission guidelines and judging criteria shared by the organising team.",
  ],
  faqs: [
    { q: "Who can participate?", a: "Any student of Tulas University. Register as a solo participant or a team of up to 4." },
    { q: "Is the event online or offline?", a: "Both. Learn and Pitch happen at college, at the New Seminar Hall. Innovate happens at home, with online workshops on Google Meet. In short: Learn at college, Build at home, Pitch at college." },
    { q: "Do I have to be at college on 29 October?", a: "Yes. Phase 1 (Learn) runs in hybrid mode, and students must be present at the New Seminar Hall until 5:30 PM. The speakers interact with the students through an online meet." },
    { q: "Where do we build our project?", a: "At home. After submitting your idea in Form 01, you work on your idea and build your prototype or product from home. Online workshops continue on Google Meet, where speakers guide and mentor you till 10 PM." },
    { q: "What are Form 01 and Form 02?", a: "Form 01 is the idea submission, shared around 6:00 PM on 29 October. Form 02 is the progress report, which opens at midnight on the night of 29–30 October. Both form links become clickable directly on this website as soon as their respective round starts." },
    { q: "When and where is the final pitch?", a: "On 30 October, from 2:00 PM to 5:30 PM, at the same venue: the New Seminar Hall. Present your idea and your properly, originally built product to the judges." },
    { q: "Are the tracks separate competitions?", a: "No. The tracks only help you choose a direction. All tracks follow the same competition rules and judging criteria." },
    { q: "What kind of projects can we build?", a: "Any original software project that fits one of the 18 innovation tracks. Open Innovation covers ideas that fit none of them. A working prototype is required for the pitch." },
    { q: "Which tools and technologies can we use?", a: "Anything introduced in the workshop, such as AWS Kiro, Google Antigravity and Cursor, plus other relevant tools. Your solution must be original." },
    { q: "Will accommodation be provided?", a: "No. The event is for Tulas University students." },
  ],
  // TODO(organisers): fill in the real numbers (kept empty so nothing wrong is shown).
  contacts: [
    { name: "Piyush Rawat", phone: "+91 9685221532" },
    { name: "Oskar Rana", phone: "+91 8630369690" },
  ],
  whatsappUrl: "https://chat.whatsapp.com/Dy6s9Lo9rFpLNbrMkgUgQ6",
  siteUrl: "/",
};
