import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const initialValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const Register = () => {
    const [inputData, setInputData] =
        useState(initialValue);

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    // Handle all form inputs
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

    // Handle registration
    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const {
            name,
            email,
            password,
            confirmPassword,
        } = inputData;

        // Required field validation
        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError(
                "Please fill in all fields."
            );
            return;
        }

        // Password match validation
        if (password !== confirmPassword) {
            setError(
                "Passwords do not match."
            );
            return;
        }

        // Password length validation
        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters long."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await registerUser({
                name: name.trim(),
                email: email.trim(),
                password,
            });

            console.log(
                "Registration successful:",
                response
            );

            setSuccess(
                "Account created successfully! Redirecting to login..."
            );

            setInputData(initialValue);

            setTimeout(() => {
                navigate("/login", {
                    replace: true,
                });
            }, 1000);
        } catch (error) {
            console.error(
                "Registration failed:",
                error
            );

            setError(
                error?.response?.data?.message ||
                    "Registration failed. Please try again."
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
                            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
                            aria-hidden="true"
                        />

                        <div
                            className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"
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

                            {/* Hero */}
                            <div className="mt-12 max-w-md">
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                                    Get started
                                </p>

                                <h1 className="mt-3 text-3xl font-bold leading-tight text-white">
                                    Build your flow.
                                    <br />
                                    <span className="text-cyan-400">
                                        Automate the rest.
                                    </span>
                                </h1>

                                <p className="mt-5 text-sm leading-6 text-slate-400">
                                    Create your SocialFlow account
                                    and start managing your
                                    Facebook content with a simple,
                                    automated workflow.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Features */}
                        <div className="relative z-10 grid grid-cols-3 gap-3">
                            <div className="rounded-xl border border-slate-700/70 bg-white/5 p-3">
                                <p className="text-lg">
                                    📘
                                </p>

                                <p className="mt-2 text-xs text-slate-400">
                                    Pages
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-700/70 bg-white/5 p-3">
                                <p className="text-lg">
                                    🤖
                                </p>

                                <p className="mt-2 text-xs text-slate-400">
                                    AI
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-700/70 bg-white/5 p-3">
                                <p className="text-lg">
                                    ⏰
                                </p>

                                <p className="mt-2 text-xs text-slate-400">
                                    Schedule
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Register Form */}
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
                                    Start your journey ✨
                                </p>

                                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    Create your account
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Set up your SocialFlow account
                                    and start automating your
                                    social media workflow.
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

                            {/* Success */}
                            {success && (
                                <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
                                    <p className="text-sm leading-5 text-emerald-300">
                                        {success}
                                    </p>
                                </div>
                            )}

                            {/* Registration Form */}
                            <form
                                onSubmit={handleRegister}
                                className="mt-6 space-y-4"
                            >
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        Full name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={
                                            inputData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Write your name here.."
                                        autoComplete="name"
                                        disabled={loading}
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />
                                </div>

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
                                        disabled={loading}
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
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
                                            placeholder="Create a password"
                                            autoComplete="new-password"
                                            disabled={loading}
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            disabled={loading}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-800 hover:text-cyan-400 disabled:opacity-50"
                                        >
                                            {showPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        Confirm password
                                    </label>

                                    <div className="relative">
                                        <input
                                            id="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="confirmPassword"
                                            value={
                                                inputData.confirmPassword
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="Confirm your password"
                                            autoComplete="new-password"
                                            disabled={loading}
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            disabled={loading}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-800 hover:text-cyan-400 disabled:opacity-50"
                                        >
                                            {showConfirmPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-1 w-full rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-300 hover:shadow-cyan-400/20 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Create account"}
                                </button>
                            </form>

                            {/* Login Link */}
                            <p className="mt-5 text-center text-sm text-slate-500">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-cyan-400 transition hover:text-cyan-300"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;