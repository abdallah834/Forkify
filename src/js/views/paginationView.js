import View from './view.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _ParentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._ParentEl.addEventListener('click', function (e) {
      // event delegation: choosing the nearest parent of the targeted child event
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      // getting the value of a custom data attribute
      // converting a string to number we can use +string
      const gotToPage = +btn.dataset.goto;

      handler(gotToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.currentPage;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    // page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `<button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
          </button>`;
    }
    // last page
    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
    }
    // other page
    if (currentPage < numPages) {
      return `<button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>`;
    }
    // page 1 and there are no other pages
    return ``;
  }
}
export default new PaginationView();
