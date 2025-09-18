import React from 'react';
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
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const getIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
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
    <Card sx={{ maxWidth: 700, margin: 'auto', mt: 4 }}>
      <CardMedia
        component="img"
        height="300"
        image={recipe.strMealThumb}
        alt={recipe.strMeal}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {recipe.strMeal}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <strong>Categoria:</strong> {recipe.strCategory} | <strong>Origem:</strong> {recipe.strArea}
        </Typography>

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

        <Box sx={{ mt: 3 }}>
           <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
            {recipe.strInstructions}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RecipeCard;