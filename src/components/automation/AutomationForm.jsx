
import {
    useEffect,
    useState,
} from "react";

import { getFacebookPages } from "../../services/facebookApi";

import {
    createAutomation,
    updateAutomation,
    previewCard,
} from "../../services/automationApi";

import { getSettings } from "../../services/settingsApi";


// ==================================================
// CARD THEMES
// ==================================================

const CARD_THEMES = [
    {
        value: "midnight",
        name: "Midnight",
        start: "#0F172A",
        end: "#312E81",
        accent: "#A5B4FC",
    },

    {
        value: "ocean",
        name: "Ocean",
        start: "#083344",
        end: "#155E75",
        accent: "#67E8F9",
    },

    {
        value: "forest",
        name: "Forest",
        start: "#052E16",
        end: "#166534",
        accent: "#86EFAC",
    },

    {
        value: "berry",
        name: "Berry",
        start: "#500724",
        end: "#86198F",
        accent: "#F0ABFC",
    },

    {
        value: "sunset",
        name: "Sunset",
        start: "#431407",
        end: "#C2410C",
        accent: "#FED7AA",
    },

    {
        value: "royal",
        name: "Royal",
        start: "#1E1B4B",
        end: "#4338CA",
        accent: "#C7D2FE",
    },

    {
        value: "teal",
        name: "Teal",
        start: "#042F2E",
        end: "#0F766E",
        accent: "#99F6E4",
    },
];


// ==================================================
// CARD PREVIEW SAMPLE
// ==================================================

const CARD_PREVIEW_TEXT =
    "প্রতিদিনের ছোট ছোট প্রচেষ্টাই\nএকদিন বড় পরিবর্তনের ভিত্তি তৈরি করে।";


// ==================================================
// AUTOMATION FORM
// ==================================================

