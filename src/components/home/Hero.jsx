import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 right-0 h-112 w-md rounded-full bg-blue-600/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20 sm:py-24 lg:py-28">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 shadow-lg shadow-cyan-500/5">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
            AI-Powered Facebook Automation
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Automate Your Facebook Content
            <span className="mt-2 block bg-linear-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:text-xl">
            Create engaging content with AI, schedule your posts, and let
            SocialFlow automatically publish them to your Facebook Page.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="group inline-flex h-12 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-400 px-7 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-400/30"
            >
              Get Started
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-600/80 bg-slate-900/60 px-7 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-slate-800/80 hover:text-white"
            >
              See How It Works
              <span className="ml-2 text-cyan-400">↓</span>
            </a>
          </div>

          {/* Supporting Text */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <span className="text-cyan-400">✓</span>
              Connect your Facebook Page
            </span>

            <span className="flex items-center gap-2">
              <span className="text-cyan-400">✓</span>
              Choose your AI provider
            </span>

            <span className="flex items-center gap-2">
              <span className="text-cyan-400">✓</span>
              Schedule & automate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



