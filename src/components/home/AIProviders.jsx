const providers = [
    {
        name: "OpenAI",
        description:
            "Generate engaging content using OpenAI's language models.",
        accent: "cyan",
    },
    {
        name: "Gemini",
        description:
            "Create natural and creative content with Google's Gemini.",
        accent: "blue",
    },
];

const AIProviders = () => {
    return (
        <section className="bg-slate-900 py-20 text-white">
            <div className="mx-auto max-w-6xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold text-cyan-400">
                        AI POWERED
                    </p>

                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                        Choose Your AI Provider
                    </h2>

                    <p className="mt-4 text-slate-400">
                        Select the AI provider you want to use for generating
                        your Facebook content.
                    </p>
                </div>

                {/* Providers */}
                <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
                    {providers.map((provider) => (
                        <div
                            key={provider.name}
                            className="rounded-2xl border border-slate-700 bg-slate-950 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${
                                        provider.accent === "cyan"
                                            ? "bg-cyan-400/10 text-cyan-400"
                                            : "bg-blue-400/10 text-blue-400"
                                    }`}
                                >
                                    AI
                                </div>

                                <h3 className="text-xl font-semibold">
                                    {provider.name}
                                </h3>
                            </div>

                            <p className="mt-5 leading-7 text-slate-400">
                                {provider.description}
                            </p>

                            <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                                <span className="text-cyan-400">✓</span>
                                Available for content generation
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AIProviders;