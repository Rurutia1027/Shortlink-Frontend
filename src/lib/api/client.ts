import axios from "axios";
import { getToken, getUsername } from "../auth";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/shortlink/admin/v1"; 

export const http = axios.create({
    baseURL,
    timeout: 15000,
}); 

http.interceptors.request.use(
    (config) => { 
        const token = getToken(); 
        const username = getUsername(); 
        if (!config.headers) { 
            config.headers = {};
        }
        config.headers.Token = isNotEmpty(token) ? token : ""; 
        config.headers.Username = isNotEmpty(username) ? username : ""; 
        return config; 
    }, 
    (error) => Promise.reject(error), 
); 