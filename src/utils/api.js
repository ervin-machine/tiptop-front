import axios from 'axios';
import API_URL from "../config.js"

const api = axios.create({
    baseURL: API_URL, // Backend URL
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = token;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;
