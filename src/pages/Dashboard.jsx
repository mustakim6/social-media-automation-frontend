import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getDashboardData } from "../services/dashboardApi";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Stores all dashboard data received from backend
    const [dashboard, setDashboard] =
        useState(null);

    // Controls the initial loading state
    const [loading, setLoading] =
        useState(true);

    // Stores API error message
    const [error, setError] =
        useState("");

    // Fetch dashboard data when the page loads
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await getDashboardData();

                // Backend response:
                // {
                //     status: "OK",
                //     data: {
                //         overview: {...},
                //         executionSummary: {...},
                //         upcomingAutomations: [...],
                //         recentActivity: [...]
                //     }
                // }

                setDashboard(
                    response.data || null
                );
            } catch (error) {
                console.error(
                    "Dashboard fetch error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                        "Failed to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    // Logout user and redirect to login page
    const handleLogout = async () => {
        try {
            await logout();

            navigate("/login", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Logout failed:",
                error
            );
        }
    };

    /*
     * Keep the dashboard values in variables.
     *
     * Optional chaining is used because dashboard
     * is null while the API request is loading.
     */
    const overview =
        dashboard?.overview || {};

    const executionSummary =
        dashboard?.executionSummary || {};

    const upcomingAutomations =
        dashboard?.upcomingAutomations || [];

    const recentActivity =
        dashboard?.recentActivity || [];

    return (
        <div className="min-h-full space-y-8">

            {/* =====================================================
                Welcome Header
            ====================================================== */}
            <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <p className="text-sm font-medium text-blue-600">
                            Welcome back
                        </p>

                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                            {user?.name || "User"}
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-slate-500">
                            Manage your Facebook Pages and
                            automation workflows from one place.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        Logout
                    </button>

                </div>
            </div>


            {/* =====================================================
                Error State
            ====================================================== */}
            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
                    <p className="text-sm font-medium text-red-700">
                        {error}
                    </p>
                </div>
            )}


            {/* =====================================================
                Hero Card
            ====================================================== */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 via-blue-950 to-blue-900 p-7 shadow-lg">

                {/* Background decorations */}
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/20 blur-2xl" />

                <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative max-w-2xl">

                    <span className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                        ✨ SocialFlow
                    </span>

                    <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                        Automate your social media.
                        <span className="text-cyan-300">
                            {" "}Grow your presence.
                        </span>
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                        Connect your Facebook Page, create
                        automation workflows, and let SocialFlow
                        handle your publishing schedule.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/automations")
                        }
                        className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100"
                    >
                        Create Automation →
                    </button>

                </div>
            </div>


            {/* =====================================================
                Overview Statistics
            ====================================================== */}

            {loading ? (

                // Loading skeleton/cards
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white"
                        />
                    ))}

                </div>

            ) : (

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Connected Pages */}
                    <StatCard
                        title="Connected Pages"
                        value={
                            overview.totalPages ?? 0
                        }
                        description="Active Facebook Pages"
                        icon="📘"
                        iconClass="bg-blue-50"
                    />


                    {/* Total Automations */}
                    <StatCard
                        title="Total Automations"
                        value={
                            overview.totalAutomations ?? 0
                        }
                        description="All automation workflows"
                        icon="⚡"
                        iconClass="bg-purple-50"
                    />


                    {/* Active Automations */}
                    <StatCard
                        title="Active Automations"
                        value={
                            overview.activeAutomations ?? 0
                        }
                        description="Currently running"
                        icon="▶"
                        iconClass="bg-green-50"
                    />


                    {/* Paused Automations */}
                    <StatCard
                        title="Paused Automations"
                        value={
                            overview.pausedAutomations ?? 0
                        }
                        description="Currently paused"
                        icon="Ⅱ"
                        iconClass="bg-amber-50"
                    />

                </div>
            )}


            {/* =====================================================
                Execution Summary
                Last 7 Days
            ====================================================== */}

            <section>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Execution Summary
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Automation execution results from the last 7 days.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* Successful executions */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Successful
                                </p>

                                <p className="mt-2 text-3xl font-bold text-green-600">
                                    {loading
                                        ? "—"
                                        : executionSummary.successful ??
                                          0}
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl">
                                ✓
                            </div>

                        </div>

                    </div>


                    {/* Failed executions */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-medium text-slate-500">
                                    Failed
                                </p>

                                <p className="mt-2 text-3xl font-bold text-red-600">
                                    {loading
                                        ? "—"
                                        : executionSummary.failed ??
                                          0}
                                </p>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-xl">
                                !
                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* =====================================================
                Upcoming Automations
            ====================================================== */}

            <section>
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Upcoming Automations
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Your next scheduled automation runs.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/automations")
                        }
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        View all →
                    </button>

                </div>


                {loading ? (

                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <p className="text-sm text-slate-500">
                            Loading upcoming automations...
                        </p>
                    </div>

                ) : upcomingAutomations.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
                            ⚡
                        </div>

                        <h3 className="mt-3 text-sm font-semibold text-slate-900">
                            No upcoming automations
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            Create an active automation to schedule your next post.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/automations")
                            }
                            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                        >
                            Create Automation
                        </button>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {upcomingAutomations.map(
                            (automation) => {

                                const page =
                                    automation.facebookPageId;

                                const nextRun =
                                    automation.nextRunAt
                                        ? new Date(
                                              automation.nextRunAt
                                          ).toLocaleString(
                                              "en-BD",
                                              {
                                                  dateStyle:
                                                      "medium",
                                                  timeStyle:
                                                      "short",
                                              }
                                          )
                                        : "Not scheduled";

                                return (
                                    <div
                                        key={
                                            automation._id
                                        }
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                                    >

                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                            <div className="min-w-0">

                                                <div className="flex flex-wrap items-center gap-2">

                                                    <h3 className="truncate text-sm font-semibold text-slate-900">
                                                        {page?.pageName ||
                                                            "Facebook Page"}
                                                    </h3>

                                                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium capitalize text-green-700">
                                                        {automation.llmProvider}
                                                    </span>

                                                </div>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Daily at{" "}
                                                    {
                                                        automation.postingTime
                                                    }{" "}
                                                    ·{" "}
                                                    {
                                                        automation.timezone
                                                    }
                                                </p>

                                            </div>


                                            <div className="shrink-0 text-left sm:text-right">

                                                <p className="text-xs text-slate-400">
                                                    Next run
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-slate-700">
                                                    {nextRun}
                                                </p>

                                            </div>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>
                )}
            </section>


            {/* =====================================================
                Recent Activity
            ====================================================== */}

            <section>
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Recent Activity
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Latest automation execution activity.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/history")
                        }
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        View history →
                    </button>

                </div>


                {loading ? (

                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <p className="text-sm text-slate-500">
                            Loading recent activity...
                        </p>
                    </div>

                ) : recentActivity.length === 0 ? (

                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">

                        <p className="text-sm text-slate-500">
                            No execution activity in the last 7 days.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                        {recentActivity.map(
                            (activity, index) => {

                                /*
                                 * If the automation was deleted,
                                 * automationId can be null because
                                 * the referenced Automation document
                                 * no longer exists.
                                 */
                                const automation =
                                    activity.automationId;

                                const executedAt =
                                    activity.executedAt
                                        ? new Date(
                                              activity.executedAt
                                          ).toLocaleString(
                                              "en-BD",
                                              {
                                                  dateStyle:
                                                      "medium",
                                                  timeStyle:
                                                      "short",
                                              }
                                          )
                                        : "Unknown time";

                                return (
                                    <div
                                        key={
                                            activity._id
                                        }
                                        className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${
                                            index !==
                                            recentActivity.length -
                                                1
                                                ? "border-b border-slate-100"
                                                : ""
                                        }`}
                                    >

                                        <div className="flex min-w-0 items-start gap-3">

                                            {/* Status icon */}
                                            <div
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                                    activity.status ===
                                                    "success"
                                                        ? "bg-green-50 text-green-600"
                                                        : "bg-red-50 text-red-600"
                                                }`}
                                            >
                                                {activity.status ===
                                                "success"
                                                    ? "✓"
                                                    : "!"}
                                            </div>


                                            <div className="min-w-0">

                                                <p className="text-sm font-medium text-slate-800">

                                                    {automation
                                                        ? "Automation executed"
                                                        : "Deleted automation executed"}

                                                </p>

                                                <p className="mt-1 truncate text-xs text-slate-500">

                                                    {automation?.prompt ||
                                                        "Automation details are no longer available."}

                                                </p>

                                            </div>

                                        </div>


                                        <div className="shrink-0 sm:text-right">

                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                                                    activity.status ===
                                                    "success"
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-red-50 text-red-700"
                                                }`}
                                            >
                                                {
                                                    activity.status
                                                }
                                            </span>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {executedAt}
                                            </p>

                                        </div>

                                    </div>
                                );
                            }
                        )}

                    </div>
                )}
            </section>


            {/* =====================================================
                Quick Actions
            ====================================================== */}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Quick Actions
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Quickly access your most important SocialFlow actions.
                    </p>
                </div>


                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    {/* Connect Facebook Page */}
                    <QuickAction
                        icon="📘"
                        title="Connect Facebook Page"
                        description="Connect a Page to start automation."
                        onClick={() =>
                            navigate("/pages")
                        }
                        hoverClass="hover:border-blue-200 hover:bg-blue-50/50"
                        iconClass="bg-blue-50"
                    />


                    {/* Create Automation */}
                    <QuickAction
                        icon="⚡"
                        title="Create Automation"
                        description="Set up an automated posting workflow."
                        onClick={() =>
                            navigate("/automations")
                        }
                        hoverClass="hover:border-purple-200 hover:bg-purple-50/50"
                        iconClass="bg-purple-50"
                    />


                    {/* View History */}
                    <QuickAction
                        icon="◷"
                        title="View History"
                        description="Check your recent execution activity."
                        onClick={() =>
                            navigate("/history")
                        }
                        hoverClass="hover:border-green-200 hover:bg-green-50/50"
                        iconClass="bg-green-50"
                    />

                </div>

            </section>

        </div>
    );
};


/* =============================================================
   Reusable Stat Card
============================================================= */

const StatCard = ({
    title,
    value,
    description,
    icon,
    iconClass,
}) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${iconClass}`}
                >
                    {icon}
                </div>

            </div>

            <p className="mt-4 text-xs text-slate-400">
                {description}
            </p>

        </div>
    );
};


/* =============================================================
   Reusable Quick Action Card
============================================================= */

const QuickAction = ({
    icon,
    title,
    description,
    onClick,
    hoverClass,
    iconClass,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition ${hoverClass}`}
        >

            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg transition group-hover:scale-105 ${iconClass}`}
            >
                {icon}
            </div>

            <div className="min-w-0">

                <h3 className="text-sm font-semibold text-slate-800">
                    {title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                    {description}
                </p>

            </div>

            <span className="ml-auto text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500">
                →
            </span>

        </button>
    );
};

export default Dashboard;