const steps = [
    {
        number: "01",
        title: "Connect Your Page",
        description:
            "Connect your Facebook Page to SocialFlow and give your automation a destination.",
        icon: "🔗",
    },
    {
        number: "02",
        title: "Choose Your AI",
        description:
            "Select the AI provider you want, such as OpenAI or Gemini, and define what you want to create.",
        icon: "✦",
    },
    {
        number: "03",
        title: "Schedule & Automate",
        description:
            "Set your posting time and let SocialFlow generate and publish your content automatically.",
        icon: "⚡",
    },
];

const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            className="relative overflow-hidden bg-slate-900 py-24 text-white"
        >
            {/* Background Glow */}
            <div
                className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"
                aria-hidden="true"
            />

            <div
                className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                        Simple & Automated
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        How{" "}
                        <span className="text-cyan-400">
                            SocialFlow
                        </span>{" "}
                        Works
                    </h2>

                    <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
                        Set everything up once and let SocialFlow
                        handle your daily Facebook content
                        automatically.
                    </p>
                </div>

                {/* Steps */}
                <div className="mt-16 grid gap-6 md:grid-cols-3">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="group relative rounded-2xl border border-slate-700/70 bg-slate-950/70 p-7 shadow-lg shadow-slate-950/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-500/10"
                        >
                            {/* Number */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold tracking-widest text-cyan-400">
                                    {step.number}
                                </span>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-lg text-cyan-300 transition-all duration-300 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/15 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                                    {step.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="mt-7 text-xl font-bold text-white">
                                {step.title}
                            </h3>

                            <p className="mt-3 leading-7 text-slate-400">
                                {step.description}
                            </p>

                            {/* Bottom Accent */}
                            <div className="mt-7 h-px w-12 bg-linear-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;