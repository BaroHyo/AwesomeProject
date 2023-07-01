export interface FormValues {
  nombre: string | undefined;
  direccion: string | undefined;
  tipo: string | undefined;
  observacion: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
}

export interface Visita {
  id: string;
  nombre: string;
  direccion: string;
  tipo: string;
  observacion: string;
  latitude: number;
  longitude: number;
  fecha?: Date;
  estado?: string;
}

export interface Body {
  nombre: string;
  direccion: string;
  tipo: string;
  observacion: string;
  latitude: number;
  longitude: number;
}
