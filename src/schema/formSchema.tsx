import * as yup from 'yup';

export const validateVisita = yup
  .object({
    nombre: yup.string().required('Se requiere Nombre'),
    direccion: yup.string().required('Se requiere Dirección'),
    tipo: yup.string(),
    observacion: yup.string(),
    latitude: yup.number(),
    longitude: yup.number(),
  })
  .required();
