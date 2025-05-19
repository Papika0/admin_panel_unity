import api from "@/plugins/axios/api";

export const getProjects = async () => api.get(`/projects/`);

export const getProject = async (id: number) => api.get(`/projects/${id}/`);

export const createProject = async (data: any) => api.post(`/projects/`, data);

export const updateProject = (id: number, data: FormData) =>
  api.post(`/projects/${id}`, data);
