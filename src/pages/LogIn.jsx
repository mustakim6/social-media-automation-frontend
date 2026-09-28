import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const initialValue = {
    email: "",
    password: "",
};

const LogIn = () => {
    const [inputData, setInputData] =
        useState(initialValue);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const { logIn } = useAuth();
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    // Handle login submission
    const handleLogIn = async (e) => {
        e.preventDefault();

        if (
            !inputData.email ||
            !inputData.password
        ) {
            setError(
                "Please enter your email and password."
            );

            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await logIn(
                inputData.email,
                inputData.password
            );

            console.log(
                "Login successful:",
                response
            );

            navigate("/dashboard", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Login failed:",
                error
            );

            setError(
                error?.response?.data?.message ||
                    error?.message ||
                    "Invalid email or password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-1 items-center bg-slate-950 px-4 py-8 sm:px-6">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
                {/* Main Auth Container */}
                <div className="grid w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/40 lg:grid-cols-2">

                    {/* Left Brand Section */}
                    <div className="relative hidden overflow-hidden bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 p-8 lg:flex lg:flex-col lg:justify-between">

                        {/* Decorative Glow */}
                        <div
                            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
                            aria-hidden="true"
                        />

                        <div
                            className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"
                            aria-hidden="true"
                        />

                        <div className="relative z-10">
                            {/* Brand */}
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-lg font-bold text-slate-950">
                                    S
                                </div>

                                <span className="text-xl font-bold tracking-tight text-white">
                                    Social
                                    <span className="text-cyan-400">
                                        Flow
                                    </span>
                                </span>
                            </div>

                            {/* Hero Text */}
                            <div className="mt-12 max-w-md">
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                                    Welcome back
                                </p>

                                <h1 className="mt-3 text-3xl font-bold leading-tight text-white">
                                    Your content.
                                    <br />
                                    Your schedule.
                                    <br />
                                    <span className="text-cyan-400">
                                        Your flow.
                                    </span>
                                </h1>

                                <p className="mt-5 text-sm leading-6 text-slate-400">
                                    Manage your Facebook Pages,
                                    create engaging content, and
                                    automate your publishing
                                    workflow from one workspace.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Message */}
                        <div className="relative z-10 mt-8 rounded-xl border border-slate-700/70 bg-white/5 p-4">
                            <p className="text-sm leading-6 text-slate-400">
                                <span className="text-cyan-400">
                                    ✦
                                </span>{" "}
                                Let SocialFlow handle the routine,
                                so you can focus on creating.
                            </p>
                        </div>
                    </div>

                    {/* Right Login Form */}
                    <div className="flex items-center p-6 sm:p-8 lg:p-10">
                        <div className="mx-auto w-full max-w-md">

                            {/* Mobile Logo */}
                            <div className="mb-6 flex items-center gap-3 lg:hidden">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-lg font-bold text-slate-950">
                                    S
                                </div>

                                <span className="text-xl font-bold text-white">
                                    Social
                                    <span className="text-cyan-400">
                                        Flow
                                    </span>
                                </span>
                            </div>

                            {/* Heading */}
                            <div>
                                <p className="text-sm font-medium text-cyan-400">
                                    Welcome back 👋
                                </p>

                                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    Sign in to SocialFlow
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Enter your account details to
                                    continue managing your social
                                    media automation.
                                </p>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3">
                                    <p className="text-sm leading-5 text-red-300">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Login Form */}
                            <form
                                onSubmit={handleLogIn}
                                className="mt-6 space-y-4"
                            >
                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={
                                            inputData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={
                                                inputData.password
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-800 hover:text-cyan-400"
                                        >
                                            {showPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-300 hover:shadow-cyan-400/20 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Signing in..."
                                        : "Sign in"}
                                </button>
                            </form>

                            {/* Register */}
                            <p className="mt-5 text-center text-sm text-slate-500">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;