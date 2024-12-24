export type TCreateAttractionRequestBody = {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  address: string;
  overviewImage: File;
  summary: string;
};

export type TAttraction = {
  id: number;
  name: string;
  description: string;
  address: string;
  overviewImage: string;
  summary: string;
  latitude: number;
  longitude: number;
};
