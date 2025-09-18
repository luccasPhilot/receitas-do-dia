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
      if (!response.ok) throw new Error("Network response failed.");
      const data = await response.json();
      if (data.meals) {
        const recipe = data.meals[0];
        dispatch({ type: "FETCH_SUCCESS", payload: recipe });
        addRecipeToHistory(recipe);
      } else {
        throw new Error("No recipe found.");
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
      setValidationError("Please enter a recipe name to search.");
      return;
    }
    setValidationError("");
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      if (!response.ok) throw new Error("Network response failed.");
      const data = await response.json();
      if (data.meals) {
        const recipe = data.meals[0];
        dispatch({ type: "FETCH_SUCCESS", payload: recipe });
        addRecipeToHistory(recipe);
      } else {
        throw new Error(`No recipe found for "${searchTerm}".`);
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
        🍴 Recipe of the Day
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Discover a random recipe or search for your favorite dish!
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ mb: 3 }}
      >
        <TextField
          label="Search by name..."
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
          Search
        </Button>
      </Stack>

      <Button
        variant="outlined"
        size="large"
        onClick={fetchRandomRecipe}
        disabled={state.loading}
      >
        {state.loading ? "Searching..." : "Surprise Me with a Random!"}
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
            Viewed Recipes History
          </Typography>
          <List>
            {history.map((recipe) => (
              <ListItem
                key={recipe.idMeal}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="re-view"
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
