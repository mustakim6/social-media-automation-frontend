const features = [
    {
        icon: "⚡",
        title: "Automated Posting",
        description:
            "Set your schedule once and let SocialFlow publish your content automatically.",
    },
    {
        icon: "🤖",
        title: "AI Content",
        description:
            "Generate content with the AI provider you choose for each automation.",
    },
    {
        icon: "🎨",
        title: "Quote Cards",
        description:
            "Turn AI-generated quotes into clean and attractive visual cards.",
    },
    {
        icon: "📅",
        title: "Flexible Scheduling",
        description:
            "Choose your posting time and timezone for each automation.",
    },
];

const Features = () => {
    return (
        <section className="bg-slate-950 py-20 text-white">
            <div className="mx-auto max-w-6xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold text-cyan-400">
                        FEATURES
                    </p>

                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                        Everything You Need
                    </h2>

                    <p className="mt-4 text-slate-400">
                        Simple tools to help you create and automate your
                        Facebook content.
                    </p>
                </div>

                {/* Feature Grid */}
                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-xl">
                                {feature.icon}
                            </div>

                            <h3 className="mt-5 text-lg font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;