const btnAdd = document.getElementById('btn-add');
const btnRmvAll = document.getElementById('btn-rmv-all');
const btnRmvSelect = document.getElementById('btn-rmv-select');
const btnInsertModal = document.getElementById('btn-insert-modal');
const inputProduct = document.getElementById('input-product');
const list = document.getElementById('list');
const inputPrice = document.getElementById('input-price');

// const state = [];

class ProductsList {
  #state;
  constructor() {
    this.#state = [];
    this.id = 1;
    this.idOpenModal = 0;
    this.sumTotal = 0;
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
    const newState = oldState.filter(({ name, id }) => id !== +itemId)
    this.setState = newState;
    this.updateList();
  }

  removeSelected() {
    const itens = document.querySelectorAll('.form-check-input');
    itens.forEach((item) => {
      if (item.checked) {
        this.removeById(item.value);
      }
    });
  }

  removePrice(itemId) {
    const oldState = this.getState;
    const newState = oldState.map((item) => {
      if (item.id === +itemId) {
        const value = 0;
        return {...item, value };
      } else {
        console.log({ v: 'dentro do else', item });
        return item;
      }
    });
    this.setState = newState;
    console.log(this.getState);
    this.sumAll();
  }

  controllerModal(checked, itemId) {
    if (checked) {
      this.idOpenModal = itemId;
      myModal.show()
    } else {
      this.idOpenModal = itemId;
      this.removePrice(itemId);
    }
  }

  checkboxClick(itemId) {
    const oldState = this.getState;
    const newState = oldState.map((item) => {
      if (item.id === +itemId) {
        const toogle = !item.checked;
        return {...item, checked: toogle};
      } else {
        return item;
      }
    });
    const { checked } = newState.find((item) => item.id === +itemId)
    this.setState = newState;
    this.controllerModal(checked, itemId);
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
      document.getElementById(`item-${item.id}`).addEventListener('click',() => productsList.checkboxClick(item.id));
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
    const newProduct = { name: value, id, checked: false, value: 0 }
    const newState = [...oldState, newProduct];
    this.setState = newState;
    this.id += 1;
    this.updateList();
    this.clearInput();
  }

  addPrice() {
    const oldState = this.getState;
    const { idOpenModal } = this;
    const newState = oldState.map((item) => {
      if (item.id === +idOpenModal) {
        const value = Number(inputPrice.value);
        return {...item, value };
      } else {
        return item;
      }
    });
    this.setState = newState;
    this.sumAll();
    inputPrice.value = '';
  }

  sumAll() {
    const state = this.getState;
    this.sumTotal = state.reduce((acc, cur) => acc + cur.value, 0);
    console.log(this.sumTotal);
  }
}

const productsList = new ProductsList();

btnAdd.addEventListener('click', () => productsList.addState());
btnRmvAll.addEventListener('click', () => productsList.removeAll());
btnRmvSelect.addEventListener('click', () => productsList.removeSelected());
btnInsertModal.addEventListener('click', () => productsList.addPrice())

// var AmyModal = document.getElementById('AmyModal');
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {})

/* AmyModal.addEventListener('click', function () {
  myModal.show()
}) */

