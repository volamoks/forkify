import icon from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElelement = Array.from(newDom.querySelectorAll('*'));
    const currElement = Array.from(this._parentElement.querySelectorAll('*'));

    newElelement.forEach((newEl, i) => {
      const currEl = currElement[i];
      //   console.log(currEl, newEl.isEqualNode(currEl));
      //updates changed text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(newEl.firstChild?.nodeValue.trim());
        currEl.textContent = newEl.textContent;
      }

      //updates changed attributes
      if (!newEl.isEqualNode(currEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = ` <div class="spinner">
          <svg>
            <use href="http://localhost:1234/icons.dfd7a6db.svg?1674231326273#icon-loader"></use>
          </svg>
        </div> `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icon}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._succesMessage) {
    const markup = `

        <div class="message">
          <div>
            <svg>
              <use href="${icon}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>

`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
