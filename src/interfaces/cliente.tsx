export interface FormValues {
  nombre: string | undefined;
  codigo: string | undefined;
  tipoNegocio: string | undefined;
  direccion: string | undefined;
  zona: string | undefined;
  ruta: string | undefined;
  razonSocial: string | undefined;
  nit: string | undefined;
  telefono: string | undefined;
  celular: string | undefined;
}

export interface Cliente {
  id: string;
  nombre: string;
  codigo: string;
  tipoNegocio: string;
  direccion: string;
  zona: string;
  ruta: string;
  razonSocial: string;
  nit: string;
  telefono: string;
  celular: string;
  latitude: number;
  longitude: number;
}

export interface Body {
  nombre: string;
  codigo: string;
  tipoNegocio: string;
  direccion: string;
  zona: string;
  ruta: string;
  razonSocial: string;
  nit: string;
  telefono: string;
  celular: string;
  latitude: number;
  longitude: number;
}
