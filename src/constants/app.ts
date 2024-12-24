import { TApp } from "@/types/app";

const appConstants: TApp = {
  VITE_MAP_BOX_KEY: import.meta.env.VITE_MAP_BOX_KEY,
  VITE_GOOGLE_AUTOCOMPLETE_KEY: import.meta.env.VITE_GOOGLE_AUTOCOMPLETE_KEY,
  ACCESS_TOKEN_KEY: "hotel_booking_admin_access_token",
};

export default appConstants;
