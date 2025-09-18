import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const getIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return ingredients;
};

function RecipeCard({ recipe }) {
  if (!recipe) {
    return null;
  }

  const ingredients = getIngredients(recipe);

  return (
    <Card sx={{ boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)" }}>
      <CardMedia
        component="img"
        height="300"
        image={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <CardContent sx={{ p: 4 }}>
        <Typography gutterBottom variant="h4" component="div" sx={{ mb: 2 }}>
          {recipe.strMeal}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          <strong>Categoria:</strong> {recipe.strCategory} |{" "}
          <strong>Origin:</strong> {recipe.strArea}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Ingredients
          </Typography>
          <List dense>
            {ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <RestaurantMenuIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
            {recipe.strInstructions}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;
