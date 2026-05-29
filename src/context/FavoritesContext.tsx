import React, { createContext, useContext, useState } from 'react';

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
};

type FavoritesContextType = {
  favorites: Job[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (job: Job) => void;
};

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Job[]>([]);

  function isFavorite(id: string) {
    return favorites.some((j) => j.id === id);
  }

  function toggleFavorite(job: Job) {
    setFavorites((prev) =>
      prev.some((j) => j.id === job.id)
        ? prev.filter((j) => j.id !== job.id)
        : [...prev, job]
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
