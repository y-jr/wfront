// src/context/StoreContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Store {
  _id: string;
  name: string;
  // outros campos conforme necessário
}

interface StoreContextType {
  stores: Store[];
  fetchStores: () => Promise<Store[]>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [stores, setStores] = useState<Store[]>([]);

  const fetchStores = async (): Promise<Store[]> => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/stores/my-stores', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setStores(data);
      return data;
    } catch (error) {
      console.error('Error fetching stores:', error);
      return [];
    }
  };

  return (
    <StoreContext.Provider value={{ stores, fetchStores }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};