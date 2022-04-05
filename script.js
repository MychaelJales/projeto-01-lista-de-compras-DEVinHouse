const btnAdd = document.getElementById('btn-add');
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

  updateList() {
    list.innerHTML = '';
    const state = this.getState;
    state.forEach((item) => {
      const li = document.createElement('li');
      li.innerText = item.name;
      list.appendChild(li);
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

const productsList1 = new ProductsList();

btnAdd.addEventListener('click', () => productsList1.addState());
