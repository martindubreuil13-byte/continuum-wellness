"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function scrollToForm() {
  document.getElementById("founding-form")?.scrollIntoView({ behavior: "smooth" });
}

function Divider() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "0" }}>
      <div style={{ width: "96px", height: "1px", backgroundColor: "#c9a96e", opacity: 0.2 }} />
    </div>
  );
}

const whatItIs = [
  "A live weekly membership with guided sessions",
  "A permanent small-group cohort of 8–12 people",
  "A moderated community between sessions",
  "18 teaching modules across 4 core pillars",
  "A structured progression — not a content library",
];

const whatItIsNot = [
  "A drop-in class",
  "A digital course you never finish",
  "A retreat you forget by Wednesday",
  "A therapy service",
  "Another subscription you don't open",
];

const pillars = [
  {
    title: "Regulation & Stability",
    body: "Breathwork, meditation, somatic movement, sleep, stress management",
  },
  {
    title: "Identity & Direction",
    body: "Emotional intelligence, self-alignment, decision-making, clarity frameworks",
  },
  {
    title: "Emotional Depth & Release",
    body: "Deep breathwork, sound therapy, visualization, creative expression",
  },
  {
    title: "Connection & Expression",
    body: "Communication, relational intelligence, social presence, belonging",
  },
];

const benefits = [
  "Priority placement in your chosen cohort",
  "Founding Member recognition within the community",
  "Significant early-bird pricing locked in at launch",
  "Priority access to retreats and special intensives",
  "A voice in the early shaping of the program",
];

const forYouIf = [
  "You are tired of fragmented wellness tools that never integrate",
  "You want depth, not more content",
  "You value consistency over novelty",
  "You're willing to show up — really show up — weekly",
  "You want to belong to something, not just subscribe to it",
];

const notForYouIf = [
  "You're looking for a quick fix",
  "You want passive access to content",
  "You are not ready to be in community",
];

// Shared style tokens (values only — no Tailwind structural classes)
const gold = "#c9a96e";
const goldLight = "#e8c98a";
const cream = "#f5f0e8";
const muted = "#b8ad9e";
const bg = "#0f0d0b";
const surface = "#1a1610";

const eyebrowStyle: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: gold,
};

const bodyStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 300,
  lineHeight: 1.75,
  color: muted,
};

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("https://formsubmit.co/ajax/hello@continuumwellness.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // show success regardless
    }
    setSubmitted(true);
  };

  return (
    <main style={{ backgroundColor: bg, color: cream, overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <nav
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: navVisible ? "rgba(15,13,11,0.90)" : "transparent",
          backdropFilter: navVisible ? "blur(12px)" : "none",
          opacity: navVisible ? 1 : 0,
          transition: "all 0.4s ease",
          pointerEvents: navVisible ? "auto" : "none",
        }}
      >
        <span
          className="font-serif"
          style={{ fontSize: "14px", letterSpacing: "0.05em", color: cream }}
        >
          Continuum Wellness
        </span>
        <button
          onClick={scrollToForm}
          style={{
            background: "transparent",
            border: `1px solid ${gold}`,
            borderRadius: "9999px",
            padding: "8px 20px",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: cream,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = gold;
            e.currentTarget.style.color = bg;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = cream;
          }}
        >
          Join the Founding Circle
        </button>
      </nav>

      {/* ── SECTION 1: HERO ── */}
      <section
        aria-label="Hero"
        style={{
          position: "relative",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <Image
          src="/images/hero.jpg"
          alt="Continuum Wellness"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />

        {/* Overlay — darker, richer */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,8,6,0.72) 0%, rgba(10,8,6,0.82) 60%, rgba(10,8,6,0.95) 100%)",
        }} />

        {/* Hero content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{
            position: "relative",
            zIndex: 10,
            padding: "0 24px",
            maxWidth: "680px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Brand name */}
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#f5f0e8",
              letterSpacing: "0.04em",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}>
              Continuum Wellness
            </p>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              color: "#c9a96e",
              fontStyle: "italic",
              letterSpacing: "0.06em",
              marginBottom: "32px",
            }}>
              by Carol Ann Beasley
            </p>
          </motion.div>

          {/* Gold divider */}
          <motion.div variants={fadeUp} style={{
            width: "48px",
            height: "1px",
            backgroundColor: "#c9a96e",
            opacity: 0.7,
            marginBottom: "32px",
          }} />

          {/* Headline — quieter, single thought */}
          <motion.p variants={fadeUp} style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.1rem, 2.8vw, 1.5rem)",
            color: "#f5f0e8",
            opacity: 0.85,
            lineHeight: 1.6,
            letterSpacing: "0.02em",
            marginBottom: "48px",
            maxWidth: "480px",
          }}>
            You&rsquo;ve built the life.
            <br />
            Now build the rhythm to sustain it.
          </motion.p>

          {/* CTA */}
          <motion.button
            variants={fadeUp}
            className="btn-pulse"
            onClick={() => document.getElementById("founding-form")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              backgroundColor: "#c9a96e",
              color: "#0f0d0b",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              border: "none",
              borderRadius: "9999px",
              padding: "16px 40px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              marginBottom: "40px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#e8c98a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#c9a96e"; }}
          >
            Join the Founding Circle
          </motion.button>

          {/* Launching 2026 — barely visible watermark */}
          <motion.p variants={fadeUp} style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            color: "#b8ad9e",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.45,
          }}>
            Launching 2026
          </motion.p>

        </motion.div>
      </section>

      <Divider />

      {/* ── SECTION 2: THE MIRROR ── */}
      <section
        aria-label="The Mirror — does this sound familiar?"
        style={{ backgroundColor: bg, padding: "96px 0" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          style={{ maxWidth: "768px", margin: "0 auto", padding: "0 24px" }}
        >
          <motion.p variants={fadeUp} style={{ ...eyebrowStyle, textAlign: "center" }}>
            Sound Familiar?
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              color: cream,
              marginTop: "16px",
              textAlign: "center",
            }}
          >
            You&rsquo;re not struggling.
            <br />
            You&rsquo;re eroding.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              textAlign: "left",
            }}
          >
            <p style={bodyStyle}>
              You wake up tired despite the sleep.
              <br />
              You succeed — and feel increasingly hollow inside.
              <br />
              You have the subscriptions, the retreats, the apps.
              <br />
              And somehow, nothing has actually stuck.
            </p>
            <p style={bodyStyle}>
              The problem isn&rsquo;t you. The problem is that everything
              you&rsquo;ve tried was designed for a moment — not a life.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Divider />

      {/* ── SECTION 3: THE REFRAME ── */}
      <section
        aria-label="The Reframe — wellness was meant to be lived"
        style={{ backgroundColor: surface, padding: "96px 0" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          style={{ maxWidth: "768px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}
        >
          <motion.p variants={fadeUp} style={eyebrowStyle}>
            The Real Issue
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              fontWeight: 300,
              lineHeight: 1.2,
              color: cream,
              marginTop: "16px",
            }}
          >
            Wellness was never meant
            <br />
            to be consumed.
            <br />
            It was meant to be lived.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{ ...bodyStyle, marginTop: "32px", textAlign: "left" }}
          >
            The wellness industry is built on novelty — new modalities, new
            retreats, new frameworks. Each one delivers a peak. None of them hold
            you when the peak is over.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-serif italic"
            style={{ fontSize: "20px", color: cream, marginTop: "24px", textAlign: "center" }}
          >
            You don&rsquo;t need another experience. You need a rhythm.
          </motion.p>
        </motion.div>
      </section>

      <Divider />

      {/* ── SECTION 4: THE INTRODUCTION ── */}
      <section
        aria-label="Introducing Continuum Wellness"
        style={{ backgroundColor: bg, padding: "96px 0" }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={eyebrowStyle}>
              Introducing Continuum Wellness
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={{
                fontSize: "clamp(1.875rem, 4.5vw, 3.5rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: cream,
                marginTop: "16px",
              }}
            >
              Not a program. Not a platform.
              <br />
              A structured rhythm
              <br />
              you belong to.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              style={{
                marginTop: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "600px",
              }}
            >
              <p style={bodyStyle}>
                Continuum Wellness is a premium membership built around one idea:
                sustainable wellbeing emerges not from intensity, but from
                structured repetition inside a stable, safe container.
              </p>
              <p style={bodyStyle}>
                Every week, you return to the same anchor. The same small group.
                The same guided rhythm — designed to regulate your nervous system,
                deepen your self-awareness, and rebuild the sense of belonging that
                quietly disappeared.
              </p>
            </motion.div>
          </motion.div>

          {/* What it is / What it is not */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            style={{
              marginTop: "64px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "48px",
            }}
          >
            <motion.div variants={fadeUp}>
              <h3
                className="font-serif"
                style={{ fontSize: "20px", fontWeight: 300, color: gold, marginBottom: "24px" }}
              >
                What it is
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0 }}>
                {whatItIs.map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", gap: "12px", fontSize: "16px", fontWeight: 300, lineHeight: 1.6, color: muted }}
                  >
                    <span style={{ color: gold, flexShrink: 0 }}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3
                className="font-serif"
                style={{ fontSize: "20px", fontWeight: 300, color: gold, marginBottom: "24px" }}
              >
                What it is not
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0 }}>
                {whatItIsNot.map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", gap: "12px", fontSize: "16px", fontWeight: 300, lineHeight: 1.6, color: muted }}
                  >
                    <span style={{ flexShrink: 0 }}>×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 5: THE EXPERIENCE ── */}
      <section
        aria-label="The weekly experience"
        style={{ backgroundColor: surface, padding: "96px 0" }}
      >
        <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={eyebrowStyle}>
              The Weekly Rhythm
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: cream,
                marginTop: "16px",
              }}
            >
              Two touchpoints.
              <br />
              Every week.
              <br />
              For the rest of the year.
            </motion.h2>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              marginTop: "64px",
            }}
          >
            {/* Card 1 — Anchor Session */}
            <motion.div
              variants={fadeUp}
              style={{
                backgroundColor: surface,
                border: "1px solid rgba(201,169,110,0.15)",
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              <p className="font-serif" style={{ fontSize: "30px", fontWeight: 300, color: gold }}>01</p>
              <h3
                className="font-serif"
                style={{ fontSize: "22px", fontWeight: 300, color: cream, marginTop: "16px" }}
              >
                Anchor Session
              </h3>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: muted, marginTop: "8px" }}>
                Weekly · 60–75 min · All members
              </p>
              <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.75, color: muted, marginTop: "24px" }}>
                Your weekly reset. Founder-led teaching, guided practice, and
                structured reflection. Live-first. Replay available for 7 days —
                then it&rsquo;s gone. This is a participation system, not a
                content library.
              </p>
            </motion.div>

            {/* Card 2 — Cohort Session */}
            <motion.div
              variants={fadeUp}
              style={{
                backgroundColor: surface,
                border: "1px solid rgba(201,169,110,0.15)",
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              <p className="font-serif" style={{ fontSize: "30px", fontWeight: 300, color: gold }}>02</p>
              <h3
                className="font-serif"
                style={{ fontSize: "22px", fontWeight: 300, color: cream, marginTop: "16px" }}
              >
                Cohort Session
              </h3>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: muted, marginTop: "8px" }}>
                Weekly · 60 min · Your group of 8–12
              </p>
              <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.75, color: muted, marginTop: "24px" }}>
                Your permanent small group. Facilitator-led dialogue where
                teaching becomes integration. Not recorded. Psychologically safe.
                Where you stop being an audience and start being known.
              </p>
            </motion.div>

            {/* Card 3 — 4 Pillars */}
            <motion.div
              variants={fadeUp}
              style={{
                backgroundColor: surface,
                border: "1px solid rgba(201,169,110,0.15)",
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              <p className="font-serif" style={{ fontSize: "30px", fontWeight: 300, color: gold }}>03</p>
              <h3
                className="font-serif"
                style={{ fontSize: "22px", fontWeight: 300, color: cream, marginTop: "16px" }}
              >
                4 Pillars · 18 Modules
              </h3>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: muted, marginTop: "8px" }}>
                Across the year
              </p>
              <ul style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", padding: 0 }}>
                {pillars.map((pillar) => (
                  <li key={pillar.title} style={{ display: "flex", gap: "12px" }}>
                    <span
                      style={{
                        display: "block",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: gold,
                        flexShrink: 0,
                        marginTop: "6px",
                      }}
                    />
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: cream }}>{pillar.title}</p>
                      <p style={{ fontSize: "13px", fontWeight: 300, color: muted, marginTop: "2px" }}>{pillar.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="font-serif italic"
            style={{ fontSize: "18px", color: muted, marginTop: "64px" }}
          >
            Continuity of self. No biohacking. No hype.
          </motion.p>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 6: THE LEGACY ── */}
      <section
        aria-label="The legacy of Carol Ann Beasley"
        style={{ backgroundColor: bg, padding: "96px 0" }}
      >
        <div style={{ maxWidth: "768px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={{ ...eyebrowStyle, textAlign: "center" }}>
              Why This Exists
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: cream,
                marginTop: "16px",
                textAlign: "center",
              }}
            >
              Built in honor of a woman
              <br />
              who knew what belonging
              <br />
              could do.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}
          >
            <motion.p variants={fadeUp} style={bodyStyle}>
              Carol Ann Beasley spent her life studying what it means to truly
              thrive — not to optimize, not to perform, but to be fully alive in
              one&rsquo;s own skin, inside a community that holds you.
            </motion.p>
            <motion.p variants={fadeUp} style={bodyStyle}>
              Her vision was simple and radical: that wellbeing is not something
              you pursue. It&rsquo;s something you build — through structure,
              through rhythm, through real human connection.
            </motion.p>
            <motion.p variants={fadeUp} style={{ ...bodyStyle, color: cream }}>
              She passed before she could build it herself.
            </motion.p>
            <motion.p variants={fadeUp} style={bodyStyle}>
              Dr. Virgil Beasley — her husband, a psychologist, and a cancer
              survivor — made a decision: her vision would not remain a vision.
              Having faced his own mortality, Virgil understands something about
              the difference between existing and living.
            </motion.p>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="font-serif italic"
            style={{ fontSize: "20px", color: cream, marginTop: "32px", textAlign: "center" }}
          >
            This is Carol Ann&rsquo;s philosophy. Virgil&rsquo;s commitment. And
            your invitation.
          </motion.p>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 7: WHO THIS IS FOR ── */}
      <section
        aria-label="Who Continuum Wellness is for"
        style={{ backgroundColor: surface, padding: "96px 0" }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={eyebrowStyle}>
              Is This For You?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: cream,
                marginTop: "16px",
              }}
            >
              For the person who has almost everything — and knows something
              essential is missing.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <p style={bodyStyle}>
                You are established. Capable. Respected. You have built things,
                led things, survived things.
              </p>
              <p style={bodyStyle}>
                And somewhere in the middle of all that — you lost the thread back
                to yourself.
              </p>
              <p style={{ ...bodyStyle, color: cream }}>
                You&rsquo;re not in crisis. You&rsquo;re not broken. You are
                simply ready for something that holds.
              </p>
            </motion.div>
          </motion.div>

          {/* Two-column fit criteria */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            style={{
              marginTop: "64px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "48px",
            }}
          >
            <motion.div variants={fadeUp}>
              <h3
                className="font-serif"
                style={{ fontSize: "20px", fontWeight: 300, color: gold, marginBottom: "24px" }}
              >
                You&rsquo;ll feel at home here if:
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", padding: 0 }}>
                {forYouIf.map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", gap: "12px", fontSize: "16px", fontWeight: 300, lineHeight: 1.6, color: muted }}
                  >
                    <span style={{ color: gold, fontWeight: 600, flexShrink: 0 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3
                className="font-serif"
                style={{ fontSize: "20px", fontWeight: 300, color: muted, marginBottom: "24px" }}
              >
                This is not for you if:
              </h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "16px", listStyle: "none", padding: 0 }}>
                {notForYouIf.map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", gap: "12px", fontSize: "16px", fontWeight: 300, lineHeight: 1.6, color: muted }}
                  >
                    <span style={{ flexShrink: 0 }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 8: THE FOUNDING OFFER ── */}
      <section
        id="founding-form"
        aria-label="Founding Circle application"
        style={{ backgroundColor: bg, padding: "96px 0" }}
      >
        <div style={{ maxWidth: "768px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={{ ...eyebrowStyle, textAlign: "center" }}>
              Founding Circle · Limited to 100 Members
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: cream,
                marginTop: "16px",
                textAlign: "center",
              }}
            >
              Be among the first
              <br />
              to shape what
              <br />
              this becomes.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{ ...bodyStyle, marginTop: "32px", textAlign: "left" }}
            >
              Continuum Wellness launches in 2026. Before we open publicly, we
              are inviting 100 founding members — the people who will set the
              tone, form the first cohorts, and experience the full system from
              day one.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              style={{
                marginTop: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                listStyle: "none",
                padding: 0,
              }}
            >
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    fontSize: "16px",
                    fontWeight: 300,
                    color: cream,
                  }}
                >
                  <span style={{ color: gold }}>·</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </motion.ul>

            {/* Form */}
            <motion.div variants={fadeUp}>
              {submitted ? (
                <div
                  style={{
                    marginTop: "48px",
                    border: "1px solid rgba(201,169,110,0.15)",
                    borderRadius: "16px",
                    padding: "40px 32px",
                    textAlign: "center",
                  }}
                >
                  <p
                    className="font-serif"
                    style={{ fontSize: "26px", fontWeight: 300, color: cream }}
                  >
                    You&rsquo;re on the list.
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 300, color: muted, marginTop: "8px" }}>
                    We&rsquo;ll be in touch personally.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: "420px",
                    margin: "48px auto 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="placeholder:text-[#b8ad9e]"
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "1px solid rgba(201,169,110,0.3)",
                        borderRadius: "9999px",
                        padding: "16px 24px",
                        color: cream,
                        fontSize: "14px",
                        textAlign: "center",
                        outline: "none",
                        transition: "border-color 0.3s ease",
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = gold; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}
                    />
                    <button
                      type="submit"
                      className="btn-pulse"
                      style={{
                        width: "100%",
                        backgroundColor: gold,
                        color: bg,
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        borderRadius: "9999px",
                        padding: "16px 24px",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        border: "none",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = goldLight; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = gold; }}
                    >
                      Request Your Founding Membership
                    </button>
                  </form>
                  <p style={{ fontSize: "12px", color: muted, textAlign: "center" }}>
                    We&rsquo;ll be in touch personally. No spam — ever.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── SECTION 9: THE CLOSE ── */}
      <section
        aria-label="Closing"
        style={{
          padding: "96px 0",
          background: `linear-gradient(to bottom, ${bg}, rgba(201,169,110,0.05))`,
        }}
      >
        <div style={{ maxWidth: "768px", margin: "0 auto", padding: "0 24px" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: cream,
                textAlign: "center",
              }}
            >
              The rhythm you&rsquo;ve been
              <br />
              looking for has been
              <br />
              waiting for you to
              <br />
              stop looking.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{ ...bodyStyle, marginTop: "32px", textAlign: "left" }}
            >
              Most people spend years cycling through wellness experiences — each
              one promising change, few delivering continuity. Continuum was built
              for the person who is done cycling.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ marginTop: "40px", textAlign: "center" }}
            >
              <button
                onClick={scrollToForm}
                className="btn-pulse"
                style={{
                  display: "inline-block",
                  backgroundColor: gold,
                  color: bg,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  borderRadius: "9999px",
                  padding: "16px 32px",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  border: "none",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = goldLight; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = gold; }}
              >
                Join the Founding Circle
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── FOOTER ── */}
      <footer
        aria-label="Footer"
        style={{ backgroundColor: "#0a0806", padding: "48px 24px", textAlign: "center" }}
      >
        <p className="font-serif" style={{ fontSize: "20px", color: cream }}>
          Continuum Wellness
        </p>
        <p style={{ fontSize: "14px", color: muted, marginTop: "4px" }}>
          by Carol Ann Beasley
        </p>
        <p style={{ fontSize: "12px", color: muted, opacity: 0.5, marginTop: "24px" }}>
          © 2026 · A living memorial. A working system. Built with love.
        </p>
      </footer>

    </main>
  );
}
