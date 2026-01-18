import axios, { AxiosHeaders } from "axios";
import { getToken, getUsername } from "../auth";
import { isNotEmpty } from "../utils";

const baseURL =
  (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env?.NEXT_PUBLIC_API_BASE_URL || "/api/shortlink/admin/v1";

export const http = axios.create({
    baseURL,
    timeout: 15000,
}); 

http.interceptors.request.use(
    (config) => { 
        const token = getToken(); 
        const username = getUsername(); 
        const headers =
            config.headers instanceof AxiosHeaders
                ? config.headers
                : new AxiosHeaders(config.headers); 
        headers.set("Token", isNotEmpty(token) ? token : "");
        headers.set("Username", isNotEmpty(username) ? username : "");
        config.headers = headers;
        return config;
    }, 
    (error) => Promise.reject(error), 
); 