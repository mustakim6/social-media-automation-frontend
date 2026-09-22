import { useEffect, useState } from "react";
import { getExecutionStatuses } from "../services/automationApi";

const Posts = () => {
  const [executionStatuses, setExecutionStatuses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExecutionStatuses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getExecutionStatuses();

        setExecutionStatuses(response.data || []);
      } catch (error) {
        console.error("Execution status error:", error);

        setError(
          error.response?.data?.message || "Failed to load execution history",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExecutionStatuses();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Execution History</h1>

        <p className="mt-1 text-sm text-gray-500">
          Your automation execution history from the last 7 days.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading execution history...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && executionStatuses.length === 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            No execution history
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your automation execution history will appear here.
          </p>
        </div>
      )}

      {/* History List */}
      {!loading && !error && executionStatuses.length > 0 && (
        <div className="space-y-4">
          {executionStatuses.map((execution) => {
            const automation = execution.automationId;

            const executedAt = new Date(execution.executedAt).toLocaleString(
              "en-BD",
              {
                dateStyle: "medium",
                timeStyle: "short",
              },
            );

            return (
              <div
                key={execution._id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Automation info */}
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-gray-900">
                      {automation?.prompt || "Automation"}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Scheduled at {automation?.postingTime || "N/A"}{" "}
                      {automation?.timezone}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Executed: {executedAt}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                      {execution.provider}
                    </span>

                    {execution.status === "success" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        ✓ Success
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                        ✕ Failed
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Posts;
