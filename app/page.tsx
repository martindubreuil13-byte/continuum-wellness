"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const vp = { once: true, amount: 0.12, margin: "-60px 0px -60px 0px" };

function scrollToForm() {
  document.getElementById("founding-form")?.scrollIntoView({ behavior: "smooth" });
  window.setTimeout(() => {
    document.getElementById("founding-email")?.focus({ preventScroll: true });
  }, 800);
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
  marginBottom: "16px",
  fontFamily: "var(--font-sans)",
  opacity: 0.85,
};

const bodyStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 300,
  lineHeight: 1.75,
  color: muted,
};

const sectionClass = "cw-section";
const manifestoSectionClass = "cw-section-manifesto";
const transitionSectionClass = "cw-section-transition";
const sectionContainerClass = "cw-container";
const centeredContainerClass = "cw-container-centered";

const headingStyle: React.CSSProperties = {
  fontSize: "clamp(2.1rem, 3.8vw, 3.35rem)",
  fontWeight: 300,
  lineHeight: 1.15,
  color: cream,
  maxWidth: "768px",
};

const manifestoHeadingStyle: React.CSSProperties = {
  fontSize: "clamp(2.4rem, 4.35vw, 3.9rem)",
  fontWeight: 300,
  lineHeight: 1.15,
  color: cream,
};

const bodyColumnStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  maxWidth: "704px",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "rgba(245,240,232,0.014)",
  border: "1px solid rgba(201,169,110,0.07)",
  borderRadius: "8px",
  padding: "48px 40px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const editorialListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  listStyle: "none",
  padding: 0,
};

const listDotStyle: React.CSSProperties = {
  display: "block",
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  backgroundColor: gold,
  flexShrink: 0,
  marginTop: "11px",
  opacity: 0.85,
};

const listTextStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 300,
  lineHeight: 1.75,
  color: muted,
};

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        setFormError("Something went wrong.");
        return;
      }
      setEmail("");
      setSubmitted(true);
    } catch {
      setFormError("Something went wrong.");
      return;
    } finally {
      setSubmitting(false);
    }
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
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: navVisible ? "rgba(15,13,11,0.90)" : "transparent",
          backdropFilter: navVisible ? "blur(12px)" : "none",
          borderBottom: navVisible ? "1px solid rgba(245,240,232,0.07)" : "1px solid transparent",
          transition: "background-color 0.45s ease, backdrop-filter 0.45s ease, border-color 0.45s ease",
        }}
      >
        <div className="cw-nav-inner">
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
        </div>
      </nav>

      {/* ── SECTION 1: HERO ── */}
      <section
        id="top"
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
        <Image
          src="/images/hero.jpg"
          alt="Continuum Wellness"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,8,6,0.72) 0%, rgba(10,8,6,0.82) 60%, rgba(10,8,6,0.95) 100%)",
        }} />

        <Image
          src="/logos/cab-logo-white.png"
          alt=""
          aria-hidden="true"
          width={4096}
          height={3354}
          className="cw-hero-watermark"
        />

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
          <motion.div variants={fadeUp}>
            <Image
              src="/logos/cab-logo-white.png"
              alt=""
              aria-hidden="true"
              width={4096}
              height={3354}
              className="cw-hero-logo"
              priority
            />
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

          <motion.div variants={fadeUp} style={{
            width: "48px",
            height: "1px",
            backgroundColor: "#c9a96e",
            opacity: 0.7,
            marginBottom: "32px",
          }} />

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

          <motion.button
            variants={fadeUp}
            className="btn-pulse"
            onClick={scrollToForm}
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
        className={manifestoSectionClass}
        style={{ backgroundColor: bg }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
          className={centeredContainerClass}
        >
          <motion.p variants={fadeUp} style={eyebrowStyle}>
            Sound Familiar?
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif"
            style={manifestoHeadingStyle}
          >
            You&rsquo;re not struggling.
            <br />
            You&rsquo;re eroding.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            style={{
              margin: "32px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "620px",
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
        className={manifestoSectionClass}
        style={{ backgroundColor: surface }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger}
          className={centeredContainerClass}
        >
          <motion.p variants={fadeUp} style={eyebrowStyle}>
            The Real Issue
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-serif"
            style={manifestoHeadingStyle}
          >
            Wellness was never meant
            <br />
            to be consumed.
            <br />
            It was meant to be lived.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{ ...bodyStyle, maxWidth: "620px", margin: "32px auto 0" }}
          >
            The wellness industry is built on novelty — new modalities, new
            retreats, new frameworks. Each one delivers a peak. None of them hold
            you when the peak is over.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-serif italic"
            style={{ fontSize: "20px", color: cream, marginTop: "24px" }}
          >
            You don&rsquo;t need another experience. You need a rhythm.
          </motion.p>
        </motion.div>
      </section>

      <Divider />

      {/* ── SECTION 4: THE INTRODUCTION ── */}
      <section
        aria-label="Introducing Continuum Wellness"
        className={sectionClass}
        style={{ backgroundColor: bg }}
      >
        <div className={sectionContainerClass}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={eyebrowStyle}>
              Introducing Continuum Wellness
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={headingStyle}
            >
              Not a program. Not a platform.
              <br />
              A structured rhythm
              <br />
              you belong to.
            </motion.h2>

            <motion.div
              variants={fadeUp}
              style={{ ...bodyColumnStyle, marginTop: "28px" }}
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
            viewport={vp}
            variants={stagger}
            style={{
              marginTop: "56px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "56px",
            }}
          >
            <motion.div variants={fadeUp}>
              <h4
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: gold,
                  marginBottom: "24px",
                }}
              >
                What it is
              </h4>
              <ul style={editorialListStyle}>
                {whatItIs.map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
                  >
                    <span style={listDotStyle} />
                    <span style={listTextStyle}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h4
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: muted,
                  opacity: 0.7,
                  marginBottom: "24px",
                }}
              >
                What it is not
              </h4>
              <ul style={editorialListStyle}>
                {whatItIsNot.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <span style={{
                      color: gold,
                      fontSize: "12px",
                      lineHeight: 1,
                      marginTop: "7px",
                      flexShrink: 0,
                      opacity: 0.45,
                      fontFamily: "var(--font-sans)",
                    }}>×</span>
                    <span style={{ ...listTextStyle, opacity: 0.75 }}>{item}</span>
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
        className={sectionClass}
        style={{ backgroundColor: surface }}
      >
        <div className={sectionContainerClass}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={eyebrowStyle}>
              The Weekly Rhythm
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={headingStyle}
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
            viewport={vp}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              alignItems: "start",
              gap: "32px",
              marginTop: "72px",
            }}
          >
            {/* Card 1 — Anchor Session */}
            <motion.div
              variants={fadeUp}
              style={cardStyle}
            >
              <p className="font-serif" style={{ fontSize: "13px", letterSpacing: "0.1em", color: gold, opacity: 0.8 }}>01</p>
              <h3
                className="font-serif"
                style={{ fontSize: "1.55rem", color: cream, lineHeight: 1.2 }}
              >
                Anchor Session
              </h3>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: gold, opacity: 0.7 }}>
                Weekly · 60–75 min · All members
              </p>
              <div style={{ width: "32px", height: "1px", backgroundColor: gold, opacity: 0.3, margin: "4px 0" }} />
              <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.75, color: muted }}>
                Your weekly reset. Founder-led teaching, guided practice, and
                structured reflection. Live-first. Replay available for 7 days —
                then it&rsquo;s gone. This is a participation system, not a
                content library.
              </p>
            </motion.div>

            {/* Card 2 — Cohort Session */}
            <motion.div
              variants={fadeUp}
              style={cardStyle}
            >
              <p className="font-serif" style={{ fontSize: "13px", letterSpacing: "0.1em", color: gold, opacity: 0.8 }}>02</p>
              <h3
                className="font-serif"
                style={{ fontSize: "1.55rem", color: cream, lineHeight: 1.2 }}
              >
                Cohort Session
              </h3>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: gold, opacity: 0.7 }}>
                Weekly · 60 min · Your group of 8–12
              </p>
              <div style={{ width: "32px", height: "1px", backgroundColor: gold, opacity: 0.3, margin: "4px 0" }} />
              <p style={{ fontSize: "16px", fontWeight: 300, lineHeight: 1.75, color: muted }}>
                Your permanent small group. Facilitator-led dialogue where
                teaching becomes integration. Not recorded. Psychologically safe.
                Where you stop being an audience and start being known.
              </p>
            </motion.div>

            {/* Card 3 — 4 Pillars */}
            <motion.div
              variants={fadeUp}
              style={cardStyle}
            >
              <p className="font-serif" style={{ fontSize: "13px", letterSpacing: "0.1em", color: gold, opacity: 0.8 }}>03</p>
              <h3
                className="font-serif"
                style={{ fontSize: "1.55rem", color: cream, lineHeight: 1.2 }}
              >
                4 Pillars · 18 Modules
              </h3>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: gold, opacity: 0.7 }}>
                Across the year
              </p>
              <div style={{ width: "32px", height: "1px", backgroundColor: gold, opacity: 0.3, margin: "4px 0" }} />
              <ul style={editorialListStyle}>
                {pillars.map((pillar) => (
                  <li key={pillar.title} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: gold }}>{pillar.title}</p>
                    <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.6, color: muted }}>{pillar.body}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={vp}
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
        className={manifestoSectionClass}
        style={{ backgroundColor: bg }}
      >
        <div className={centeredContainerClass}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={eyebrowStyle}>
              Why This Exists
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={manifestoHeadingStyle}
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
            viewport={vp}
            variants={stagger}
            style={{
              margin: "40px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              maxWidth: "620px",
            }}
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
            viewport={vp}
            variants={fadeUp}
            className="font-serif italic"
            style={{ fontSize: "20px", color: cream, marginTop: "32px" }}
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
        className={sectionClass}
        style={{ backgroundColor: surface }}
      >
        <div className={sectionContainerClass}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={eyebrowStyle}>
              Is This For You?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={headingStyle}
            >
              For the person who has almost everything — and knows something
              essential is missing.
            </motion.h2>
            <motion.div
              variants={fadeUp}
              style={{ ...bodyColumnStyle, marginTop: "28px" }}
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
            viewport={vp}
            variants={stagger}
            style={{
              marginTop: "56px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "56px",
            }}
          >
            <motion.div variants={fadeUp}>
              <h3
                className="font-serif"
                style={{ fontSize: "20px", fontWeight: 300, color: gold, marginBottom: "24px" }}
              >
                You&rsquo;ll feel at home here if:
              </h3>
              <ul style={editorialListStyle}>
                {forYouIf.map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
                  >
                    <span style={listDotStyle} />
                    <span style={{ ...listTextStyle, color: cream }}>{item}</span>
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
              <ul style={editorialListStyle}>
                {notForYouIf.map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
                  >
                    <span style={{ ...listDotStyle, backgroundColor: muted, opacity: 0.35 }} />
                    <span style={{ ...listTextStyle, opacity: 0.7 }}>{item}</span>
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
        className={sectionClass}
        style={{ backgroundColor: bg }}
      >
        <div className={sectionContainerClass}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={eyebrowStyle}>
              Founding Circle · Limited to 100 Members
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={headingStyle}
            >
              Be among the first
              <br />
              to shape what
              <br />
              this becomes.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{ ...bodyStyle, maxWidth: "680px", marginTop: "28px" }}
            >
              Continuum Wellness launches in 2026. Before we open publicly, we
              are inviting 100 founding members — the people who will set the
              tone, form the first cohorts, and experience the full system from
              day one.
            </motion.p>

            <motion.div variants={fadeUp}>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: "32px 0 0",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                textAlign: "left",
                maxWidth: "520px",
              }}>
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                    }}
                  >
                    <span style={listDotStyle} />
                    <span style={{ ...listTextStyle, color: cream }}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeUp}>
              {submitted ? (
                <div
                  style={{
                    marginTop: "48px",
                    border: "1px solid rgba(201,169,110,0.1)",
                    borderRadius: "8px",
                    padding: "44px 36px",
                    maxWidth: "520px",
                  }}
                >
                  <p
                    className="font-serif"
                    style={{ fontSize: "26px", fontWeight: 300, color: cream }}
                  >
                    You&rsquo;ve been added to the Founding Circle. We&rsquo;ll share selected updates and early invitations as the journey unfolds.
                  </p>
                  <p style={{ fontSize: "16px", fontWeight: 300, color: muted, marginTop: "8px" }}>
                    We&rsquo;ll be in touch personally.
                  </p>
                  <p style={{ fontSize: "14px", fontWeight: 300, color: muted, marginTop: "18px", opacity: 0.75 }}>
                    Your request has been received.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    maxWidth: "520px",
                    margin: "48px 0 0",
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
                      id="founding-email"
                      type="email"
                      required
                      value={email}
                      disabled={submitting}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formError) setFormError("");
                      }}
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
                        textAlign: "left",
                        outline: "none",
                        transition: "border-color 0.3s ease",
                        opacity: submitting ? 0.7 : 1,
                      }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = gold; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(201,169,110,0.3)"; }}
                    />
                    <button
                      type="submit"
                      className="btn-pulse"
                      disabled={submitting}
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
                        cursor: submitting ? "default" : "pointer",
                        border: "none",
                        opacity: submitting ? 0.72 : 1,
                        transition: "background-color 0.3s ease, opacity 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!submitting) e.currentTarget.style.backgroundColor = goldLight;
                      }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = gold; }}
                    >
                      {submitting ? "Sending..." : "Request Your Founding Membership"}
                    </button>
                  </form>
                  {formError && (
                    <p
                      role="status"
                      aria-live="polite"
                      style={{ fontSize: "13px", fontWeight: 300, lineHeight: 1.6, color: gold, opacity: 0.78 }}
                    >
                      {formError}
                    </p>
                  )}
                  <p style={{ fontSize: "12px", color: muted }}>
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
        className={manifestoSectionClass}
        style={{
          background: `linear-gradient(to bottom, ${bg}, rgba(201,169,110,0.05))`,
        }}
      >
        <div className={centeredContainerClass}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger}
          >
            <motion.h2
              variants={fadeUp}
              className="font-serif"
              style={manifestoHeadingStyle}
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
              style={{ ...bodyStyle, maxWidth: "580px", margin: "32px auto 0" }}
            >
              Most people spend years cycling through wellness experiences — each
              one promising change, few delivering continuity. Continuum was built
              for the person who is done cycling.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ marginTop: "40px" }}
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
        className={transitionSectionClass}
        style={{ backgroundColor: "#0a0806", textAlign: "center" }}
      >
        <div className="cw-footer-logo-wrap">
          <Image
            src="/logos/cab-logo-white.png"
            alt="CAB Wellness"
            width={4096}
            height={3354}
            className="cw-footer-logo"
          />
        </div>
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
