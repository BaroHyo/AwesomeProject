import React, { createContext, useEffect } from 'react';
// Comp
import { onDelete, onGet, onGetById, onPost, onPut } from '../utils/api';
import { Body, Producto } from '../interfaces/producto';
import { ChildrenProps } from '../interfaces/app';
import useCrud from '../hooks/useCrud';

const table = 'producto';

type ProductoContextProps = {
  producto: Producto[];
  loadProducto: () => Promise<void>;
  insertProducto: (body: Body) => Promise<Producto>;
  updateProducto: (body: Body, id: string) => Promise<void>;
  daleteProducto: (id: string) => Promise<void>;
  loadProductoById: (id: string) => Promise<Producto>;
};

export const ProductoContext = createContext({} as ProductoContextProps);

export const ProductoProvider = ({ children }: ChildrenProps) => {
  const {
    items: producto,
    addItem,
    updateItem,
    deleteItem,
    loadItems,
  } = useCrud<Producto>();

  useEffect(() => {
    loadProducto();
  }, []);

  const loadProducto = async () => {
    const collectionRef = await onGet(table);
    const docs: Producto[] = [];
    collectionRef.forEach(doc => {
      docs.push({
        ...(doc.data() as Producto),
        id: doc.id,
      });
    });
    loadItems(docs);
  };

  const insertProducto = async (body: Body): Promise<Producto> => {
    const resp = await onPost(table, {
      ...body,
      fecha: new Date(),
      estado: 'activo',
    });
    const resultado: Producto = {
      ...body,
      id: resp.id,
    };
    addItem(resultado);
    return resultado;
  };

  const updateProducto = async (body: Body, id: string): Promise<void> => {
    await onPut(table, body, id);
    updateItem(id, { ...body, id });
  };

  const daleteProducto = async (id: string): Promise<void> => {
    await onDelete(table, id);
    deleteItem(id);
  };

  const loadProductoById = async (id: string): Promise<Producto> => {
    const doc = await onGetById(table, id);
    const visita = {
      ...doc.data(),
      id: doc.id,
    } as Producto;
    return visita;
  };

  return (
    <ProductoContext.Provider
      value={{
        producto,
        loadProducto,
        insertProducto,
        updateProducto,
        daleteProducto,
        loadProductoById,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
