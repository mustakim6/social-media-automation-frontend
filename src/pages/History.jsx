import { useEffect, useState } from "react";
import { getExecutionStatuses } from "../services/automationStatusApi";

const History = () => {
    const [executions, setExecutions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchExecutionHistory = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await getExecutionStatuses();

                setExecutions(response.data || []);
            } catch (error) {
                console.error(
                    "Failed to load execution history:",
                    error
                );

                setError(
                    "Failed to load execution history."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchExecutionHistory();
    }, []);

    const totalExecutions = executions.length;

    const successfulExecutions =
        executions.filter(
            (execution) =>
                execution.status === "success"
        ).length;

    const failedExecutions =
        executions.filter(
            (execution) =>
                execution.status === "failed"
        ).length;

    const formatDateTime = (date) => {
        return new Date(date).toLocaleString(
            "en-US",
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    Execution History
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    View your recent automation executions.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                    <p className="text-sm text-slate-500">
                        Loading execution history...
                    </p>
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">
                        {error}
                    </p>
                </div>
            )}

            {/* Content */}
            {!loading && !error && (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {/* Total */}
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">
                                Total Executions
                            </p>

                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {totalExecutions}
                            </p>
                        </div>

                        {/* Successful */}
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                            <p className="text-sm font-medium text-emerald-700">
                                Successful
                            </p>

                            <p className="mt-2 text-3xl font-bold text-emerald-700">
                                {successfulExecutions}
                            </p>
                        </div>

                        {/* Failed */}
                        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                            <p className="text-sm font-medium text-red-700">
                                Failed
                            </p>

                            <p className="mt-2 text-3xl font-bold text-red-700">
                                {failedExecutions}
                            </p>
                        </div>
                    </div>

                    {/* Empty State */}
                    {executions.length === 0 && (
                        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                            <h2 className="text-lg font-semibold text-slate-800">
                                No executions yet
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Your automation execution
                                history will appear here.
                            </p>
                        </div>
                    )}

                    {/* Execution List */}
                    {executions.length > 0 && (
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            {/* Table Header */}
                            <div className="border-b border-slate-200 px-5 py-4">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    Recent Executions
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your execution activity from
                                    the last 7 days.
                                </p>
                            </div>

                            {/* Desktop Table */}
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Status
                                            </th>

                                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Provider
                                            </th>

                                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Automation
                                            </th>

                                            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                Executed At
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {executions.map(
                                            (execution) => (
                                                <tr
                                                    key={
                                                        execution._id
                                                    }
                                                    className="hover:bg-slate-50"
                                                >
                                                    {/* Status */}
                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                                execution.status ===
                                                                "success"
                                                                    ? "bg-emerald-100 text-emerald-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                        >
                                                            {execution.status ===
                                                            "success"
                                                                ? "Success"
                                                                : "Failed"}
                                                        </span>
                                                    </td>

                                                    {/* Provider */}
                                                    <td className="px-5 py-4">
                                                        <span className="font-medium capitalize text-slate-700">
                                                            {
                                                                execution.provider
                                                            }
                                                        </span>
                                                    </td>

                                                    {/* Automation */}
                                                    <td className="max-w-md px-5 py-4">
                                                        <p className="truncate text-sm font-medium text-slate-800">
                                                            {execution
                                                                .automationId
                                                                ?.prompt ||
                                                                "Automation unavailable"}
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            {execution
                                                                .automationId
                                                                ?.postingTime ||
                                                                "--:--"}{" "}
                                                            •{" "}
                                                            {execution
                                                                .automationId
                                                                ?.timezone ||
                                                                "Unknown timezone"}
                                                        </p>
                                                    </td>

                                                    {/* Executed At */}
                                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                                                        {formatDateTime(
                                                            execution.executedAt
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="divide-y divide-slate-100 md:hidden">
                                {executions.map(
                                    (execution) => (
                                        <div
                                            key={
                                                execution._id
                                            }
                                            className="p-5"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        execution.status ===
                                                        "success"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {execution.status ===
                                                    "success"
                                                        ? "Success"
                                                        : "Failed"}
                                                </span>

                                                <span className="text-sm font-medium capitalize text-slate-600">
                                                    {
                                                        execution.provider
                                                    }
                                                </span>
                                            </div>

                                            <p className="mt-4 text-sm font-medium text-slate-800">
                                                {execution
                                                    .automationId
                                                    ?.prompt ||
                                                    "Automation unavailable"}
                                            </p>

                                            <div className="mt-3 space-y-1 text-xs text-slate-500">
                                                <p>
                                                    Schedule:{" "}
                                                    {execution
                                                        .automationId
                                                        ?.postingTime ||
                                                        "--:--"}
                                                </p>

                                                <p>
                                                    Timezone:{" "}
                                                    {execution
                                                        .automationId
                                                        ?.timezone ||
                                                        "Unknown timezone"}
                                                </p>

                                                <p>
                                                    Executed:{" "}
                                                    {formatDateTime(
                                                        execution.executedAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default History;