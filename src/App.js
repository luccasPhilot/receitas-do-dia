import React, { useReducer, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import RecipeCard from "./components/RecipeCard";
import { recipeReducer, initialState } from "./reducers/recipeReducer";
import { useRecipeHistory } from "./contexts/RecipeContext";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const { history, addRecipeToHistory } = useRecipeHistory();

  const fetchRandomRecipe = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      if (!response.ok) {
        throw new Error("Falha na resposta da rede.");
      }
      const data = await response.json();
      if (data.meals) {
        const recipe = data.meals[0];
        dispatch({ type: "FETCH_SUCCESS", payload: recipe });
        addRecipeToHistory(recipe);
      } else {
        throw new Error("Nenhuma receita encontrada.");
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, [addRecipeToHistory]);

  useEffect(() => {
    fetchRandomRecipe();
  }, [fetchRandomRecipe]);

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h2" gutterBottom>
        🍴 Receita do Dia
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Não sabe o que cozinhar hoje? Descubra uma nova receita com apenas um
        clique!
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={fetchRandomRecipe}
        disabled={state.loading}
      >
        {state.loading ? "Buscando..." : "Quero Outra!"}
      </Button>

      <Box sx={{ my: 4 }}>
        {state.loading && <CircularProgress />}
        {state.error && <Alert severity="error">{state.error}</Alert>}
        {state.recipe && <RecipeCard recipe={state.recipe} />}
      </Box>

      {history.length > 0 && (
        <Box sx={{ mt: 5, textAlign: "left" }}>
          <Typography variant="h5" gutterBottom>
            Histórico de Receitas Vistas
          </Typography>
          <List>
            {history.map((recipe) => (
              <ListItem key={recipe.idMeal}>
                <ListItemText
                  primary={recipe.strMeal}
                  secondary={recipe.strCategory}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Container>
  );
}

export default App;
