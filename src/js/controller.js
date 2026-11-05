import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
if (module.hot) {
  module.hot.accept();
}
const recipeController = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // rendering loading spinner
    recipeView.renderSpinner();
    // Loading the recipe
    await model.loadRecipe(id);

    // Rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};
const searchResultsController = async function () {
  try {
    // 1) Getting the query from the search input
    const query = searchView.getQuery();

    if (!query) return;
    // render spinner for results view
    resultsView.renderSpinner();
    // 2) Load search results
    await model.loadSearchResults(query);
    // clear spinner loading after making API call
    resultsView._clear();
    // 3) Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    // 4) Render initial pagination btns
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
const paginationController = async function (gotToPage = 1) {
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(gotToPage));
  // 2) Render mew pagination btns
  paginationView.render(model.state.search);
};
const init = function () {
  recipeView.addHandlerRender(recipeController);
  searchView.addHandlerSearch(searchResultsController);
  paginationView.addHandlerClick(paginationController);
};
init();
