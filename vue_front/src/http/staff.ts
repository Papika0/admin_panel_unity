import api from "@/plugins/axios/api";

export const getSupervisorStaff = async () => api.get("/supervisor/staff");
