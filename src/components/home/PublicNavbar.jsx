import { Link } from "react-router-dom";

const PublicNavbar = () => {
    return (
        <header className="sticky top-0 z-50  border-slate-800/80 bg-slate-950/95 text-white shadow-lg shadow-slate-950/20 backdrop-blur-md">
            <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
                
                {/* Brand */}
                <Link
                    to="/"
                    className="group text-2xl font-bold tracking-tight"
                >
                    Social
                    <span className="text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300">
                        Flow
                    </span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                    {/* Login */}
                    <Link
                        to="/login"
                        className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-700/80 bg-white/5 px-5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
                    >
                        Login
                    </Link>

                    {/* Get Started */}
                    <Link
                        to="/register"
                        className="group inline-flex h-11 items-center justify-center rounded-xl border border-cyan-300/50 bg-cyan-400 px-5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-300 hover:shadow-xl hover:shadow-cyan-400/25"
                    >
                        Get Started

                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default PublicNavbar;