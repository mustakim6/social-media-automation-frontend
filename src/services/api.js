import axios from "axios";

// Axios instance
const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`,
    withCredentials: true,
});

// Backend post for user create
const registerUser = async (userData) => {
    try {
        const response = await API.post("/register", userData);

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const logInUser = async (email, password) => {
    try {
        const loginResponse = await API.post("/login", {
            email,
            password,
        });

        return loginResponse.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getProfile = async () => {
    const response = await API.get("/profile");
    return response.data;
};

const logOutuser = async () => {
    const response = await API.post("/logout");
    return response.data;
};

export {
    registerUser,
    logInUser,
    getProfile,
    logOutuser,
};