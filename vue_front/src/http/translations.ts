import api from "@/plugins/axios/api";

export const getTranslations = async (page: number) =>
  api.get(`/translations/${page}`);
