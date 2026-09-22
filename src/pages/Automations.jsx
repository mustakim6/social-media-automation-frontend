
import { useEffect, useState } from "react";

import {
  getAutomations,
  updateAutomation,
  deleteAutomation,
  runAutomation,
} from "../services/automationApi.js";

import AutomationForm from "../components/automation/AutomationForm.jsx";

const Automations = () => {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState(null);

  // Track expanded prompts
  const [expandedPrompts, setExpandedPrompts] = useState({});

  // Track currently running automation
  const [runningAutomationId, setRunningAutomationId] =
    useState(null);

  // Fetch automations
  const fetchAutomations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAutomations();

      setAutomations(
        Array.isArray(response.automations)
          ? response.automations
          : [],
      );
    } catch (error) {
      console.error(
        "Automation fetch error:",
        error,
      );

      setError(
        error.response?.data?.message ||
          "Failed to load automations",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutomations();
  }, []);

  // Toggle prompt expand/collapse
  const togglePrompt = (automationId) => {
    setExpandedPrompts((prev) => ({
      ...prev,
      [automationId]: !prev[automationId],
    }));
  };

  // Open create form
  const handleCreate = () => {
    setEditingAutomation(null);
    setError("");
    setShowForm(true);
  };

  // Open edit form
  const handleEdit = (automation) => {
    setEditingAutomation(automation);
    setError("");
    setShowForm(true);
  };

  // Close form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAutomation(null);
    setError("");
  };

  // Create / Update success
  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingAutomation(null);

    await fetchAutomations();
  };

  // Run automation manually
  const handleRunNow = async (automationId) => {
    try {
      setError("");
      setRunningAutomationId(automationId);

      await runAutomation(automationId);

      await fetchAutomations();
    } catch (error) {
      console.error(
        "Automation run error:",
        error,
      );

      setError(
        error.response?.data?.message ||
          "Failed to run automation",
      );
    } finally {
      setRunningAutomationId(null);
    }
  };

  // Toggle active / paused
  const handleToggle = async (automation) => {
    try {
      setError("");

      await updateAutomation(
        automation._id,
        {
          isActive: !automation.isActive,
        },
      );

      await fetchAutomations();
    } catch (error) {
      console.error(
        "Automation toggle error:",
        error,
      );

      setError(
        error.response?.data?.message ||
          "Failed to update automation",
      );
    }
  };

  // Delete automation
  const handleDelete = async (automationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this automation?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteAutomation(automationId);

      setAutomations((prev) =>
        prev.filter(
          (item) => item._id !== automationId,
        ),
      );

      // Remove expanded state for deleted automation
      setExpandedPrompts((prev) => {
        const updated = { ...prev };

        delete updated[automationId];

        return updated;
      });
    } catch (error) {
      console.error(
        "Automation delete error:",
        error,
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete automation",
      );
    }
  };

  const activeCount = automations.filter(
    (automation) => automation.isActive,
  ).length;

  const pausedCount =
    automations.length - activeCount;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Automation Center
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Automations
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Create and manage your automated Facebook
            Page posting workflows.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={handleCreate}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + Create Automation
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Create / Edit Form */}
      {showForm && (
        <AutomationForm
          automation={editingAutomation}
          onCancel={handleCancelForm}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Stats */}
      {!loading && !showForm && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Automations
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {automations.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Active
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {activeCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Paused
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {pausedCount}
            </p>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && !showForm && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            Loading automations...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading &&
        !showForm &&
        !error &&
        automations.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
              ⚡
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No automations yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Create your first automation to start
              publishing posts automatically.
            </p>

            <button
              type="button"
              onClick={handleCreate}
              className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Create Automation
            </button>
          </div>
        )}

      {/* Automation List */}
      {!loading &&
        !showForm &&
        automations.length > 0 && (
          <div className="space-y-4">
            {automations.map((automation) => {
              const page =
                automation.facebookPageId;

              const nextRun =
                automation.nextRunAt
                  ? new Date(
                      automation.nextRunAt,
                    ).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Not scheduled";

              const isExpanded =
                !!expandedPrompts[
                  automation._id
                ];

              const isRunning =
                runningAutomationId ===
                  automation._id ||
                automation.isRunning;

              return (
                <div
                  key={automation._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  {/* Top */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold text-slate-900">
                          {page?.pageName ||
                            "Facebook Page"}
                        </h2>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            automation.isActive
                              ? "bg-green-50 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {automation.isActive
                            ? "Active"
                            : "Paused"}
                        </span>

                        {automation.isRunning && (
                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                            Running
                          </span>
                        )}
                      </div>

                      {/* Prompt */}
                      <div className="mt-2">
                        <p
                          className={`text-sm text-slate-500 ${
                            isExpanded
                              ? ""
                              : "line-clamp-2"
                          }`}
                        >
                          {automation.prompt}
                        </p>

                        {/* Expand / Collapse */}
                        <button
                          type="button"
                          onClick={() =>
                            togglePrompt(
                              automation._id,
                            )
                          }
                          className="mt-1 text-xs font-medium text-blue-600 transition hover:text-blue-800"
                        >
                          {isExpanded
                            ? "Show less"
                            : "Show more"}
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 flex-wrap gap-2">
                      {/* Run Now */}
                      <button
                        type="button"
                        onClick={() =>
                          handleRunNow(
                            automation._id,
                          )
                        }
                        disabled={
                          isRunning ||
                          !automation.isActive
                        }
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isRunning
                          ? "Running..."
                          : "Run Now"}
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            automation,
                          )
                        }
                        disabled={isRunning}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Edit
                      </button>

                      {/* Pause / Resume */}
                      <button
                        type="button"
                        onClick={() =>
                          handleToggle(
                            automation,
                          )
                        }
                        disabled={isRunning}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {automation.isActive
                          ? "Pause"
                          : "Resume"}
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            automation._id,
                          )
                        }
                        disabled={isRunning}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Content Type
                      </p>

                      <p className="mt-1 text-sm font-medium capitalize text-slate-700">
                        {automation.contentType?.replace(
                          /_/g,
                          " ",
                        ) || "Text Only"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Provider
                      </p>

                      <p className="mt-1 text-sm font-medium capitalize text-slate-700">
                        {automation.llmProvider}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Posting Time
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {automation.postingTime}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Next Run
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {nextRun}
                      </p>
                    </div>
                  </div>

                  {/* Card Details */}
                  {automation.contentType ===
                    "card" && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        Template:{" "}
                        {automation.cardTemplate ||
                          "quote"}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
                        Theme Mode:{" "}
                        {automation.cardColorMode ||
                          "fixed"}
                      </span>

                      {automation.cardColorMode ===
                        "fixed" && (
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                          Theme:{" "}
                          {automation.cardTheme ||
                            "midnight"}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
};

export default Automations;
