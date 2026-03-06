"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative overflow-hidden">

      {/* HERO */}
<section className="relative min-h-screen flex items-center justify-center">

  <motion.div
    initial={{ scale: 1.05 }}
    animate={{ scale: 1 }}
    transition={{ duration: 2.5, ease: "easeOut" }}
    className="absolute inset-0"
  >
    <Image
src="/images/hero.jpg?v=2"
      alt="Continuum Wellness Sanctuary"
      fill
      priority
      className="object-cover"
    />
  </motion.div>

  {/* Layered atmospheric overlays */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-black/10 to-black/40" />
  <div className="absolute inset-0 backdrop-blur-[1.5px]" />

  {/* Hero Content */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.4, ease: "easeOut" }}
    className="relative z-10 text-center px-6 max-w-3xl"
  >
    <p className="text-xs md:text-sm tracking-[0.35em] text-white/85 mb-6 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
      COMING SOON
    </p>

    <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide text-white mb-6 drop-shadow-[0_3px_18px_rgba(0,0,0,0.45)]">
      Continuum Wellness
    </h1>

    <p className="font-serif italic text-lg md:text-2xl text-white/90 mb-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
      by Carol Ann Beasley
    </p>

    <p className="text-sm md:text-lg text-white/85 leading-relaxed font-light max-w-xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
      A sanctuary for presence, restoration, and meaningful belonging.
    </p>
  </motion.div>

</section>

      {/* PHILOSOPHY */}
      <section className="bg-neutral-50 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-neutral-800 mb-10">
            A Space to Return to Yourself
          </h2>

          <p className="text-lg text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto">
            Continuum Wellness is designed as a sanctuary for presence,
            restoration, and meaningful belonging — where practices,
            people, and purpose meet in quiet harmony.
          </p>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16 text-center">
          
          <div>
            <h3 className="font-serif text-2xl text-neutral-800 mb-6">
              Retreats
            </h3>
            <p className="text-neutral-600 font-light leading-relaxed">
              Immersive gatherings designed to restore balance, deepen
              awareness, and reconnect with life’s essential rhythms.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-neutral-800 mb-6">
              Membership
            </h3>
            <p className="text-neutral-600 font-light leading-relaxed">
              An ongoing circle of support, reflection, and shared growth —
              guided by practices that nurture mind, body, and connection.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-2xl text-neutral-800 mb-6">
              Practitioners
            </h3>
            <p className="text-neutral-600 font-light leading-relaxed">
              Experienced guides offering specialized modalities that support
              renewal, integration, and holistic well-being.
            </p>
          </div>

        </div>
      </section>

      {/* INVITATION */}
      <section className="bg-neutral-100 py-32 px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-neutral-800 mb-10">
          Come Home to Yourself
        </h2>

        <p className="text-lg text-neutral-600 font-light max-w-2xl mx-auto mb-12">
          A gentle invitation to step out of noise and into presence —
          where restoration begins and belonging unfolds naturally.
        </p>

        <button className="px-10 py-4 bg-neutral-900 text-white rounded-full text-sm tracking-wide hover:bg-neutral-700 transition">
          Inquire Privately
        </button>
      </section>

    </main>
  );
}