import { getLocalStorage, setLocalStorage } from "./helpers/localStorage.js";

const btnAdd = document.getElementById('btn-add');
const btnRmvAll = document.getElementById('btn-rmv-all');
const btnRmvSelect = document.getElementById('btn-rmv-select');
const btnInsertModal = document.getElementById('btn-insert-modal');
const btnCloseModal1 = document.getElementById('btn-close-1');
const btnCloseModal2 = document.getElementById('btn-close-2');
const toggleMood = document.getElementById('toggle-mood');

const inputProduct = document.getElementById('input-product');
const inputPrice = document.getElementById('input-price');

const list = document.getElementById('list');

const valueSales = document.getElementById('value-sales');
const iconMood = document.getElementById('icon-mood');

const cssVar = document.styleSheets[1].rules[0].style;

class ProductsList {
  #state;
  constructor(state) {
    this.#state = state;
    this.id = 1;
    this.idOpenModal = 0;
    this.sumTotal = 0;
    this.controllerMood = false;
  }

  set setState (state) {
    this.#state = state;
    setLocalStorage(state);
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
    const oldState = this.getState;
    oldState.forEach((item) => {
      if (item.checked) {
        this.removeById(item.id);
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
      document.getElementById(`item-${item.id}`).checked = item.checked;
      document.getElementById(`item-${item.id}`).addEventListener('click',() => productsList.checkboxClick(item.id));
      document.getElementById(`btn-rmv-${item.id}`).addEventListener('click',() => productsList.removeById(item.id));
    });
    this.disabledBtns();
    this.sumAll();
  }

  disabledBtns() {
    const state = this.getState;
    if (state.length !== 0) {
      btnRmvAll.disabled = false;
    } else {
      btnRmvAll.disabled = true;
    }
    const checked = state.find((item) => item.checked )
    if (checked) {
      btnRmvSelect.disabled = false;
    } else {
      btnRmvSelect.disabled = true;
    }
  }

  clearInput() {
    inputProduct.value = '';
  }

  addState() {
    if (!inputProduct.value) {
      alert('É necessário inserir um nome para o produto');
      return null;
    }
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
    if (!inputPrice.value) {
      alert('É necessário inserir um valor');
      return null;
    }
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
    btnRmvSelect.disabled = false;
    myModal.hide();
  }

  sumAll() {
    const state = this.getState;
    this.sumTotal = parseFloat(state.reduce((acc, cur) => acc + cur.value, 0)).toFixed(2);
    valueSales.innerText = `Total das Compras: R$ ${this.sumTotal}`;
  }

  closeModal() {
    const oldState = this.getState;
    const newState = oldState.map((item) => {
      if (item.id === +this.idOpenModal) {
        return {...item, checked: false};
      } else {
        return item;
      }
    });
    this.setState = newState;
    this.updateList();
  }

  mood() {
    const toggle = !this.controllerMood;
    this.controllerMood = toggle;

    if (toggle) {
      cssVar.cssText = `
        --body-color: #262626;
        --primary-color: #363636;
        --secondary-color: #363636;
        --font-color: #EEEEEE;`
        iconMood.innerText = '🌚';
    } else {
      cssVar.cssText = `
        --body-color: rgb(187, 187, 187);
        --primary-color: rgb(241, 241, 241);
        --secondary-color: rgb(221, 221, 221);
        --font-color: rgb(27, 27, 27):`
        iconMood.innerText = '🌞';
    }
  }
}

const productsList = new ProductsList(getLocalStorage());
productsList.updateList();

btnAdd.addEventListener('click', () => productsList.addState());
btnRmvAll.addEventListener('click', () => productsList.removeAll());
btnRmvSelect.addEventListener('click', () => productsList.removeSelected());
btnInsertModal.addEventListener('click', () => productsList.addPrice());
btnCloseModal1.addEventListener('click', () => productsList.closeModal());
btnCloseModal2.addEventListener('click', () => productsList.closeModal());
toggleMood.addEventListener('click', () => productsList.mood())

const myModal = new bootstrap.Modal(document.getElementById('myModal'), {});


