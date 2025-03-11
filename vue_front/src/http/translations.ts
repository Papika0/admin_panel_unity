import api from "@/plugins/axios/api";

export const getTranslations = async (page: number) =>
  api.post(`/translations/`, { page });
