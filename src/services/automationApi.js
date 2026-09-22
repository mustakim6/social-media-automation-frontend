import axios from "axios";

// ==================================================
// Automation API
// ==================================================

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/automations`,
    withCredentials: true,
});


// ==================================================
// Card Preview API
// ==================================================

const CARD_API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/llm`,
    withCredentials: true,
});


// ==================================================
// Get all automations
// ==================================================

const getAutomations = async () => {
    try {
        const response = await API.get("/");

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// ==================================================
// Get single automation
// ==================================================

const getAutomationById = async (automationId) => {
    try {
        const response =
            await API.get(`/${automationId}`);

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// ==================================================
// Create automation
// ==================================================

const createAutomation = async (automationData) => {
    try {
        const response =
            await API.post("/", automationData);

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// ==================================================
// Update automation
// ==================================================

const updateAutomation = async (
    automationId,
    automationData
) => {
    try {
        const response =
            await API.patch(
                `/${automationId}`,
                automationData
            );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// ==================================================
// Delete automation
// ==================================================

const deleteAutomation = async (automationId) => {
    try {
        const response =
            await API.delete(
                `/${automationId}`
            );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// ==================================================
// Run automation manually
// ==================================================

const runAutomation = async (automationId) => {
    try {
        const response =
            await API.post(
                `/${automationId}/run`
            );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// ==================================================
// Get execution history
// ==================================================

const getExecutionStatuses = async () => {
    try {
        const response =
            await API.get("/status");

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


// ==================================================
// Preview Card
// ==================================================

const previewCard = async ({
    text,
    pageName,
    theme,
}) => {
    try {
        const response =
            await CARD_API.post(
                "/test-card",
                {
                    text,
                    pageName,
                    theme,
                },
                {
                    responseType: "blob",
                }
            );

        return response.data;
    } catch (error) {
        console.log(
            "Card preview error:",
            error
        );

        throw error;
    }
};


// ==================================================
// Export
// ==================================================

export {
    getAutomations,
    getAutomationById,
    createAutomation,
    updateAutomation,
    deleteAutomation,
    runAutomation,
    getExecutionStatuses,
    previewCard,
};