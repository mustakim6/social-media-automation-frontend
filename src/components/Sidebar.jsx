import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
const navItems = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: "▣",
    },
    {
        to: "/pages",
        label: "Pages",
        icon: "▤",
    },
    {
        to: "/automations",
        label: "Automations",
        icon: "⚡",
    },
    {
        to: "/history",
        label: "History",
        icon: "◷",
    },
    {
        to: "/settings",
        label: "Settings",
        icon: "⚙",
    },
];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden min-h-[calc(100vh-73px)] w-56 shrink-0 border-r border-slate-800/80 bg-slate-950 md:block">
                <SidebarContent navItems={navItems} />
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-full w-72 bg-slate-950 shadow-2xl transition-transform duration-300 md:hidden ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }`}
            >
                <div className="flex h-full flex-col">
                    
                    {/* Mobile Header */}
                    <div className="flex h-18.25 items-center justify-between border-b border-white/10 px-5">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-white">
                                Social<span className="text-cyan-400">
                                    Flow
                                </span>
                            </h2>

                            <p className="text-[10px] text-slate-500">
                                Social Media Automation
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
                            aria-label="Close navigation"
                        >
                            ×
                        </button>
                    </div>

                    <SidebarContent
                        navItems={navItems}
                        onNavigate={onClose}
                    />
                </div>
            </aside>
        </>
    );
};


/* Reusable Sidebar Content */

const SidebarContent = ({ navItems, onNavigate }) => {
    return (
        <div className="flex h-full flex-col p-4">

            <nav className="space-y-1.5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "border border-cyan-400/15 bg-linear-to-r from-cyan-400/15 to-blue-500/15 text-white shadow-sm"
                                    : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-base transition ${
                                        isActive
                                            ? "bg-cyan-400/10 text-cyan-300"
                                            : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                                    }`}
                                >
                                    {item.icon}
                                </span>

                                <span>{item.label}</span>

                                {isActive && (
                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto rounded-xl border border-white/5 bg-white/3 p-4">
                <p className="text-xs font-semibold text-slate-300">
                    SocialFlow
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Automate your social media presence.
                </p>
            </div>
        </div>
    );
};

export default Sidebar;