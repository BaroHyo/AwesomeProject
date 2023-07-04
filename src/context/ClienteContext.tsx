import React, { createContext, useEffect } from 'react';
import { Body, Cliente } from '../interfaces/cliente';
import { ChildrenProps } from '../interfaces/app';
import { onDelete, onGet, onGetById, onPost, onPut } from '../utils/api';

import useCrud from '../hooks/useCrud';

const table = 'cliente';
type ClienteContextProps = {
  cliente: Cliente[];
  loadCliente: () => Promise<void>;
  insertCliente: (body: Body) => Promise<Cliente>;
  updateCliente: (body: Body, id: string) => Promise<void>;
  daleteCliente: (id: string) => Promise<void>;
  loadClienteById: (id: string) => Promise<Cliente>;
};

export const ClienteContext = createContext({} as ClienteContextProps);

export const ClienteProvider = ({ children }: ChildrenProps) => {
  const {
    items: cliente,
    addItem,
    updateItem,
    deleteItem,
    loadItems,
  } = useCrud<Cliente>();

  useEffect(() => {
    loadCliente();
  }, []);

  const loadCliente = async () => {
    const collectionRef = await onGet(table);
    const docs: Cliente[] = [];
    collectionRef.forEach(doc => {
      docs.push({
        ...(doc.data() as Cliente),
        id: doc.id,
      });
    });
    loadItems(docs);
  };

  const insertCliente = async (body: Body): Promise<Cliente> => {
    const resp = await onPost(table, {
      ...body,
      fecha: new Date(),
      estado: 'registro',
    });
    const resultado: Cliente = {
      ...body,
      id: resp.id,
    };
    addItem(resultado);
    return resultado;
  };

  const updateCliente = async (body: Body, id: string): Promise<void> => {
    await onPut(table, body, id);
    updateItem(id, { ...body, id });
  };

  const daleteCliente = async (id: string): Promise<void> => {
    await onDelete(table, id);
    deleteItem(id);
  };

  const loadClienteById = async (id: string): Promise<Cliente> => {
    const doc = await onGetById(table, id);
    const visita = {
      ...doc.data(),
      id: doc.id,
    } as Cliente;
    return visita;
  };
  return (
    <ClienteContext.Provider
      value={{
        cliente,
        loadCliente,
        insertCliente,
        updateCliente,
        daleteCliente,
        loadClienteById,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};
