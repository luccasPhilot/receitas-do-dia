export const initialState = {
  loading: true,
  recipes: [],
  selectedRecipe: null,
  error: null,
};

export function recipeReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        recipes: action.payload,
        selectedRecipe: null,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        recipes: [],
        selectedRecipe: null,
        error: action.payload,
      };
    case "SELECT_RECIPE":
      return {
        ...state,
        selectedRecipe: action.payload,
        loading: false,
      };
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}
