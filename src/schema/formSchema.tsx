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

export const validateCliente = yup
  .object({
    nombre: yup.string().required('Se requiere Nombre'),
    codigo: yup.string().required('Se requiere Codigo'),
    tipoNegocio: yup.string().required('Se requiere Tipo Negocio'),
    direccion: yup.string(),
    zona: yup.string(),
    ruta: yup.string(),
    razonSocial: yup.string().required('Se requiere Razon Social'),
    nit: yup.string().required('Se requiere NIT/CI'),
    telefono: yup.string(),
    celular: yup.string().required('Se requiere Celular'),
  })
  .required();
