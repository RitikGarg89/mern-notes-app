import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1/notes",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance