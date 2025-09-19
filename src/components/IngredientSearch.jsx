import React from 'react';
import { Autocomplete, TextField, Box, Typography } from '@mui/material';

function IngredientSearch({ ingredients, onIngredientSelect, disabled }) {
    return (
        <Autocomplete
            options={ingredients}
            getOptionLabel={(option) => option.strIngredient}
            disabled={disabled}
            onChange={(event, newValue) => {
                onIngredientSelect(newValue);
            }}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="40"
                        src={`https://www.themealdb.com/images/ingredients/${option.strIngredient}-Small.png`}
                        alt={option.strIngredient}
                    />
                    <Typography variant="body1">{option.strIngredient}</Typography>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search by ingredient..."
                    variant="outlined"
                    sx={{ flexGrow: 1, maxWidth: 500, mx: 'auto' }}
                />
            )}
        />
    );
}

export default IngredientSearch;