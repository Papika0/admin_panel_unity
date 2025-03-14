import api from "@/plugins/axios/api";

export const getTranslations = async (page: number) =>
  api.post(`/translations/`, { page });

export const updateTranslation = async (id: number, data: any) =>
  api.post(`/translations/${id}`, { ...data });

export const addTranslation = async (data: any) =>
  api.post(`/translations/create`, { ...data });
