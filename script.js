const btnAdd = document.getElementById('btn-add');
const btnRmvAll = document.getElementById('btn-rmv-all');
const inputProduct = document.getElementById('input-product');
const list = document.getElementById('list');

// const state = [];

class ProductsList {
  #state;
  constructor() {
    this.#state = [];
    this.id = 1;
  }

  set setState (state) {
    this.#state = state;
  }

  get getState() {
    return this.#state;
  }

  removeAll() {
    this.setState = [];
    this.updateList();
  }
  
  removeById(itemId) {
    const oldState = this.getState;
    const newState = oldState.filter(({ name, id }) => id !== itemId)
    this.setState = newState;
    this.updateList();
  }

  updateList() {
    list.innerHTML = '';
    const state = this.getState;
    state.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input class="form-check-input" type="checkbox" value="${item.id}" id="item-${item.id}" />
        <label class="form-check-label" for="item-${item.id}">
          ${item.name}
        </label>
        <button id="btn-rmv-${item.id}" type="button" class="btn btn-outline-danger btn-sm">🗑️</button>
      `;
      list.appendChild(li);
      document.getElementById(`btn-rmv-${item.id}`).addEventListener('click',() => productsList.removeById(item.id));
    });
  }

  clearInput() {
    inputProduct.value = '';
  }

  addState() {
    const { id } = this;
    const { value } = inputProduct;
    const oldState = this.getState;
    const newProduct = { name: value, id }
    const newState = [...oldState, newProduct];
    this.setState = newState;
    this.id += 1;
    this.updateList();
    this.clearInput();
  }

}

const productsList = new ProductsList();

btnAdd.addEventListener('click', () => productsList.addState());
btnRmvAll.addEventListener('click', () => productsList.removeAll());
