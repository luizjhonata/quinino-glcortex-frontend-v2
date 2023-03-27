import axios from "axios";
import { getUserLocalStorage } from "../components/context/AuthProvider/util";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

// export const BASE_URL = "http://localhost:8080";

export const Api = axios.create({
    baseURL: `${BASE_URL}`,
});


Api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        config.headers.Authorization = user?.token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);