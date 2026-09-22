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

            // Redirect to login
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
        <div className="min-h-screen bg-[#F7F1E8] px-4 py-8 sm:px-6">
            <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">

                {/* Main Auth Container */}
                <div className="grid w-full overflow-hidden rounded-3xl border border-[#E8DCCB] bg-[#FFFDF9] shadow-[0_20px_60px_rgba(91,67,48,0.10)] lg:grid-cols-2">

                    {/* =================================
                        Left Brand Section
                    ================================= */}

                    <div className="relative hidden overflow-hidden bg-[#5F4A3B] p-10 lg:flex lg:flex-col lg:justify-between">

                        {/* Decorative Elements */}
                        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#E8B889]/15" />

                        <div className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-[#D99A6C]/15" />

                        <div className="relative z-10">

                            {/* Brand */}
                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8B889] text-xl font-bold text-[#5F4A3B]">
                                    S
                                </div>

                                <span className="text-xl font-bold tracking-tight text-[#FFF8EF]">
                                    SocialFlow
                                </span>

                            </div>


                            {/* Hero */}
                            <div className="mt-20 max-w-md">

                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#E8B889]">
                                    Get started
                                </p>

                                <h1 className="mt-4 text-4xl font-bold leading-tight text-[#FFF8EF]">
                                    Build your flow.
                                    <br />

                                    <span className="text-[#E8B889]">
                                        Automate the rest.
                                    </span>
                                </h1>

                                <p className="mt-6 text-sm leading-7 text-[#E8DCCB]">
                                    Create your SocialFlow account
                                    and start managing your
                                    Facebook content with a simple,
                                    automated workflow.
                                </p>

                            </div>

                        </div>


                        {/* Bottom Features */}
                        <div className="relative z-10 grid grid-cols-3 gap-3">

                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <p className="text-lg">
                                    📘
                                </p>

                                <p className="mt-2 text-xs text-[#E8DCCB]">
                                    Pages
                                </p>
                            </div>


                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <p className="text-lg">
                                    🤖
                                </p>

                                <p className="mt-2 text-xs text-[#E8DCCB]">
                                    AI
                                </p>
                            </div>


                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                <p className="text-lg">
                                    ⏰
                                </p>

                                <p className="mt-2 text-xs text-[#E8DCCB]">
                                    Schedule
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* =================================
                        Register Form
                    ================================= */}

                    <div className="flex items-center p-6 sm:p-10 lg:p-12">

                        <div className="mx-auto w-full max-w-md">

                            {/* Mobile Logo */}
                            <div className="mb-8 flex items-center gap-3 lg:hidden">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5F4A3B] text-lg font-bold text-[#E8B889]">
                                    S
                                </div>

                                <span className="text-xl font-bold text-[#5F4A3B]">
                                    SocialFlow
                                </span>

                            </div>


                            {/* Heading */}
                            <div>

                                <p className="text-sm font-medium text-[#B8754F]">
                                    Start your journey ✨
                                </p>

                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#3F3026]">
                                    Create your account
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-[#806F61]">
                                    Set up your SocialFlow account
                                    and start automating your
                                    social media workflow.
                                </p>

                            </div>


                            {/* Error Message */}
                            {error && (
                                <div className="mt-6 rounded-xl border border-[#E8B4A0] bg-[#FFF1EC] px-4 py-3">

                                    <p className="text-sm leading-5 text-[#A34F35]">
                                        {error}
                                    </p>

                                </div>
                            )}


                            {/* Success Message */}
                            {success && (
                                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                                    <p className="text-sm leading-5 text-green-700">
                                        {success}
                                    </p>

                                </div>
                            )}


                            {/* Registration Form */}
                            <form
                                onSubmit={handleRegister}
                                className="mt-8 space-y-4"
                            >

                                {/* ================= Name ================= */}
                                <div>

                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-[#4F4035]"
                                    >
                                        Full name
                                    </label>

                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={inputData.name}
                                        onChange={handleChange}
                                        placeholder="Mustakim"
                                        autoComplete="name"
                                        disabled={loading}
                                        className="w-full rounded-xl border border-[#E3D6C8] bg-[#FFFCF7] px-4 py-3 text-sm text-[#3F3026] outline-none transition placeholder:text-[#A99A8C] focus:border-[#B8754F] focus:ring-4 focus:ring-[#B8754F]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                </div>


                                {/* ================= Email ================= */}
                                <div>

                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-[#4F4035]"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={inputData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        disabled={loading}
                                        className="w-full rounded-xl border border-[#E3D6C8] bg-[#FFFCF7] px-4 py-3 text-sm text-[#3F3026] outline-none transition placeholder:text-[#A99A8C] focus:border-[#B8754F] focus:ring-4 focus:ring-[#B8754F]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                </div>


                                {/* ================= Password ================= */}
                                <div>

                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-[#4F4035]"
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
                                            value={inputData.password}
                                            onChange={handleChange}
                                            placeholder="Create a password"
                                            autoComplete="new-password"
                                            disabled={loading}
                                            className="w-full rounded-xl border border-[#E3D6C8] bg-[#FFFCF7] px-4 py-3 pr-20 text-sm text-[#3F3026] outline-none transition placeholder:text-[#A99A8C] focus:border-[#B8754F] focus:ring-4 focus:ring-[#B8754F]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (prev) => !prev
                                                )
                                            }
                                            disabled={loading}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-[#806F61] transition hover:bg-[#F4EADF] hover:text-[#5F4A3B] disabled:opacity-50"
                                        >
                                            {showPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>

                                    </div>

                                </div>


                                {/* ================= Confirm Password ================= */}
                                <div>

                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-medium text-[#4F4035]"
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
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            autoComplete="new-password"
                                            disabled={loading}
                                            className="w-full rounded-xl border border-[#E3D6C8] bg-[#FFFCF7] px-4 py-3 pr-20 text-sm text-[#3F3026] outline-none transition placeholder:text-[#A99A8C] focus:border-[#B8754F] focus:ring-4 focus:ring-[#B8754F]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    (prev) => !prev
                                                )
                                            }
                                            disabled={loading}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-[#806F61] transition hover:bg-[#F4EADF] hover:text-[#5F4A3B] disabled:opacity-50"
                                        >
                                            {showConfirmPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>

                                    </div>

                                </div>


                                {/* ================= Submit ================= */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 w-full rounded-xl bg-[#5F4A3B] px-5 py-3.5 text-sm font-semibold text-[#FFF8EF] shadow-sm transition hover:bg-[#4F3D31] focus:outline-none focus:ring-4 focus:ring-[#5F4A3B]/15 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Create account"}
                                </button>

                            </form>


                            {/* Login Link */}
                            <p className="mt-7 text-center text-sm text-[#806F61]">

                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="font-semibold text-[#B8754F] transition hover:text-[#8F563A]"
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