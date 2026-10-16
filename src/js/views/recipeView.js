import icons from 'url:../../img/icons.svg';
function decimalToFraction(num) {
  // Handle integers
  if (Number.isInteger(num)) {
    return `${num}`;
  }
  if (num) {
    const str = num.toString();
    const decimalPart = str.split('.')[1] || '';
    const denominator = Math.pow(10, decimalPart.length);
    let numerator = Math.round(num * denominator);

    // Handle negative numbers
    if (num < 0) {
      numerator = Math.abs(numerator);
    }

    // Simplify using GCD
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(numerator, denominator);

    const simpNumerator = numerator / divisor;
    const simpDenominator = denominator / divisor;

    // Return mixed number if applicable
    const wholePart = Math.floor(simpNumerator / simpDenominator);
    const remainder = simpNumerator % simpDenominator;

    if (wholePart === 0) {
      return `${num < 0 ? '-' : ''}${remainder}/${simpDenominator}`;
    } else {
      return `${num < 0 ? '-' : ''}${wholePart} & ${remainder}/${simpDenominator}`;
    }
  } else {
    return `${Number(num)}`;
  }
}

class RecipeView {
  #ParentEl = document.querySelector('.recipe');
  #data;
  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#ParentEl.insertAdjacentHTML('afterbegin', markup);
  }
  #clear() {
    this.#ParentEl.innerHTML = ``;
  }
  renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this.#ParentEl.innerHTML = ``;
    this.#ParentEl.insertAdjacentHTML('afterbegin', markup);
  }
  #generateMarkup() {
    return `    
        <figure class="recipe__fig">
          <img src=${this.#data.image} alt=${this.#data.title} class="recipe__img"/>
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(ingredient => this.#generateMarkupIngredient(ingredient)).join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
       `;
  }
  #generateMarkupIngredient(ingredient) {
    return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${decimalToFraction(ingredient.quantity) || ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>`;
  }
}

// exporting a single view object of the class to use in other parts of the app instead reinitializing an view object each time
export default new RecipeView();
