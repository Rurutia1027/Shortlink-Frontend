import Cookies from "js-cookie";

const tokenKey = "token"; 
const usernameKey = "username"; 

export const getToken = () => Cookies.get(tokenKey); 
export const getUsername = () => Cookies.get(usernameKey); 
export const setToken = (token: string) => Cookies.set(tokenKey, token); 
export const setUsername = (username: string) => Cookies.set(usernameKey, username); 
export const removeToken = () => Cookies.remove(tokenKey); 
export const removeUsername = () => Cookies.remove(usernameKey); 