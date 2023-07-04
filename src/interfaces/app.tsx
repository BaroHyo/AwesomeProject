export interface ChildrenProps {
  children: JSX.Element[] | JSX.Element;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ResponseAddress {
  address: Address;
  boundingbox: string[];
  display_name: string;
  lat: string;
  licence: string;
  lon: string;
  osm_id: string;
  osm_type: string;
  place_id: string;
}

export interface Address {
  city: string;
  country: string;
  country_code: string;
  county: string;
  neighbourhood: string;
  road: string;
  state: string;
}

export interface Usuario {
  id: string;
  corro: string;
  nombre: string;
  codigo: string;
  urlImagen: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  correo: string;
  password: string;
  nombre: string;
}

export interface LoginResponse {
  usuario: Usuario;
  token: string;
}
