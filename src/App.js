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
  Tabs,
  Tab,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import RecipeCard from "./components/RecipeCard";
import SearchResults from "./components/SearchResults";
import IngredientSearch from "./components/IngredientSearch";
import { recipeReducer, initialState } from "./reducers/recipeReducer";
import { useRecipeHistory } from "./contexts/RecipeContext";
import "./App.css";

function App() {
  const API_URL = "https://www.themealdb.com/api/json/v1/1/";

  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const { history, addRecipeToHistory } = useRecipeHistory();

  const [searchTerm, setSearchTerm] = useState("");
  const [validationError, setValidationError] = useState("");

  const [allIngredients, setAllIngredients] = useState([]);
  const [searchType, setSearchType] = useState(0);

  useEffect(() => {
    const fetchAllIngredients = async () => {
      try {
        const response = await fetch(`${API_URL}list.php?i=list`);
        const data = await response.json();
        if (data.meals) {
          setAllIngredients(data.meals);
        }
      } catch (error) {
        console.error("Failed to fetch ingredients list", error);
      }
    };
    fetchAllIngredients();
  }, []);

  const fetchRandomRecipe = useCallback(async () => {
    setValidationError("");
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(`${API_URL}random.php`);
      if (!response.ok) throw new Error("Network response failed.");
      const data = await response.json();
      if (data.meals) {
        const recipe = data.meals[0];
        dispatch({ type: "FETCH_SUCCESS", payload: [recipe] });
        dispatch({ type: "SELECT_RECIPE", payload: recipe });
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

  const handleSearchByName = async () => {
    if (!searchTerm.trim()) {
      setValidationError("Please enter a recipe name to search.");
      return;
    }
    setValidationError("");
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(`${API_URL}search.php?s=${searchTerm}`);
      if (!response.ok) throw new Error("Network response failed.");
      const data = await response.json();
      if (data.meals) {
        dispatch({ type: "FETCH_SUCCESS", payload: data.meals });
        setSearchTerm("");
      } else {
        throw new Error(`No recipes found for "${searchTerm}".`);
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const handleSearchByIngredient = async (ingredient) => {
    if (!ingredient) return;
    const ingredientName = ingredient.strIngredient.replace(/ /g, "_");
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(`${API_URL}filter.php?i=${ingredientName}`);
      if (!response.ok) throw new Error("Network response failed.");
      const data = await response.json();
      if (data.meals) {
        dispatch({ type: "FETCH_SUCCESS", payload: data.meals });
      } else {
        throw new Error(
          `No recipes found with ingredient "${ingredient.strIngredient}".`
        );
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  const handleSelectRecipe = (recipe) => {
    const fetchFullRecipeDetails = async (recipeId) => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await fetch(`${API_URL}lookup.php?i=${recipeId}`);
        const data = await response.json();
        if (data.meals) {
          const fullRecipe = data.meals[0];
          dispatch({ type: "SELECT_RECIPE", payload: fullRecipe });
          addRecipeToHistory(fullRecipe);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };
    fetchFullRecipeDetails(recipe.idMeal);
  };

  const handleTabChange = (event, newValue) => {
    setSearchType(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h2" gutterBottom>
        🍴 Recipe of the Day
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        Discover a random recipe or search for your favorite dish!
      </Typography>

      <Box sx={{ width: "100%", mb: 3 }}>
        <Tabs value={searchType} onChange={handleTabChange} centered>
          <Tab label="Search by Name" />
          <Tab label="Smart Search by Ingredient" />
        </Tabs>
      </Box>

      {searchType === 0 && (
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
            onKeyDown={(e) => e.key === "Enter" && handleSearchByName()}
            error={!!validationError}
            helperText={validationError}
            sx={{ flexGrow: 1, maxWidth: 400 }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleSearchByName}
            disabled={state.loading}
            sx={{ height: "56px" }}
          >
            Search
          </Button>
        </Stack>
      )}

      {searchType === 1 && (
        <Box sx={{ mb: 3 }}>
          <IngredientSearch
            ingredients={allIngredients}
            onIngredientSelect={handleSearchByIngredient}
            disabled={state.loading}
          />
        </Box>
      )}

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

        {!state.loading &&
          !state.error &&
          (state.selectedRecipe ? (
            <RecipeCard recipe={state.selectedRecipe} />
          ) : (
            <SearchResults
              recipes={state.recipes}
              onSelectRecipe={handleSelectRecipe}
            />
          ))}
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
                    onClick={() => handleSelectRecipe(recipe)}
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
