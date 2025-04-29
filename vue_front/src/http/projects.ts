import api from "@/plugins/axios/api";

export const getProjects = async () => api.get(`/projects/`);

export const getProject = async (id: number) => api.get(`/projects/${id}/`);

export const createProject = async (data: any) => api.post(`/projects/`, data);

export const updateProject = async (id: number, data: any) =>
  api.put(`/projects/${id}/`, data);
