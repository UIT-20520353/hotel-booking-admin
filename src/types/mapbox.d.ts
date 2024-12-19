export type TSuggestResponse = {
  suggestions: TSuggestion[];
  attribution: string;
  response_id: string;
};

export type TSuggestion = {
  name: string;
  name_preferred?: string;
  mapbox_id: string;
  feature_type: string;
  place_formatted: string;
  context: TContext;
  language: string;
  maki: string;
  metadata: Metadata;
  address?: string;
  full_address?: string;
  poi_category?: string[];
  poi_category_ids?: string[];
  external_ids?: TExternalIds;
};

export type TContext = {
  country: TCountry;
  place: TPlace;
  postcode?: TPostcode;
  neighborhood?: TNeighborhood;
  address?: TAddress;
  street?: TStreet;
};

export type TCountry = {
  id?: string;
  name: string;
  country_code: string;
  country_code_alpha_3: string;
};

export type TPlace = {
  id: string;
  name: string;
};

export type TPostcode = {
  id: string;
  name: string;
};

export type TNeighborhood = {
  id: string;
  name: string;
};

export type TAddress = {
  name: string;
  address_number: string;
  street_name: string;
};

export type TStreet = {
  name: string;
};

export type Metadata = object;

export type TExternalIds = {
  dataplor: string;
};
