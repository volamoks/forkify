import icon from 'url:../../img/icons.svg';
import View from './view';
// console.log(Fraction);

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsOnPage
    );
    console.log(this._data.results.length);
    console.log(numPages);
    console.log(currPage);
    // at page 1, there other pages
    if (currPage === 1 && numPages > 1) {
      //   return 'page 1 and others'

      return `

          <button data-goto="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
            <span>Page ${currPage + 1}/${numPages}</span>

        </button> `;
    }

    // last page
    if (currPage === numPages && numPages > 1) {
      return ` 
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
            <span>Page ${currPage - 1}/${numPages}</span>
             <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
          </button>
          `;
    }
    // other pages
    if (currPage < numPages) {
      return ` 
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
            <span>Page ${currPage - 1}/${numPages}</span>
             <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
          </button>
          <button data-goto="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
            <span>Page ${currPage + 1}/${numPages}</span>

          </button>
          `;
    }
    // at page 1, no other pages
    return '';
  }
}

export default new PaginationView();
