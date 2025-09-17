export const initialState = {
  loading: true,
  recipe: null,
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
        recipe: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        recipe: null,
        error: action.payload,
      };
    default:
      throw new Error(`Ação desconhecida: ${action.type}`);
  }
}
