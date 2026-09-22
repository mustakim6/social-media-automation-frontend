import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/settings`,
    withCredentials: true,
});

// --------------------------------------------------
// Get Current User Settings
// --------------------------------------------------

const getSettings = async () => {
    try {
        const response = await API.get("/");

        return response.data;
    } catch (error) {
        console.error(
            "Get settings API error:",
            error
        );

        throw error;
    }
};

// --------------------------------------------------
// Update Current User Settings
// --------------------------------------------------

const updateSettings = async (settingsData) => {
    try {
        const response = await API.patch(
            "/",
            settingsData
        );

        return response.data;
    } catch (error) {
        console.error(
            "Update settings API error:",
            error
        );

        throw error;
    }
};

export {
    getSettings,
    updateSettings,
};