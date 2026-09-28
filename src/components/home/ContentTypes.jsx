const contentTypes = [
    {
        number: "01",
        icon: "✦",
        title: "AI Text Posts",
        description:
            "Generate engaging Facebook posts from your prompt using the AI provider you choose.",
        features: [
            "AI-generated content",
            "Choose OpenAI or Gemini",
            "Automatic scheduling",
        ],
        accent: "cyan",
    },
    {
        number: "02",
        icon: "▣",
        title: "Quote Cards",
        description:
            "Turn short AI-generated quotes into clean, eye-catching visual cards ready to publish on Facebook.",
        features: [
            "Beautiful visual cards",
            "Multiple color themes",
            "Fixed or random themes",
        ],
        accent: "blue",
    },
];

const ContentTypes = () => {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
            {/* Background Glow */}
            <div
                className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
                aria-hidden="true"
            />

            <div
                className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-6">
                {/* Section Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                        Create Your Way
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Choose Your{" "}
                        <span className="bg-linear-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                            Content Type
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
                        Create engaging content with AI and choose the format
                        that fits your Facebook Page.
                    </p>
                </div>

                {/* Content Type Cards */}
                <div className="mt-16 grid gap-7 md:grid-cols-2">
                    {contentTypes.map((type) => (
                        <div
                            key={type.number}
                            className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Card Glow */}
                            <div
                                className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl ${
                                    type.accent === "cyan"
                                        ? "bg-cyan-500/10"
                                        : "bg-blue-500/10"
                                }`}
                                aria-hidden="true"
                            />

                            {/* Top */}
                            <div className="relative flex items-center justify-between">
                                <span
                                    className={`text-sm font-bold tracking-[0.25em] ${
                                        type.accent === "cyan"
                                            ? "text-cyan-400"
                                            : "text-blue-400"
                                    }`}
                                >
                                    {type.number}
                                </span>

                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl transition-all duration-300 ${
                                        type.accent === "cyan"
                                            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 group-hover:border-cyan-400/60 group-hover:bg-cyan-400/15 group-hover:shadow-lg group-hover:shadow-cyan-500/20"
                                            : "border-blue-400/30 bg-blue-400/10 text-blue-300 group-hover:border-blue-400/60 group-hover:bg-blue-400/15 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                                    }`}
                                >
                                    {type.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative mt-8">
                                <h3 className="text-2xl font-bold text-white">
                                    {type.title}
                                </h3>

                                <p className="mt-4 max-w-xl leading-7 text-slate-400">
                                    {type.description}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="relative mt-7 space-y-3">
                                {type.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-3 text-sm text-slate-300"
                                    >
                                        <span
                                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                                type.accent === "cyan"
                                                    ? "bg-cyan-400/10 text-cyan-400"
                                                    : "bg-blue-400/10 text-blue-400"
                                            }`}
                                        >
                                            ✓
                                        </span>

                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Accent */}
                            <div
                                className={`relative mt-8 h-px w-16 transition-all duration-500 group-hover:w-full ${
                                    type.accent === "cyan"
                                        ? "bg-linear-to-r from-cyan-400 to-blue-500"
                                        : "bg-linear-to-r from-blue-400 to-cyan-500"
                                }`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContentTypes;