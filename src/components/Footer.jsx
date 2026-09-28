import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-slate-800/80 bg-slate-950 text-white">
            {/* Decorative Glow */}
            <div
                className="pointer-events-none absolute -bottom-24 left-1/4 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl"
                aria-hidden="true"
            />

            <div
                className="pointer-events-none absolute -bottom-32 right-1/4 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-6 py-8">
                <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

                    {/* Copyright */}
                    <div className="text-center sm:text-left">
                        <p className="text-sm text-slate-400">
                            © {new Date().getFullYear()}{" "}
                            <span className="font-semibold text-white">
                                Social
                                <span className="text-cyan-400">
                                    Flow
                                </span>
                            </span>
                            {" "}by{" "}
                            <span className="font-semibold text-slate-200">
                                Md. Mustakim Billah
                            </span>
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            AI-powered social media automation
                        </p>
                    </div>

                    {/* Legal Links */}
                    <div className="flex items-center gap-3 text-sm">
                        <Link
                            to="/privacy-policy"
                            className="rounded-lg px-3 py-2 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-cyan-400"
                        >
                            Privacy Policy
                        </Link>

                        <span className="h-4 w-px bg-slate-700" />

                        <Link
                            to="/data-deletion"
                            className="rounded-lg px-3 py-2 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-cyan-400"
                        >
                            Data Deletion
                        </Link>
                    </div>
                </div>

                {/* Bottom Accent */}
                <div className="mt-7 h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent" />
            </div>
        </footer>
    );
};

export default Footer;