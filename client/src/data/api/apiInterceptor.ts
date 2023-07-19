import axios from "axios";
import { apiUrl } from "./apiUrl.ts";
import { getLs } from "../utils";

export const api = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  value => value,
  error => Promise.reject(error)
);
api.interceptors.request.use(config => {
  const token = getLs("token");

  if (token && typeof token === "string") {
    config.headers["Authorization"] = token;
  }

  return config;
});
