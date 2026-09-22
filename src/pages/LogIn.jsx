
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const initialValue = {
  email: "",
  password: "",
};

const LogIn = () => {
  const [inputData, setInputData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { logIn } = useAuth();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove previous error when user starts typing again
    if (error) {
      setError("");
    }
  };

  // Handle login submission
  const handleLogIn = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!inputData.email || !inputData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Existing AuthContext login logic
      const response = await logIn(
        inputData.email,
        inputData.password
      );

      console.log("Login successful:", response);

      // Redirect after successful login
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);

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
    <div className="min-h-screen bg-[#F7F1E8] px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">

        {/* Main Auth Container */}
        <div className="grid w-full overflow-hidden rounded-3xl border border-[#E8DCCB] bg-[#FFFDF9] shadow-[0_20px_60px_rgba(91,67,48,0.10)] lg:grid-cols-2">

          {/* Left Brand Section */}
          <div className="relative hidden overflow-hidden bg-[#5F4A3B] p-10 lg:flex lg:flex-col lg:justify-between">

            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#D99A6C]/20" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#E8B889]/10" />

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

              {/* Hero text */}
              <div className="mt-20 max-w-md">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#E8B889]">
                  Welcome back
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-tight text-[#FFF8EF]">
                  Your content.
                  <br />
                  Your schedule.
                  <br />
                  <span className="text-[#E8B889]">
                    Your flow.
                  </span>
                </h1>

                <p className="mt-6 text-sm leading-7 text-[#E8DCCB]">
                  Manage your Facebook pages, create engaging content,
                  and automate your publishing workflow from one simple
                  workspace.
                </p>
              </div>
            </div>

            {/* Bottom message */}
            <div className="relative z-10">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="text-sm leading-6 text-[#E8DCCB]">
                  ✨ Let SocialFlow handle the routine,
                  so you can focus on creating.
                </p>
              </div>
            </div>
          </div>

          {/* Right Login Form */}
          <div className="flex items-center p-6 sm:p-10 lg:p-12">

            <div className="w-full max-w-md mx-auto">

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
                  Welcome back 👋
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#3F3026]">
                  Sign in to SocialFlow
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#806F61]">
                  Enter your account details to continue managing
                  your social media automation.
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

              {/* Login Form */}
              <form
                onSubmit={handleLogIn}
                className="mt-8 space-y-5"
              >

                {/* Email */}
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
                    className="w-full rounded-xl border border-[#E3D6C8] bg-[#FFFCF7] px-4 py-3 text-sm text-[#3F3026] outline-none transition placeholder:text-[#A99A8C] focus:border-[#B8754F] focus:ring-4 focus:ring-[#B8754F]/10"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#4F4035]"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={inputData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-[#E3D6C8] bg-[#FFFCF7] px-4 py-3 pr-20 text-sm text-[#3F3026] outline-none transition placeholder:text-[#A99A8C] focus:border-[#B8754F] focus:ring-4 focus:ring-[#B8754F]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-[#806F61] transition hover:bg-[#F4EADF] hover:text-[#5F4A3B]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#5F4A3B] px-5 py-3.5 text-sm font-semibold text-[#FFF8EF] shadow-sm transition hover:bg-[#4F3D31] focus:outline-none focus:ring-4 focus:ring-[#5F4A3B]/15 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              {/* Register Link */}
              <p className="mt-7 text-center text-sm text-[#806F61]">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[#B8754F] transition hover:text-[#8F563A]"
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

