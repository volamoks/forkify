import 'core-js';
import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import listView from './view/listView.js';
import paginationView from './view/paginationView.js';

if (module.hot) {
  module.hot.accept();
}
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //create a spinner while loading
    recipeView.renderSpinner();
    // console.log(listView);

    // mart selected result
    listView.update(model.getResultsOnPage());

    ///1. lodaing recipe
    await model.loadRecipe(id);

    //2.render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err.message);
    recipeView.renderError();
  }
};

const controlSearchRes = async function () {
  try {
    //1.get search query

    const query = searchView.getQuery();
    if (!query) return;
    // listView.renderSpinner();

    //2. loading search results
    await model.loadSearchResults(query);
    // 3/ render result
    // console.log(model.state.search.results);

    listView.render(model.getResultsOnPage());

    // render init pagination buttons
    paginationView.render(model.state.search);
    console.log(model.state.search);
  } catch (err) {
    console.log(err);
  }

  controlServings();
};

// controlSearchRes();
const controlPag = function (goToPage) {
  //render new results
  listView.render(model.getResultsOnPage(goToPage));
  //render new pag buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  // update recipe servings
  model.updateServing(newServing);
  // update view of recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const conrolNewBookmark = function () {
  model.addBookmark(model.state.recipe);
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServing(controlServings);
  searchView.addHendlerSearch(controlSearchRes);
  paginationView.addHandlerClick(controlPag);
  recipeView.addHandlerAtBookmark(conrolNewBookmark);

  // listView.addHandlerListRender(controlSearchRes);
};
init();
