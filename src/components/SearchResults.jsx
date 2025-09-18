import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box } from '@mui/material';

function SearchResults({ recipes, onSelectRecipe }) {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom align="left" sx={{ mb: 3 }}>
        Search Results
      </Typography>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
            <Card sx={{ 
                height: '100%',
                boxShadow: '0 4px 18px 0 rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                }
            }}>
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