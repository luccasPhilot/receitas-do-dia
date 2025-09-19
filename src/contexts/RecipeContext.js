import React, { createContext, useState, useContext, useCallback } from "react";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [history, setHistory] = useState([]);

  const addRecipeToHistory = useCallback((recipe) => {
    setHistory((prevHistory) => {
      const filteredHistory = prevHistory.filter(
        (item) => item.idMeal !== recipe.idMeal
      );
      return [recipe, ...filteredHistory];
    });
  }, []);

  const value = {
    history,
    addRecipeToHistory,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

export function useRecipeHistory() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error(
      "useRecipeHistory deve ser usado dentro de um RecipeProvider"
    );
  }
  return context;
}
