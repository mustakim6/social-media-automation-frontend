import { Link } from "react-router-dom";

const FinalCTA = () => {
    return (
        <section className="bg-slate-900 px-6 py-20 text-white">
            <div className="mx-auto max-w-4xl rounded-2xl border border-slate-700 bg-slate-950 px-6 py-14 text-center shadow-xl sm:px-10">
                <p className="text-sm font-semibold text-cyan-400">
                    GET STARTED
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                    Ready to Automate Your Content?
                </h2>

                <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
                    Connect your Facebook Page, choose your AI provider,
                    and let SocialFlow handle the rest.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                        to="/register"
                        className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-cyan-300"
                    >
                        Get Started
                        <span className="ml-2">→</span>
                    </Link>

                    <Link
                        to="/login"
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-700 px-6 text-sm font-semibold text-slate-200 transition duration-300 hover:border-cyan-400/40 hover:bg-slate-800"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;