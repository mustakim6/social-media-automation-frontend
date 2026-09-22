import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/dashboard`,
    withCredentials: true,
});

const getDashboardData = async () => {
    try {
        const response = await API.get("/");
        return response.data;
    } catch (error) {
        console.error(
            "Dashboard API error:",
            error
        );

        throw error;
    }
};

export { getDashboardData };