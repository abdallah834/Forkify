import * as model from './model.js';
import recipeView from './views/recipeView.js';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipeController = async () => {
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
const init = function () {
  recipeView.addHandlerRender(recipeController);
};
init();
