import { useState } from 'react';

interface Item {
  id: string;
}

type UpdateItemFn<T> = (id: string, updatedItem: T) => void;
type DeleteItemFn = (id: string) => void;

type CrudActions<T> = {
  items: T[];
  addItem: (item: T) => void;
  updateItem: UpdateItemFn<T>;
  deleteItem: DeleteItemFn;
  loadItems: (initialItems: T[]) => void;
};

const useCrud = <T extends Item>(): CrudActions<T> => {
  const [items, setItems] = useState<T[]>([]);

  const addItem = (item: T) => {
    setItems([...items, item]);
  };

  const updateItem: UpdateItemFn<T> = (id, updatedItem) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const deleteItem: DeleteItemFn = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const loadItems = (initialItems: T[]) => {
    setItems(initialItems);
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    loadItems,
  };
};

export default useCrud;
