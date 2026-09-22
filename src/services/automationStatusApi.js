import axios from "axios";

const API = axios.create({
    baseURL:
        "http://localhost:5000/api/automations/status",
    withCredentials: true,
});

const getExecutionStatuses = async () => {
    try {
        const response = await API.get("/");

        return response.data;
    } catch (error) {
        console.error(
            "Get execution statuses API error:",
            error
        );

        throw error;
    }
};

export {
    getExecutionStatuses,
};