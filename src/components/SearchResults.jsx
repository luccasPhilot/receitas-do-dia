import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';

function SearchResults({ recipes, onSelectRecipe }) {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom align="left">
        Search Results
      </Typography>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea
                onClick={() => onSelectRecipe(recipe)}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {recipe.strMeal}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SearchResults;