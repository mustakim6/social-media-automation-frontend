import { useEffect, useState } from "react";
import {
    getSettings,
    updateSettings,
} from "../services/settingsApi.js";

const Settings = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        timezone: "Asia/Dhaka",
        defaultLLMProvider: "gemini",
        defaultPostingTime: "20:00",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // --------------------------------------------------
    // Load Settings
    // --------------------------------------------------

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await getSettings();

                if (response.settings) {
                    setFormData({
                        name:
                            response.settings.name ||
                            "",

                        email:
                            response.settings.email ||
                            "",

                        timezone:
                            response.settings.timezone ||
                            "Asia/Dhaka",

                        defaultLLMProvider:
                            response.settings
                                .defaultLLMProvider ||
                            "gemini",

                        defaultPostingTime:
                            response.settings
                                .defaultPostingTime ||
                            "20:00",
                    });
                }
            } catch (error) {
                console.error(
                    "Settings fetch error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                        "Failed to load settings"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    // --------------------------------------------------
    // Handle Input Changes
    // --------------------------------------------------

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear previous messages when user
        // starts changing the form again.
        setError("");
        setSuccess("");
    };

    // --------------------------------------------------
    // Save Settings
    // --------------------------------------------------

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const payload = {
                timezone: formData.timezone,
                defaultLLMProvider:
                    formData.defaultLLMProvider,
                defaultPostingTime:
                    formData.defaultPostingTime,
            };

            const response =
                await updateSettings(payload);

            if (response.settings) {
                setFormData((prev) => ({
                    ...prev,

                    timezone:
                        response.settings
                            .timezone,

                    defaultLLMProvider:
                        response.settings
                            .defaultLLMProvider,

                    defaultPostingTime:
                        response.settings
                            .defaultPostingTime,
                }));
            }

            setSuccess(
                response.message ||
                    "Settings updated successfully"
            );
        } catch (error) {
            console.error(
                "Settings update error:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Failed to update settings"
            );
        } finally {
            setSaving(false);
        }
    };

    // --------------------------------------------------
    // Loading State
    // --------------------------------------------------

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                    <div className="mt-2 h-9 w-40 animate-pulse rounded bg-slate-200" />

                    <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* --------------------------------------------------
                Page Header
            -------------------------------------------------- */}

            <div>
                <p className="text-sm font-medium text-blue-600">
                    Account & Preferences
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                    Settings
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                    Manage your profile and default
                    automation preferences.
                </p>
            </div>

            {/* --------------------------------------------------
                Messages
            -------------------------------------------------- */}

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">
                        {error}
                    </p>
                </div>
            )}

            {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                    <p className="text-sm font-medium text-green-700">
                        {success}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* --------------------------------------------------
                    Profile Information
                -------------------------------------------------- */}

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Profile Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Your basic SocialFlow account
                            information.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Name */}

                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                disabled
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none"
                            />

                            <p className="mt-1.5 text-xs text-slate-400">
                                Profile editing will be
                                added later.
                            </p>
                        </div>

                        {/* Email */}

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                disabled
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none"
                            />

                            <p className="mt-1.5 text-xs text-slate-400">
                                Email cannot be changed
                                from this page yet.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --------------------------------------------------
                    Automation Preferences
                -------------------------------------------------- */}

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Automation Preferences
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            These values will be used as
                            defaults when creating a new
                            automation.
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Default LLM Provider */}

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Default LLM Provider
                            </label>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {/* OpenAI */}

                                <label
                                    className={`flex cursor-pointer items-center rounded-xl border p-4 transition ${
                                        formData.defaultLLMProvider ===
                                        "openai"
                                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                            : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="defaultLLMProvider"
                                        value="openai"
                                        checked={
                                            formData.defaultLLMProvider ===
                                            "openai"
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        disabled={
                                            saving
                                        }
                                        className="mr-3"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            OpenAI
                                        </p>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            GPT models
                                        </p>
                                    </div>
                                </label>

                                {/* Gemini */}

                                <label
                                    className={`flex cursor-pointer items-center rounded-xl border p-4 transition ${
                                        formData.defaultLLMProvider ===
                                        "gemini"
                                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                            : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="defaultLLMProvider"
                                        value="gemini"
                                        checked={
                                            formData.defaultLLMProvider ===
                                            "gemini"
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        disabled={
                                            saving
                                        }
                                        className="mr-3"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            Gemini
                                        </p>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Google Gemini
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Posting Time */}

                        <div>
                            <label
                                htmlFor="defaultPostingTime"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Default Posting Time
                            </label>

                            <input
                                id="defaultPostingTime"
                                type="time"
                                name="defaultPostingTime"
                                value={
                                    formData.defaultPostingTime
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={saving}
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                            />

                            <p className="mt-1.5 text-xs text-slate-400">
                                Used as the default time
                                for new automations.
                            </p>
                        </div>

                        {/* Timezone */}

                        <div>
                            <label
                                htmlFor="timezone"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Default Timezone
                            </label>

                            <select
                                id="timezone"
                                name="timezone"
                                value={
                                    formData.timezone
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={saving}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                            >
                                <option value="Asia/Dhaka">
                                    Asia/Dhaka
                                </option>

                                <option value="Asia/Kolkata">
                                    Asia/Kolkata
                                </option>

                                <option value="UTC">
                                    UTC
                                </option>
                            </select>

                            <p className="mt-1.5 text-xs text-slate-400">
                                Used as the default
                                timezone for new
                                automations.
                            </p>
                        </div>
                    </div>

                    {/* Save Button */}

                    <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>
                    </div>
                </section>

                {/* --------------------------------------------------
                    Security Placeholder
                -------------------------------------------------- */}

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Security
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Password and account security
                            settings.
                        </p>
                    </div>

                    <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
                        <p className="text-sm font-medium text-slate-700">
                            Change Password
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            Password change functionality
                            will be added in the next
                            security update.
                        </p>
                    </div>
                </section>
            </form>
        </div>
    );
};

export default Settings;