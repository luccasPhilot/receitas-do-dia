import React, { useReducer, useEffect, useCallback, useState } from "react";
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
  TextField,
  Stack,
  IconButton,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import RecipeCard from "./components/RecipeCard";
import { recipeReducer, initialState } from "./reducers/recipeReducer";
import { useRecipeHistory } from "./contexts/RecipeContext";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const { history, addRecipeToHistory } = useRecipeHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [validationError, setValidationError] = useState("");

  const fetchRandomRecipe = useCallback(async () => {
    setValidationError("");
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      if (!response.ok) throw new Error("Falha na resposta da rede.");
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

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setValidationError(
        "Por favor, digite o nome de uma receita para buscar."
      );
      return;
    }
    setValidationError("");
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      if (!response.ok) throw new Error("Falha na resposta da rede.");
      const data = await response.json();
      if (data.meals) {
        const recipe = data.meals[0];
        dispatch({ type: "FETCH_SUCCESS", payload: recipe });
        addRecipeToHistory(recipe);
      } else {
        throw new Error(`Nenhuma receita encontrada para "${searchTerm}".`);
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const showRecipeFromHistory = (recipe) => {
    setValidationError("");
    setSearchTerm("");
    dispatch({ type: "FETCH_SUCCESS", payload: recipe });
    addRecipeToHistory(recipe);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h2" gutterBottom>
        🍴 Receita do Dia
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Descubra uma receita aleatória ou busque por seu prato favorito!
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ mb: 3 }}
      >
        <TextField
          label="Buscar por nome..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          error={!!validationError}
          helperText={validationError}
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleSearch}
          disabled={state.loading}
          sx={{ height: "56px" }}
        >
          Buscar
        </Button>
      </Stack>

      <Button
        variant="outlined"
        size="large"
        onClick={fetchRandomRecipe}
        disabled={state.loading}
      >
        {state.loading ? "Buscando..." : "Me Surpreenda com uma Aleatória!"}
      </Button>

      <Box sx={{ my: 4 }}>
        {state.loading && <CircularProgress />}
        {state.error && <Alert severity="error">{state.error}</Alert>}
        {state.recipe && !state.loading && !state.error && (
          <RecipeCard recipe={state.recipe} />
        )}
      </Box>

      {history.length > 0 && (
        <Box sx={{ mt: 5, textAlign: "left" }}>
          <Typography variant="h5" gutterBottom>
            Histórico de Receitas Vistas
          </Typography>
          <List>
            {history.map((recipe) => (
              <ListItem
                key={recipe.idMeal}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="rever"
                    onClick={() => showRecipeFromHistory(recipe)}
                  >
                    <ReplayIcon />
                  </IconButton>
                }
              >
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
