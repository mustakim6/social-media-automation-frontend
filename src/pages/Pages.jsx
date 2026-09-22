import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    getFacebookPages,
    getAvailableFacebookPages,
    connectSelectedFacebookPage,
    disconnectFacebookPage,
} from "../services/facebookApi";

const Pages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
const [connecting, setConnecting] = useState(false);
  // Connected Pages
  const [pages, setPages] = useState([]);

  // Available Pages from Facebook OAuth
  const [availablePages, setAvailablePages] = useState([]);

  // Selected Page
  const [selectedPageId, setSelectedPageId] = useState(null);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [availablePagesLoading, setAvailablePagesLoading] = useState(false);

  // Action states
  const [disconnectingId, setDisconnectingId] = useState(null);

  // Error
  const [error, setError] = useState("");

  // Get OAuth session ID from URL
  const sessionId = searchParams.get("sessionId");

  // --------------------------------------------------
  // Facebook Connect
  // --------------------------------------------------

  const handleConnectFacebook = () => {
  window.location.href =
    `${import.meta.env.VITE_API_URL}/facebook/connect`;
};

  // --------------------------------------------------
  // Load already connected Pages
  // --------------------------------------------------

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getFacebookPages();

        console.log("Connected Facebook Pages:", response);

        setPages(response.pages || []);
      } catch (error) {
        console.error("Failed to load Facebook Pages:", error);

        setError("Failed to load Facebook Pages");
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  // --------------------------------------------------
  // Load Available Pages after Facebook OAuth
  // --------------------------------------------------

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    const loadAvailablePages = async () => {
      try {
        setAvailablePagesLoading(true);
        setError("");

        const response = await getAvailableFacebookPages(sessionId);

        console.log("Available Facebook Pages:", response);

        setAvailablePages(response.pages || []);
      } catch (error) {
        console.error("Failed to load available Facebook Pages:", error);

        setError("Failed to load available Facebook Pages");
      } finally {
        setAvailablePagesLoading(false);
      }
    };

    loadAvailablePages();
  }, [sessionId]);

  // --------------------------------------------------
  // Select Available Page
  // --------------------------------------------------

  const handleSelectAvailablePage = (pageId) => {
    setSelectedPageId(pageId);
  };

  const handleConnectSelectedPage = async () => {
    if (!sessionId || !selectedPageId) {
        return;
    }

    try {
        setConnecting(true);
        setError("");

        const response = await connectSelectedFacebookPage(
            sessionId,
            selectedPageId
        );

        console.log(
            "Selected Facebook Page connected:",
            response
        );

        // Add newly connected page to connected pages
        if (response.page) {
            setPages((prevPages) => [
                ...prevPages,
                response.page,
            ]);
        }

        // Clear OAuth selection state
        setAvailablePages([]);
        setSelectedPageId(null);

        // Remove sessionId from URL
        setSearchParams({});

    } catch (error) {
        console.error(
            "Failed to connect selected Facebook Page:",
            error
        );

        setError(
            error?.response?.data?.message ||
            "Failed to connect Facebook Page"
        );

    } finally {
        setConnecting(false);
    }
};

  // --------------------------------------------------
  // Disconnect Connected Page
  // --------------------------------------------------

  const handleDisconnect = async (pageId, pageName) => {
    const confirmed = window.confirm(
      `Are you sure you want to disconnect "${pageName}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDisconnectingId(pageId);
      setError("");

      await disconnectFacebookPage(pageId);

      setPages((prevPages) =>
        prevPages.filter((page) => page.pageId !== pageId),
      );
    } catch (error) {
      console.error("Failed to disconnect Facebook Page:", error);

      setError("Failed to disconnect Facebook Page");
    } finally {
      setDisconnectingId(null);
    }
  };

  // --------------------------------------------------
  // Clear OAuth URL
  // --------------------------------------------------

  const clearOAuthParams = () => {
    setSearchParams({});
    setAvailablePages([]);
    setSelectedPageId(null);
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="min-h-full">
      {/* ==================================================
                HEADER
            ================================================== */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">
            Facebook Integration
          </p>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Facebook Pages
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Connect and manage the Facebook Pages you want to automate with
            SocialFlow.
          </p>
        </div>

        <button
          onClick={handleConnectFacebook}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <span className="text-lg leading-none">+</span>
          Connect Page
        </button>
      </div>

      {/* ==================================================
                ERROR
            ================================================== */}

      {error && (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-red-600">{error}</p>

          <button
            onClick={() => setError("")}
            className="w-fit text-xs font-medium text-red-500 hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ==================================================
                FACEBOOK OAUTH - AVAILABLE PAGES
            ================================================== */}

      {sessionId && (
        <div className="mb-10">
          {/* Section Header */}

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>

                <p className="text-sm font-medium text-green-600">
                  Facebook Connected
                </p>
              </div>

              <h2 className="text-xl font-bold text-slate-800">
                Select a Facebook Page
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose the Page you want to connect with SocialFlow.
              </p>
            </div>

            <button
              onClick={clearOAuthParams}
              className="w-fit text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          {/* Available Pages Loading */}

          {availablePagesLoading && (
            <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"></div>
                Loading available Pages...
              </div>
            </div>
          )}

          {/* No Available Pages */}

          {!availablePagesLoading && availablePages.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                📘
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-800">
                No available Pages
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                We couldn't find any Facebook Pages available for connection.
              </p>
            </div>
          )}

          {/* Available Pages */}

          {!availablePagesLoading && availablePages.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {availablePages.map((page) => {
                  const isSelected = selectedPageId === page.pageId;

                  return (
                    <button
                      key={page.pageId}
                      type="button"
                      onClick={() => handleSelectAvailablePage(page.pageId)}
                      className={`group w-full rounded-2xl border p-5 text-left transition sm:p-6 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Icon */}

                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl transition ${
                            isSelected
                              ? "bg-blue-100"
                              : "bg-slate-100 group-hover:bg-blue-50"
                          }`}
                        >
                          📘
                        </div>

                        {/* Page Info */}

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-base font-semibold text-slate-800">
                            {page.pageName}
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            Facebook Page
                          </p>
                        </div>

                        {/* Selection Circle */}

                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                            isSelected
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-slate-300 text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Page Action */}

              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    {selectedPageId ? "Page selected" : "Select a Page"}
                  </p>

                  <p className="mt-1 text-sm text-blue-700">
                    {selectedPageId
                      ? "This Page is ready to be connected to SocialFlow."
                      : "Choose one of the Pages above to continue."}
                  </p>
                </div>

                <button
    type="button"
    onClick={handleConnectSelectedPage}
    disabled={!selectedPageId || connecting}
    className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
>
    {connecting
        ? "Connecting..."
        : "Connect Selected Page"}
</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ==================================================
                CONNECTED PAGES
            ================================================== */}

      {!loading && (
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-800">
              Connected Pages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Pages currently connected to SocialFlow.
            </p>
          </div>

          {/* No Connected Pages */}

          {pages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                📘
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-800">
                No Facebook Page connected
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Connect a Facebook Page to start creating, scheduling, and
                automatically publishing posts with SocialFlow.
              </p>

              <button
                onClick={handleConnectFacebook}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Connect Your Page
              </button>
            </div>
          ) : (
            /* Connected Page Cards */

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {pages.map((page) => {
                const isDisconnecting = disconnectingId === page.pageId;

                return (
                  <div
                    key={page._id || page.pageId}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:p-6"
                  >
                    {/* Page Header */}

                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-2xl">
                        📘
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <h3 className="truncate text-lg font-semibold text-slate-800">
                            {page.pageName}
                          </h3>

                          <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                            ● Connected
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                          Facebook Page
                        </p>
                      </div>
                    </div>

                    {/* Page Info */}

                    <div className="mt-6 rounded-xl bg-slate-50 p-4">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-sm text-slate-500">Page ID</span>

                        <span className="break-all text-sm font-medium text-slate-700 sm:max-w-[65%] sm:text-right">
                          {page.pageId}
                        </span>
                      </div>

                      {page.connectedAt && (
                        <div className="mt-3 flex flex-col gap-1 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-sm text-slate-500">
                            Connected
                          </span>

                          <span className="text-sm font-medium text-slate-700">
                            {new Date(page.connectedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-slate-400">
                        Ready for automation
                      </p>

                      <button
                        onClick={() =>
                          handleDisconnect(page.pageId, page.pageName)
                        }
                        disabled={isDisconnecting}
                        className="w-full rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        {isDisconnecting ? "Disconnecting..." : "Disconnect"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pages;
