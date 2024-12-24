const apiURL = {
  GET_ALL_PROVINCES: "/api/common/provinces",
  GET_DISTRICTS_BY_PROVINCE_CODE: (code: string | number) =>
    `/api/common/districts/${code}`,
  GET_ALL_ADMINISTRATIVE_REGIONS: "/api/common/administrative-regions",
  GET_ALL_ADMINISTRATIVE_UNITS: "/api/common/administrative-units",
  LOGIN: "/api/authentication/login",
  PROFILE: "/api/admin/profile",
  UPLOAD_IMAGE: "/api/image/upload",
  CREATE_ATTRACTION: "/api/admin/attractions",
  GET_ALL_ATTRACTIONS: "/api/admin/attractions",
  DELETE_ATTRACTION: (attractionId: number) =>
    `/api/admin/attractions/${attractionId}`,
  GET_ATTRACTION: (attractionId: number) =>
    `/api/admin/attractions/${attractionId}`,
};

const appURL = {
  HOME: "/",
  LOGIN: "/login",
  PROFILE: "/profile",
  ADMINISTRATIVE_REGIONS: "/administrative-regions",
  ADMINISTRATIVE_UNITS: "/administrative-units",
  ATTRACTIONS: "/attractions",
  ADD_ATTRACTION: "/attractions/add",
  USERS: "/users",
  EDIT_ATTRACTION: (attractionId: number) => `/attractions/${attractionId}`,
};

export { apiURL, appURL };
