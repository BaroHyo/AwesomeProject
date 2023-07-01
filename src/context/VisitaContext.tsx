import React, { createContext, useEffect } from 'react';
// Comp
import { onDelete, onGet, onGetById, onPost, onPut } from '../utils/api';
import { Body, Visita } from '../interfaces/visita';
import { ChildrenProps } from '../interfaces/app';
import useCrud from '../hooks/useCrud';

type VisitaContextProps = {
  visita: Visita[];
  loadVisita: () => Promise<void>;
  insertVisita: (body: Body) => Promise<Visita>;
  updateVisita: (body: Body, id: string) => Promise<void>;
  daleteVisita: (id: string) => Promise<void>;
  loadById: (id: string) => Promise<Visita>;
};

export const VisitaContext = createContext({} as VisitaContextProps);

export const VisitaProvider = ({ children }: ChildrenProps) => {
  const { items: visita, addItem, updateItem, deleteItem, loadItems } = useCrud<Visita>();

  useEffect(() => {
    loadVisita();
  }, []);

  const loadVisita = async () => {
    const collectionRef = await onGet('visita');
    const docs: any[] = [];
    collectionRef.forEach(doc => {
      docs.push({
        ...doc.data(),
        fecha: doc.data().fecha.toDate(),
        id: doc.id,
      });
    });
    loadItems(docs);
  };

  const insertVisita = async (body: Body): Promise<Visita> => {
    const resp = await onPost('visita', {
      ...body,
      fecha: new Date(),
      estado: 'registro',
    });
    const resultado: Visita = {
      ...body,
      id: resp.id,
      fecha: new Date(),
      estado: 'registro',
    };
    addItem(resultado);
    return resultado;
  };

  const updateVisita = async (body: Body, id: string): Promise<void> => {
    await onPut('visita', body, id);
    updateItem(id, { ...body, id });
  };

  const daleteVisita = async (id: string): Promise<void> => {
    await onDelete('visita', id);
    deleteItem(id);
  };

  const loadById = async (id: string): Promise<Visita> => {
    const doc = await onGetById('visita', id);
    const visita = {
      ...doc.data(),
      fecha: doc.data()?.fecha.toDate(),
      id: doc.id,
    } as Visita;
    return visita;
  };

  return (
    <VisitaContext.Provider
      value={{
        visita,
        loadVisita,
        insertVisita,
        updateVisita,
        daleteVisita,
        loadById,
      }}
    >
      {children}
    </VisitaContext.Provider>
  );
};
