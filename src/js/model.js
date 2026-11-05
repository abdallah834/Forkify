import { API_URL, RESULT_PAGES } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    currentPage: 1,
    resultsPerPage: RESULT_PAGES,
  },
};

export const loadRecipe = async function (id) {
  try {
    const { recipe } = await getJSON(`${API_URL}${id}`);

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    // Temp error handling
    throw error;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const { recipes } = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};
export const getSearchResultsPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
