import { useAuth } from "../contexts/AuthContext.jsx";

const Navbar = ({ onMenuClick }) => {
    const { user } = useAuth();

    return (
        <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950 text-white shadow-lg">
            <div className="mx-auto flex h-18.25 max-w-350 items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left Section */}
                <div className="flex items-center">

                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xl text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
                        aria-label="Open navigation"
                    >
                        ☰
                    </button>

                    {/* Brand */}
                    <div>
                        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                            Social<span className="text-cyan-400">
                                Flow
                            </span>
                        </h2>

                        <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                            Social Media Automation
                        </p>
                    </div>
                </div>

                {/* User */}
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-2 py-1.5 transition hover:bg-white/10 sm:px-3">

                    {/* Avatar */}
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-sm font-bold shadow-md sm:h-10 sm:w-10">
                        {user?.name?.charAt(0).toUpperCase() || "U"}

                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-green-500" />
                    </div>

                    {/* User Info */}
                    <div className="hidden sm:block">
                        <p className="max-w-32 truncate text-sm font-semibold text-white">
                            {user?.name || "User"}
                        </p>

                        <p className="text-[11px] text-slate-400">
                            Account
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;