const AutomationForm = ({
    automation,
    onCancel,
    onSuccess,
}) => {

    const isEditMode =
        Boolean(automation);


    // --------------------------------------------------
    // Form State
    // --------------------------------------------------

    const [formData, setFormData] = useState({
        facebookPageId: "",

        prompt: "",

        contentType: "text_only",

        // AI image
        imagePrompt: "",

        // Card
        cardColorMode: "fixed",
        cardTheme: "midnight",
        cardTemplate: "quote",

        // LLM
        llmProvider: "",

        // Schedule
        postingTime: "",
        timezone: "Asia/Dhaka",
    });


    // --------------------------------------------------
    // Loading States
    // --------------------------------------------------

    const [loadingPages, setLoadingPages] =
        useState(true);

    const [loadingSettings, setLoadingSettings] =
        useState(false);

    const [submitting, setSubmitting] =
        useState(false);

    const [previewingCard, setPreviewingCard] =
        useState(false);


    // --------------------------------------------------
    // Other States
    // --------------------------------------------------

    const [pages, setPages] =
        useState([]);

    const [error, setError] =
        useState("");

    const [cardPreviewUrl, setCardPreviewUrl] =
        useState("");

    const [previewTheme, setPreviewTheme] =
        useState("");


    // --------------------------------------------------
    // Load Facebook Pages
    // --------------------------------------------------

    useEffect(() => {

        const loadPages = async () => {

            try {

                setLoadingPages(true);

                setError("");


                const response =
                    await getFacebookPages();


                setPages(
                    response.pages || []
                );

            } catch (error) {

                console.error(
                    "Failed to load Facebook Pages:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                        "Failed to load Facebook Pages"
                );

            } finally {

                setLoadingPages(false);
            }
        };


        loadPages();

    }, []);


    // --------------------------------------------------
    // Initialize Form
    // --------------------------------------------------

    useEffect(() => {

        const initializeForm = async () => {

            // ==================================================
            // EDIT MODE
            // ==================================================

            if (automation) {

                setFormData({
                    facebookPageId:
                        automation.facebookPageId?._id ||
                        automation.facebookPageId ||
                        "",

                    prompt:
                        automation.prompt || "",


                    // ------------------------------------------
                    // Content Type
                    // ------------------------------------------

                    contentType:
                        automation.contentType ||
                        "text_only",


                    // ------------------------------------------
                    // AI Image
                    // ------------------------------------------

                    imagePrompt:
                        automation.imagePrompt || "",


                    // ------------------------------------------
                    // Card
                    // ------------------------------------------

                    cardColorMode:
                        automation.cardColorMode ||
                        "fixed",

                    cardTheme:
                        automation.cardTheme ||
                        "midnight",

                    cardTemplate:
                        automation.cardTemplate ||
                        "quote",


                    // ------------------------------------------
                    // LLM
                    // ------------------------------------------

                    llmProvider:
                        automation.llmProvider || "",


                    // ------------------------------------------
                    // Schedule
                    // ------------------------------------------

                    postingTime:
                        automation.postingTime || "",

                    timezone:
                        automation.timezone ||
                        "Asia/Dhaka",
                });

                return;
            }


            // ==================================================
            // CREATE MODE
            // ==================================================

            try {

                setLoadingSettings(true);


                // ------------------------------------------
                // Initial defaults
                // ------------------------------------------

                setFormData({
                    facebookPageId: "",

                    prompt: "",

                    contentType: "text_only",

                    imagePrompt: "",

                    cardColorMode: "fixed",

                    cardTheme: "midnight",

                    cardTemplate: "quote",

                    llmProvider: "",

                    postingTime: "",

                    timezone: "Asia/Dhaka",
                });


                // ------------------------------------------
                // Load Settings
                // ------------------------------------------

                const response =
                    await getSettings();


                const settings =
                    response.settings;


                setFormData((prev) => ({
                    ...prev,

                    llmProvider:
                        settings
                            ?.defaultLLMProvider ||
                        "gemini",

                    postingTime:
                        settings
                            ?.defaultPostingTime ||
                        "20:00",

                    timezone:
                        settings?.timezone ||
                        "Asia/Dhaka",
                }));

            } catch (error) {

                console.error(
                    "Failed to load settings:",
                    error
                );


                // ------------------------------------------
                // Fallback Defaults
                // ------------------------------------------

                setFormData((prev) => ({
                    ...prev,

                    contentType:
                        "text_only",

                    imagePrompt:
                        "",

                    cardColorMode:
                        "fixed",

                    cardTheme:
                        "midnight",

                    cardTemplate:
                        "quote",

                    llmProvider:
                        "gemini",

                    postingTime:
                        "20:00",

                    timezone:
                        "Asia/Dhaka",
                }));

            } finally {

                setLoadingSettings(false);
            }
        };


        initializeForm();

    }, [automation]);


    // --------------------------------------------------
    // Cleanup Card Preview URL
    // --------------------------------------------------

    useEffect(() => {

        return () => {

            if (cardPreviewUrl) {
                URL.revokeObjectURL(
                    cardPreviewUrl
                );
            }
        };

    }, [cardPreviewUrl]);


    // --------------------------------------------------
    // Handle Form Change
    // --------------------------------------------------

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;


        setFormData((prev) => ({
            ...prev,

            [name]: value,
        }));


        setError("");
    };


    // --------------------------------------------------
    // Handle Content Type Change
    // --------------------------------------------------

    const handleContentTypeChange = (e) => {

        const {
            value,
        } = e.target;


        setFormData((prev) => ({
            ...prev,

            contentType:
                value,

            // Clear AI image prompt when
            // image generation is disabled.
            imagePrompt:
                value === "text_and_image"
                    ? prev.imagePrompt
                    : "",
        }));


        setError("");

        // Close preview when changing content type
        if (value !== "card") {
            closeCardPreview();
        }
    };


    // --------------------------------------------------
    // Handle Card Color Mode Change
    // --------------------------------------------------

    const handleCardColorModeChange = (e) => {

        const {
            value,
        } = e.target;


        setFormData((prev) => ({
            ...prev,

            cardColorMode:
                value,
        }));


        setError("");
    };


    // --------------------------------------------------
    // Handle Card Theme Change
    // --------------------------------------------------

    const handleCardThemeChange = (
        theme
    ) => {

        setFormData((prev) => ({
            ...prev,

            cardTheme:
                theme,
        }));


        setError("");
    };


    // ==================================================
    // GET PREVIEW THEME
    // ==================================================

    const getPreviewTheme = () => {

        // ------------------------------------------
        // Fixed theme
        // ------------------------------------------

        if (
            formData.cardColorMode ===
            "fixed"
        ) {
            return (
                formData.cardTheme ||
                "midnight"
            );
        }


        // ------------------------------------------
        // Random theme
        // ------------------------------------------

        const randomIndex =
            Math.floor(
                Math.random() *
                    CARD_THEMES.length
            );

        return CARD_THEMES[
            randomIndex
        ].value;
    };


    // ==================================================
    // HANDLE CARD PREVIEW
    // ==================================================

    const handlePreviewCard = async () => {

        setError("");


        // ------------------------------------------
        // Content type validation
        // ------------------------------------------

        if (
            formData.contentType !==
            "card"
        ) {
            setError(
                "Card preview is available only for Card content type."
            );

            return;
        }


        // ------------------------------------------
        // Page validation
        // ------------------------------------------

        if (
            !formData.facebookPageId
        ) {
            setError(
                "Please select a Facebook Page before previewing."
            );

            return;
        }


        const selectedPage =
            pages.find(
                (page) =>
                    page._id ===
                    formData.facebookPageId
            );


        if (
            !selectedPage ||
            !selectedPage.pageName
        ) {
            setError(
                "Selected Facebook Page could not be found."
            );

            return;
        }


        // ------------------------------------------
        // Theme
        // ------------------------------------------

        const selectedTheme =
            getPreviewTheme();


        try {

            setPreviewingCard(true);


            const imageBlob =
                await previewCard({
                    text:
                        CARD_PREVIEW_TEXT,

                    pageName:
                        selectedPage.pageName,

                    theme:
                        selectedTheme,
                });


            // ------------------------------------------
            // Create temporary object URL
            // ------------------------------------------

            const imageUrl =
                URL.createObjectURL(
                    imageBlob
                );


            setCardPreviewUrl(
                imageUrl
            );


            setPreviewTheme(
                selectedTheme
            );

        } catch (error) {

            console.error(
                "Failed to generate card preview:",
                error
            );


            setError(
                "Failed to generate card preview. Please try again."
            );

        } finally {

            setPreviewingCard(false);
        }
    };


    // ==================================================
    // CLOSE CARD PREVIEW
    // ==================================================

    const closeCardPreview = () => {

        setCardPreviewUrl("");

        setPreviewTheme("");
    };


    // --------------------------------------------------
    // Handle Submit
    // --------------------------------------------------

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // ==================================================
        // CLIENT-SIDE VALIDATION
        // ==================================================

        if (!formData.facebookPageId) {

            setError(
                "Please select a Facebook Page."
            );

            return;
        }


        if (!formData.prompt.trim()) {

            setError(
                "Please enter a prompt."
            );

            return;
        }


        if (!formData.llmProvider) {

            setError(
                "Please select an LLM provider."
            );

            return;
        }


        if (!formData.contentType) {

            setError(
                "Please select a content type."
            );

            return;
        }


        // ==================================================
        // AI IMAGE VALIDATION
        // ==================================================

        if (
            formData.contentType ===
                "text_and_image" &&
            !formData.imagePrompt.trim()
        ) {

            setError(
                "Please enter an image prompt."
            );

            return;
        }


        // ==================================================
        // CARD VALIDATION
        // ==================================================

        if (
            formData.contentType ===
            "card"
        ) {

            if (
                !formData.cardColorMode
            ) {

                setError(
                    "Please select a card theme mode."
                );

                return;
            }


            if (
                formData.cardColorMode ===
                    "fixed" &&
                !formData.cardTheme
            ) {

                setError(
                    "Please select a card theme."
                );

                return;
            }


            if (
                !formData.cardTemplate
            ) {

                setError(
                    "Please select a card template."
                );

                return;
            }
        }


        // ==================================================
        // SCHEDULE VALIDATION
        // ==================================================

        if (!formData.postingTime) {

            setError(
                "Please select a posting time."
            );

            return;
        }


        if (!formData.timezone) {

            setError(
                "Please select a timezone."
            );

            return;
        }


        // ==================================================
        // SUBMIT
        // ==================================================

        try {

            setSubmitting(true);


            const payload = {
                ...formData,


                // ------------------------------------------
                // Prompt
                // ------------------------------------------

                prompt:
                    formData.prompt.trim(),


                // ------------------------------------------
                // AI Image Prompt
                // ------------------------------------------

                imagePrompt:
                    formData.contentType ===
                        "text_and_image"
                        ? formData.imagePrompt.trim()
                        : "",


                // ------------------------------------------
                // Card
                // ------------------------------------------

                cardColorMode:
                    formData.contentType ===
                        "card"
                        ? formData.cardColorMode
                        : "fixed",

                cardTheme:
                    formData.contentType ===
                        "card"
                        ? formData.cardTheme
                        : "midnight",

                cardTemplate:
                    formData.contentType ===
                        "card"
                        ? formData.cardTemplate
                        : "quote",
            };


            if (isEditMode) {

                await updateAutomation(
                    automation._id,
                    payload
                );

            } else {

                await createAutomation(
                    payload
                );
            }


            if (onSuccess) {

                await onSuccess();
            }

        } catch (error) {

            console.error(
                isEditMode
                    ? "Update automation error:"
                    : "Create automation error:",
                error
            );


            setError(
                error.response?.data?.message ||
                    `Failed to ${
                        isEditMode
                            ? "update"
                            : "create"
                    } automation`
            );

        } finally {

            setSubmitting(false);
        }
    };


    // --------------------------------------------------
    // Shared Input Classes
    // --------------------------------------------------

    const inputClassName =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50";


    // ==================================================
    // SELECTED PAGE
    // ==================================================

    const selectedPage =
        pages.find(
            (page) =>
                page._id ===
                formData.facebookPageId
        );


    // ==================================================
    // PREVIEW THEME NAME
    // ==================================================

    const selectedPreviewTheme =
        CARD_THEMES.find(
            (theme) =>
                theme.value ===
                previewTheme
        );


    // --------------------------------------------------
    // Render
    // --------------------------------------------------

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* ==================================================
                Header
            ================================================== */}

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-slate-900">
                    {isEditMode
                        ? "Edit Automation"
                        : "Create Automation"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {isEditMode
                        ? "Update your automated Facebook Page posting workflow."
                        : "Set up an automated Facebook Page posting workflow."}
                </p>

            </div>


            {/* ==================================================
                Error
            ================================================== */}

            {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                    <p className="text-sm text-red-600">
                        {error}
                    </p>

                </div>
            )}


            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* ==================================================
                    Facebook Page
                ================================================== */}

                <div>

                    <label
                        htmlFor="facebookPageId"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Facebook Page
                    </label>


                    <select
                        id="facebookPageId"
                        name="facebookPageId"
                        value={
                            formData.facebookPageId
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            loadingPages ||
                            submitting ||
                            previewingCard
                        }
                        className={
                            inputClassName
                        }
                    >

                        <option value="">
                            {loadingPages
                                ? "Loading Facebook Pages..."
                                : "Select a Facebook Page"}
                        </option>


                        {pages.map((page) => (

                            <option
                                key={
                                    page._id ||
                                    page.pageId
                                }
                                value={
                                    page._id
                                }
                            >
                                {page.pageName}
                            </option>

                        ))}

                    </select>


                    {!loadingPages &&
                        pages.length === 0 && (
                            <p className="mt-2 text-xs text-amber-600">
                                No connected Facebook Pages found.
                            </p>
                        )}

                </div>


                {/* ==================================================
                    Prompt
                ================================================== */}

                <div>

                    <label
                        htmlFor="prompt"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Prompt
                    </label>


                    <textarea
                        id="prompt"
                        name="prompt"
                        value={
                            formData.prompt
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            submitting ||
                            previewingCard
                        }
                        rows="5"
                        placeholder="Example: Create a short motivational Facebook post in Bangla about discipline."
                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />

                </div>


                {/* ==================================================
                    Content Type
                ================================================== */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Content Type
                    </label>


                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

                        {/* Text Only */}

                        <label
                            className={`flex cursor-pointer items-start rounded-xl border p-4 transition ${
                                formData.contentType ===
                                "text_only"
                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                    : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                        >

                            <input
                                type="radio"
                                name="contentType"
                                value="text_only"
                                checked={
                                    formData.contentType ===
                                    "text_only"
                                }
                                onChange={
                                    handleContentTypeChange
                                }
                                disabled={
                                    submitting ||
                                    previewingCard
                                }
                                className="mt-1 mr-3"
                            />


                            <div>

                                <p className="text-sm font-medium text-slate-700">
                                    Text Only
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                    Generate and publish only the post text.
                                </p>

                            </div>

                        </label>


                        {/* Card */}

                        <label
                            className={`flex cursor-pointer items-start rounded-xl border p-4 transition ${
                                formData.contentType ===
                                "card"
                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                    : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                        >

                            <input
                                type="radio"
                                name="contentType"
                                value="card"
                                checked={
                                    formData.contentType ===
                                    "card"
                                }
                                onChange={
                                    handleContentTypeChange
                                }
                                disabled={
                                    submitting ||
                                    previewingCard
                                }
                                className="mt-1 mr-3"
                            />


                            <div>

                                <p className="text-sm font-medium text-slate-700">
                                    Card
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                    Generate text and turn it into a visual card.
                                </p>

                            </div>

                        </label>


                        {/* Text + AI Image */}

                        <label
                            className={`flex cursor-pointer items-start rounded-xl border p-4 transition ${
                                formData.contentType ===
                                "text_and_image"
                                    ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                    : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                        >

                            <input
                                type="radio"
                                name="contentType"
                                value="text_and_image"
                                checked={
                                    formData.contentType ===
                                    "text_and_image"
                                }
                                onChange={
                                    handleContentTypeChange
                                }
                                disabled={
                                    submitting ||
                                    previewingCard
                                }
                                className="mt-1 mr-3"
                            />


                            <div>

                                <p className="text-sm font-medium text-slate-700">
                                    Text + AI Image
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                    Generate post text and an AI image.
                                </p>

                            </div>

                        </label>

                    </div>

                </div>


                {/* ==================================================
                    Card Settings
                ================================================== */}

                {formData.contentType ===
                    "card" && (

                    <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">

                        <div className="mb-5">

                            <h3 className="text-sm font-semibold text-slate-800">
                                Card Settings
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                                Choose how your generated quote cards should look.
                            </p>

                        </div>


                        <div className="space-y-6">

                            {/* --------------------------------------
                                Theme Mode
                            -------------------------------------- */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Theme Mode
                                </label>


                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    {/* Fixed */}

                                    <label
                                        className={`flex cursor-pointer items-start rounded-xl border bg-white p-4 transition ${
                                            formData.cardColorMode ===
                                            "fixed"
                                                ? "border-blue-500 ring-2 ring-blue-100"
                                                : "border-slate-200 hover:border-blue-300"
                                        }`}
                                    >

                                        <input
                                            type="radio"
                                            name="cardColorMode"
                                            value="fixed"
                                            checked={
                                                formData.cardColorMode ===
                                                "fixed"
                                            }
                                            onChange={
                                                handleCardColorModeChange
                                            }
                                            disabled={
                                                submitting ||
                                                previewingCard
                                            }
                                            className="mt-1 mr-3"
                                        />


                                        <div>

                                            <p className="text-sm font-medium text-slate-700">
                                                Fixed Theme
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-400">
                                                Keep the same visual style for every card.
                                            </p>

                                        </div>

                                    </label>


                                    {/* Random */}

                                    <label
                                        className={`flex cursor-pointer items-start rounded-xl border bg-white p-4 transition ${
                                            formData.cardColorMode ===
                                            "random"
                                                ? "border-blue-500 ring-2 ring-blue-100"
                                                : "border-slate-200 hover:border-blue-300"
                                        }`}
                                    >

                                        <input
                                            type="radio"
                                            name="cardColorMode"
                                            value="random"
                                            checked={
                                                formData.cardColorMode ===
                                                "random"
                                            }
                                            onChange={
                                                handleCardColorModeChange
                                            }
                                            disabled={
                                                submitting ||
                                                previewingCard
                                            }
                                            className="mt-1 mr-3"
                                        />


                                        <div>

                                            <p className="text-sm font-medium text-slate-700">
                                                Random Theme
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-400">
                                                Let SocialFlow choose a different curated style.
                                            </p>

                                        </div>

                                    </label>

                                </div>

                            </div>


                            {/* --------------------------------------
                                Theme Selector
                            -------------------------------------- */}

                            {formData.cardColorMode ===
                                "fixed" && (

                                <div>

                                    <div className="mb-3">

                                        <label className="block text-sm font-medium text-slate-700">
                                            Card Theme
                                        </label>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Select a visual style for your quote cards.
                                        </p>

                                    </div>


                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">

                                        {CARD_THEMES.map(
                                            (theme) => {

                                                const isSelected =
                                                    formData.cardTheme ===
                                                    theme.value;


                                                return (
                                                    <button
                                                        key={
                                                            theme.value
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            handleCardThemeChange(
                                                                theme.value
                                                            )
                                                        }
                                                        disabled={
                                                            submitting ||
                                                            previewingCard
                                                        }
                                                        className={`group relative overflow-hidden rounded-xl border text-left transition ${
                                                            isSelected
                                                                ? "border-blue-500 ring-2 ring-blue-200"
                                                                : "border-slate-200 hover:border-slate-300"
                                                        }`}
                                                    >

                                                        {/* Preview */}

                                                        <div
                                                            className="relative h-24 overflow-hidden p-3"
                                                            style={{
                                                                background:
                                                                    `linear-gradient(135deg, ${theme.start}, ${theme.end})`,
                                                            }}
                                                        >

                                                            {/* Decorative glow */}

                                                            <div
                                                                className="absolute -right-5 -top-5 h-20 w-20 rounded-full opacity-20"
                                                                style={{
                                                                    backgroundColor:
                                                                        theme.accent,
                                                                }}
                                                            />


                                                            <div
                                                                className="absolute -bottom-8 -left-5 h-20 w-20 rounded-full opacity-10"
                                                                style={{
                                                                    backgroundColor:
                                                                        theme.accent,
                                                                }}
                                                            />


                                                            {/* Quote preview */}

                                                            <div className="relative flex h-full flex-col justify-between">

                                                                <span
                                                                    className="text-2xl font-serif"
                                                                    style={{
                                                                        color:
                                                                            theme.accent,
                                                                    }}
                                                                >
                                                                    “
                                                                </span>


                                                                <div className="space-y-1">

                                                                    <div className="h-1.5 w-16 rounded-full bg-white/80" />

                                                                    <div className="h-1.5 w-11 rounded-full bg-white/50" />

                                                                </div>

                                                            </div>


                                                            {/* Selected */}

                                                            {isSelected && (
                                                                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">

                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                        className="h-4 w-4"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-7.25 9a.75.75 0 0 1-1.127.075l-4.25-4.25a.75.75 0 0 1 1.06-1.06l3.662 3.661 6.738-8.365a.75.75 0 0 1 1.024-.113Z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>

                                                                </div>
                                                            )}

                                                        </div>


                                                        {/* Theme name */}

                                                        <div className="bg-white px-3 py-2.5">

                                                            <p className="text-sm font-medium text-slate-700">
                                                                {theme.name}
                                                            </p>

                                                        </div>

                                                    </button>
                                                );
                                            }
                                        )}

                                    </div>

                                </div>

                            )}


                            {/* --------------------------------------
                                Random Theme Info
                            -------------------------------------- */}

                            {formData.cardColorMode ===
                                "random" && (

                                <div className="rounded-xl border border-slate-200 bg-white p-4">

                                    <div className="flex items-start gap-3">

                                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.5 12a7.5 7.5 0 0 1 13.02-5.02M19.5 12a7.5 7.5 0 0 1-13.02 5.02"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.5 4.5h2v2M6.5 19.5h-2v-2"
                                                />

                                            </svg>

                                        </div>


                                        <div>

                                            <p className="text-sm font-medium text-slate-700">
                                                Curated random themes
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                SocialFlow will automatically choose from the available visual themes and avoid repeating the same theme immediately.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )}


                            {/* --------------------------------------
                                Card Template
                            -------------------------------------- */}

                            <div>

                                <label
                                    htmlFor="cardTemplate"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Card Template
                                </label>


                                <select
                                    id="cardTemplate"
                                    name="cardTemplate"
                                    value={
                                        formData.cardTemplate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        submitting ||
                                        previewingCard
                                    }
                                    className={
                                        inputClassName
                                    }
                                >

                                    <option value="quote">
                                        Quote
                                    </option>

                                </select>


                                <p className="mt-1.5 text-xs text-slate-400">
                                    More card templates can be added later.
                                </p>

                            </div>


                            {/* --------------------------------------
                                Preview Card
                            -------------------------------------- */}

                            <div className="border-t border-blue-100 pt-5">

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                    <div>

                                        <p className="text-sm font-medium text-slate-700">
                                            Preview
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Preview the card design before saving the automation.
                                        </p>

                                    </div>


                                    <button
                                        type="button"
                                        onClick={
                                            handlePreviewCard
                                        }
                                        disabled={
                                            loadingPages ||
                                            pages.length === 0 ||
                                            submitting ||
                                            previewingCard
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >

                                        {previewingCard ? (
                                            <>
                                                <svg
                                                    className="h-4 w-4 animate-spin"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />

                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    />
                                                </svg>

                                                Generating Preview...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    className="h-4 w-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12Z"
                                                    />

                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="2.75"
                                                    />
                                                </svg>

                                                Preview Card
                                            </>
                                        )}

                                    </button>

                                </div>


                                <p className="mt-3 text-xs text-slate-400">
                                    Preview uses sample text only. Your actual automation will generate the quote from your prompt.
                                </p>

                            </div>

                        </div>

                    </div>
                )}


                {/* ==================================================
                    Image Prompt
                ================================================== */}

                {formData.contentType ===
                    "text_and_image" && (

                    <div>

                        <label
                            htmlFor="imagePrompt"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Image Prompt
                        </label>


                        <textarea
                            id="imagePrompt"
                            name="imagePrompt"
                            value={
                                formData.imagePrompt
                            }
                            onChange={
                                handleChange
                            }
                            disabled={
                                submitting ||
                                previewingCard
                            }
                            rows="4"
                            placeholder="Example: A person working consistently toward a goal, modern motivational atmosphere, realistic style."
                            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                        />


                        <p className="mt-1.5 text-xs text-slate-400">
                            Describe the image you want the AI image generator to create.
                        </p>

                    </div>
                )}


                {/* ==================================================
                    LLM Provider
                ================================================== */}

                <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        LLM Provider
                    </label>


                    {loadingSettings ? (

                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                            Loading default LLM provider...
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            {/* OpenAI */}

                            <label
                                className={`flex cursor-pointer items-center rounded-xl border p-4 transition ${
                                    formData.llmProvider ===
                                    "openai"
                                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                        : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="llmProvider"
                                    value="openai"
                                    checked={
                                        formData.llmProvider ===
                                        "openai"
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        submitting ||
                                        previewingCard
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
                                    formData.llmProvider ===
                                    "gemini"
                                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                        : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="llmProvider"
                                    value="gemini"
                                    checked={
                                        formData.llmProvider ===
                                        "gemini"
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        submitting ||
                                        previewingCard
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
                    )}

                </div>


                {/* ==================================================
                    Posting Time
                ================================================== */}

                <div>

                    <label
                        htmlFor="postingTime"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Posting Time
                    </label>


                    <input
                        id="postingTime"
                        type="time"
                        name="postingTime"
                        value={
                            formData.postingTime
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            loadingSettings ||
                            submitting ||
                            previewingCard
                        }
                        className={
                            inputClassName
                        }
                    />


                    <p className="mt-1.5 text-xs text-slate-400">
                        Default value comes from Settings when creating a new automation.
                    </p>

                </div>


                {/* ==================================================
                    Timezone
                ================================================== */}

                <div>

                    <label
                        htmlFor="timezone"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Timezone
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
                        disabled={
                            loadingSettings ||
                            submitting ||
                            previewingCard
                        }
                        className={
                            inputClassName
                        }
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
                        Default value comes from Settings when creating a new automation.
                    </p>

                </div>


                {/* ==================================================
                    Actions
                ================================================== */}

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={
                            onCancel
                        }
                        disabled={
                            submitting ||
                            previewingCard
                        }
                        className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        disabled={
                            loadingPages ||
                            loadingSettings ||
                            pages.length === 0 ||
                            submitting ||
                            previewingCard
                        }
                        className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {submitting
                            ? isEditMode
                                ? "Updating..."
                                : "Creating..."
                            : isEditMode
                              ? "Update Automation"
                              : "Create Automation"}
                    </button>

                </div>

            </form>


            {/* ==================================================
                CARD PREVIEW MODAL
            ================================================== */}

            {cardPreviewUrl && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="card-preview-title"
                >

                    <div className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* ------------------------------------------
                            Modal Header
                        ------------------------------------------ */}

                        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

                            <div>

                                <h3
                                    id="card-preview-title"
                                    className="text-lg font-semibold text-slate-900"
                                >
                                    Card Preview
                                </h3>

                                <p className="mt-1 text-xs text-slate-500">
                                    Visual preview of your selected card style.
                                </p>

                            </div>


                            {/* Close Icon */}

                            <button
                                type="button"
                                onClick={
                                    closeCardPreview
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                aria-label="Close card preview"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 6l12 12M18 6L6 18"
                                    />
                                </svg>

                            </button>

                        </div>


                        {/* ------------------------------------------
                            Preview Content
                        ------------------------------------------ */}

                        <div className="overflow-y-auto p-4 sm:p-6">

                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">

                                <div>

                                    <p className="text-sm font-medium text-slate-700">
                                        {selectedPage?.pageName ||
                                            "Facebook Page"}
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate-400">
                                        {selectedPreviewTheme?.name ||
                                            "Selected Theme"}
                                    </p>

                                </div>


                                {formData.cardColorMode ===
                                    "random" && (

                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                        Random preview theme
                                    </span>

                                )}

                            </div>


                            {/* Image */}

                            <div className="flex justify-center rounded-2xl bg-slate-100 p-3 sm:p-5">

                                <img
                                    src={
                                        cardPreviewUrl
                                    }
                                    alt="Generated card preview"
                                    className="max-h-[65vh] w-full max-w-135 rounded-xl object-contain shadow-lg"
                                />

                            </div>


                            {/* Preview Information */}

                            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

                                <p className="text-xs leading-5 text-slate-500">
                                    This preview uses sample text to show the visual design. The actual automation will generate the card quote from your configured prompt.
                                </p>

                            </div>

                        </div>


                        {/* ------------------------------------------
                            Modal Footer
                        ------------------------------------------ */}

                        <div className="flex justify-end border-t border-slate-100 px-5 py-4 sm:px-6">

                            <button
                                type="button"
                                onClick={
                                    closeCardPreview
                                }
                                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};


export default AutomationForm;

