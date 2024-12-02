import { TAdministrativeRegion, TAdministrativeUnit } from "./administrative";

export type TProvince = {
  code: string;
  name: string;
  nameEN: string;
  fullName: string;
  fullNameEN: string;
  codeName: string;
  administrativeRegion: TAdministrativeRegion;
  administrativeUnit: TAdministrativeUnit;
};
