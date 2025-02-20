import api from "@/plugins/axios/api";

export const getRegionInformation = async (distr_code: string) =>
  api.get("/fetch_region_information", { params: { distr_code } });

export const getMunicipalInformation = async (distr_code: string) =>
  api.get("/fetch_municipal_information", { params: { distr_code } });

export const getSectorInformation = async (distr_code: string) =>
  api.get("/fetch_sector_information", { params: { distr_code } });

export const getSupervisorInformation = async (distr_code: string) =>
  api.get("/fetch_supervisor_information", { params: { distr_code } });

// admin
export const getAdminInformation = async () =>
  api.get("/fetch_admin_information");

export const getAdminInfoBox = async () => api.get("/fetch_admin_info_box");

export const getUserInfoBox = async (distr_codes: any) =>
  api.get("/fetch_user_info_box", { params: { distr_codes } });

export const filterInfoBox = async (distr_codes: any) =>
  api.get("/filter_admin_info_box", { params: { distr_codes } });

export const getSelfRegistrationInfoBox = async () =>
  api.get("/fetch_admin_self_registration");

export const filterAdminSelfRegistration = async (
  regionId: number,
  municipalIds: number[]
) =>
  api.get("/filter_admin_self_registration", {
    params: { regionId, municipalIds },
  });
