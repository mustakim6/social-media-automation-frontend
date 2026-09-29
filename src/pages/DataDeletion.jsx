
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import dataDeletion from "../data/legal/dataDeletion";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

const DataDeletion = () => {
    const [searchParams] =
        useSearchParams();

    const confirmationCode =
        searchParams.get("code");

    const [status, setStatus] =
        useState(
            confirmationCode
                ? "loading"
                : "instructions"
        );

    const [deletionData, setDeletionData] =
        useState(null);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (!confirmationCode) {
            return;
        }

        const fetchDeletionStatus =
            async () => {
                try {
                    setStatus("loading");
                    setError("");

                    const response =
                        await fetch(
                            `${API_URL}/facebook/webhook/data-deletion-status/${confirmationCode}`
                        );

                    const data =
                        await response.json();

                    if (!response.ok) {
                        throw new Error(
                            data?.message ||
                            "Data deletion request not found."
                        );
                    }

                    setDeletionData(
                        data.data
                    );

                    setStatus("success");
                } catch (error) {
                    console.error(
                        "Data deletion status error:",
                        error
                    );

                    setError(
                        error.message ||
                        "Something went wrong while checking your data deletion request."
                    );

                    setStatus("error");
                }
            };

        fetchDeletionStatus();
    }, [confirmationCode]);

    /*
     * =====================================================
     * Data Deletion Confirmation
     * =====================================================
     */

    if (confirmationCode) {
        return (
            <main className="min-h-screen bg-base-100">
                <div className="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-12">
                    <div className="w-full rounded-2xl bg-base-200 p-6 shadow-lg sm:p-8">

                        {/* Loading */}
                        {status === "loading" && (
                            <div className="text-center">
                                <span className="loading loading-spinner loading-lg text-primary"></span>

                                <h1 className="mt-6 text-2xl font-bold">
                                    Checking your request
                                </h1>

                                <p className="mt-3 text-base-content/70">
                                    Please wait while we
                                    check your data
                                    deletion request.
                                </p>
                            </div>
                        )}

                        {/* Success */}
                        {status === "success" && (
                            <div className="text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                                    <svg
                                        className="h-8 w-8 text-success"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>

                                <h1 className="mt-5 text-2xl font-bold">
                                    Data Deletion Request Completed
                                </h1>

                                <p className="mx-auto mt-3 max-w-lg leading-7 text-base-content/70">
                                    Your Facebook data
                                    deletion request
                                    has been received
                                    and processed
                                    successfully.
                                </p>

                                {/* Confirmation Code */}
                                <div className="mt-6 rounded-xl bg-base-100 p-4 text-left">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
                                        Confirmation Code
                                    </p>

                                    <p className="mt-2 break-all rounded-lg bg-base-200 p-3 font-mono text-sm">
                                        {deletionData?.confirmationCode ||
                                            confirmationCode}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="mt-4 flex items-center justify-between rounded-xl border border-success/20 bg-success/10 p-4">
                                    <span className="text-sm font-medium">
                                        Status
                                    </span>

                                    <span className="badge badge-success capitalize">
                                        {deletionData?.status ||
                                            "completed"}
                                    </span>
                                </div>

                                {/* Completed Date */}
                                {deletionData?.completedAt && (
                                    <p className="mt-5 text-sm text-base-content/60">
                                        Completed on{" "}
                                        {new Date(
                                            deletionData.completedAt
                                        ).toLocaleString()}
                                    </p>
                                )}

                                <div className="mt-6 border-t border-base-content/10 pt-5">
                                    <p className="text-xs leading-5 text-base-content/50">
                                        Please keep this
                                        confirmation code
                                        for your records.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {status === "error" && (
                            <div className="text-center">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error/15">
                                    <svg
                                        className="h-8 w-8 text-error"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>

                                <h1 className="mt-5 text-2xl font-bold">
                                    Request Not Found
                                </h1>

                                <p className="mx-auto mt-3 max-w-lg leading-7 text-base-content/70">
                                    {error}
                                </p>

                                <div className="mt-6 rounded-xl bg-base-100 p-4 text-left">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
                                        Confirmation Code
                                    </p>

                                    <p className="mt-2 break-all rounded-lg bg-base-200 p-3 font-mono text-sm">
                                        {confirmationCode}
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        );
    }

    /*
     * =====================================================
     * Normal Data Deletion Instructions Page
     * =====================================================
     */

    return (
        <main className="min-h-screen bg-base-100">
            <div className="mx-auto max-w-4xl px-6 py-12">

                <h1 className="text-4xl font-bold">
                    {dataDeletion.title}
                </h1>

                <p className="mt-2 text-sm text-base-content/60">
                    Last updated:{" "}
                    {dataDeletion.lastUpdated}
                </p>

                <div className="mt-10 space-y-8">
                    {dataDeletion.sections.map(
                        (section) => (
                            <section
                                key={section.title}
                            >
                                <h2 className="text-xl font-semibold">
                                    {section.title}
                                </h2>

                                <p className="mt-3 leading-7 text-base-content/80">
                                    {section.content}
                                </p>
                            </section>
                        )
                    )}
                </div>

            </div>
        </main>
    );
};

export default DataDeletion;
