import api from "@/plugins/axios/api";

export const login = async (
  code: string,
  password: string,
  rememberMe: boolean
) => api.post("/auth/login", { code, password, rememberMe });

export const logout = async () => api.post("/auth/logout");

export const getUser = async () => api.get("/user");
