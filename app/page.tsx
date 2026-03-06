"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.9, ease: "easeOut" as const },
};

export default function Home() {
  const { scrollY } = useScroll();

  const heroImageY = useTransform(scrollY, [0, 800], [0, 45]);
  const heroImageScale = useTransform(scrollY, [0, 800], [1.04, 1.09]);
  const heroContentY = useTransform(scrollY, [0, 500], [0, -18]);
  const heroContentOpacity = useTransform(scrollY, [0, 450], [1, 0.92]);

  return (
    <main className="relative overflow-x-hidden bg-[#f7f4ef] text-neutral-900">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          style={{ y: heroImageY, scale: heroImageScale }}
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero.jpg?v=4"
            alt="Continuum Wellness Sanctuary"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/12 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.18),transparent_25%)]" />
        <div className="absolute inset-0 backdrop-blur-[1.5px]" />

        {/* hero content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16 sm:px-6">
          <motion.div
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
              className="mx-auto mb-5 inline-flex rounded-full border border-white/25 bg-white/12 px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-md"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)] sm:text-xs">
                Coming Soon
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.15, delay: 0.2, ease: "easeOut" }}
              className="font-serif text-5xl font-light leading-[0.95] tracking-[0.02em] text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.55)] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            >
              Continuum
              <span className="mt-2 block">Wellness</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
              className="mt-5 font-serif text-lg italic text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.52)] sm:text-xl md:text-2xl"
            >
              by Carol Ann Beasley
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.48, ease: "easeOut" }}
              className="mx-auto mt-7 max-w-2xl rounded-[28px] border border-white/18 bg-black/24 px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-md sm:px-7 sm:py-5"
            >
              <p className="text-sm font-medium leading-relaxed text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.62)] sm:text-base md:text-lg">
                A sanctuary for presence, restoration, and meaningful
                belonging.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.62, ease: "easeOut" }}
              className="mt-8 flex items-center justify-center"
            >
              <a
                href="#philosophy"
                className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/12 px-5 py-3 text-xs uppercase tracking-[0.24em] text-white shadow-[0_12px_34px_rgba(0,0,0,0.18)] backdrop-blur-md transition duration-300 hover:bg-white/18"
              >
                Enter Sanctuary
                <span aria-hidden="true">↓</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section
        id="philosophy"
        className="relative bg-gradient-to-b from-[#f5f0e8] to-[#fbf8f3] px-6 py-24 sm:py-28"
      >
        <motion.div {...fadeUp} className="mx-auto max-w-5xl text-center">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500 sm:text-xs">
            The Philosophy
          </p>

          <h2 className="font-serif text-4xl font-light leading-tight text-neutral-800 sm:text-5xl md:text-6xl">
            A Space to Return
            <span className="block">to Yourself</span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base font-light leading-8 text-neutral-600 sm:text-lg">
            Continuum Wellness is envisioned as a refined sanctuary where
            stillness, renewal, and human connection meet. A place where the
            nervous system softens, attention deepens, and wellness becomes a
            lived experience rather than a passing ritual.
          </p>
        </motion.div>
      </section>

      {/* EXPERIENCE PILLARS */}
      <section className="bg-white px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-14 text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500 sm:text-xs">
              The Experience
            </p>
            <h2 className="font-serif text-4xl font-light text-neutral-800 sm:text-5xl">
              Designed for Renewal
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Retreats",
                text: "Immersive moments of pause, reflection, and restoration designed to help people reconnect with what matters most.",
              },
              {
                title: "Membership",
                text: "An ongoing circle of support and belonging for those who want wellness woven into life, not reserved for rare occasions.",
              },
              {
                title: "Practitioners",
                text: "Carefully curated modalities and trusted guides supporting mind, body, energy, and meaningful transformation.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className="group rounded-[30px] border border-white/65 bg-white/58 p-8 shadow-[0_18px_50px_rgba(25,25,25,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/66 hover:shadow-[0_24px_60px_rgba(25,25,25,0.09)]"
              >
                <div className="mb-6 h-px w-14 bg-neutral-300 transition duration-300 group-hover:w-20" />
                <h3 className="font-serif text-2xl font-light text-neutral-800">
                  {item.title}
                </h3>
                <p className="mt-5 text-[15px] font-light leading-7 text-neutral-600">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-[#f7f4ef] px-6 py-20 sm:py-24">
        <motion.div
          {...fadeUp}
          className="mx-auto grid max-w-6xl gap-5 rounded-[34px] border border-white/60 bg-white/70 p-6 shadow-[0_18px_60px_rgba(30,30,30,0.06)] backdrop-blur-xl md:grid-cols-3 md:p-8"
        >
          <div className="rounded-[24px] border border-white/70 bg-white/82 p-6 backdrop-blur-md shadow-[0_10px_30px_rgba(30,30,30,0.04)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              Atmosphere
            </p>
            <p className="mt-3 font-serif text-2xl font-light text-neutral-800">
              Quiet Luxury
            </p>
          </div>

          <div className="rounded-[24px] border border-white/70 bg-white/82 p-6 backdrop-blur-md shadow-[0_10px_30px_rgba(30,30,30,0.04)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              Intention
            </p>
            <p className="mt-3 font-serif text-2xl font-light text-neutral-800">
              Sacred Modernity
            </p>
          </div>

          <div className="rounded-[24px] border border-white/70 bg-white/82 p-6 backdrop-blur-md shadow-[0_10px_30px_rgba(30,30,30,0.04)]">
            <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500">
              Promise
            </p>
            <p className="mt-3 font-serif text-2xl font-light text-neutral-800">
              Restoration & Belonging
            </p>
          </div>
        </motion.div>
      </section>

      {/* INVITATION */}
      <section className="relative overflow-hidden bg-[#efe8de] px-6 py-24 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_42%)]" />

        <motion.div
          {...fadeUp}
          className="relative mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500 sm:text-xs">
            Private Invitation
          </p>

          <h2 className="font-serif text-4xl font-light leading-tight text-neutral-800 sm:text-5xl md:text-6xl">
            Come Home to
            <span className="block">Yourself</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-8 text-neutral-600 sm:text-lg">
            A new sanctuary is taking shape — one devoted to restoration,
            presence, and a more meaningful way of gathering, healing, and
            belonging.
          </p>

          <div className="mt-10">
            <button className="rounded-full bg-neutral-900 px-8 py-4 text-sm uppercase tracking-[0.22em] text-white shadow-[0_14px_36px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-neutral-800">
              Inquire Privately
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}