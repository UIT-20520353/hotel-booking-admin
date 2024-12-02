import { TAdministrativeUnit } from "./administrative";

export type TDistrict = {
  code: string;
  name: string;
  nameEN: string;
  fullName: string;
  fullNameEN: string;
  codeName: string;
  administrativeUnit: TAdministrativeUnit;
};
