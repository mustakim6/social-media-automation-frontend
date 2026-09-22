import axios from "axios";

const FACEBOOK_API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/facebook`,
    withCredentials: true,
});

export const getFacebookPages = async () => {
    const response = await FACEBOOK_API.get("/pages");

    return response.data;
};

export const getAvailableFacebookPages = async (sessionId) => {
    const response = await FACEBOOK_API.get(
        `/available-pages?sessionId=${sessionId}`
    );

    return response.data;
};

export const connectSelectedFacebookPage = async (
    sessionId,
    pageId
) => {
    const response = await FACEBOOK_API.post(
        "/pages",
        {
            sessionId,
            pageId,
        }
    );

    return response.data;
};

export const disconnectFacebookPage = async (pageId) => {
    const response = await FACEBOOK_API.delete(
        `/pages/${pageId}`
    );

    return response.data;
};