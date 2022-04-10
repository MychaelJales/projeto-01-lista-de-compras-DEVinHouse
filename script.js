// import de helpers
import { getLocalStorage, setLocalStorage } from "./helpers/localStorage.js";

//  Capturando todos botões e adicionando um title
const btnAdd = document.getElementById('btn-add');
btnAdd.title = 'Adiciona produtos na lista.'
const btnRmvAll = document.getElementById('btn-rmv-all');
btnRmvAll.title = 'Apaga todos produtos da lista.';
const btnRmvSelect = document.getElementById('btn-rmv-select');
btnRmvSelect.title = 'Apaga apenas itens marcados como comprados.';
const btnInsertModal = document.getElementById('btn-insert-modal');
btnInsertModal.title = 'Insere o valor no produto no valor total das compras.';
const btnCloseModal1 = document.getElementById('btn-close-1');
btnCloseModal1.title = 'Fechar campo.';
const btnCloseModal2 = document.getElementById('btn-close-2');
btnCloseModal2.title = 'Fechar campo.';
const toggleMood = document.getElementById('toggle-mood');
toggleMood.title = 'Alternar dark-mood/ligth-mood'

// Capturando os inputs
const inputProduct = document.getElementById('input-product');
const inputPrice = document.getElementById('input-price');

// capturando a <ul>
const list = document.getElementById('list');

// Capturando o <p> onde a soma dos preços é exibida
const valueSales = document.getElementById('value-sales');

// Capturando o ícone dos moods
const iconMood = document.getElementById('icon-mood');

// Capturando as variáveis CSS
const cssVar = document.styleSheets[1].cssRules[0].style;

// Criando a Classe 
class ProductsList {
  #state;
  constructor(state) {
    this.#state = state; // lista de compras
    this.id = state.length > 0 ? state[state.length - 1].id + 1 : 1; // id de cada item da lista
    this.idOpenModal = 0; // controla o id do item responsável por abrir o modal
    this.sumTotal = 0; // soma total dos produtos comprados
    this.controllerMood = false; // controla o mood
  }

  set setState (state) { // salva a lista
    this.#state = state;
    setLocalStorage(state);
  }

  get getState() { // pega os valores da lista
    return this.#state;
  }

  removeAll() { // remove todos os itens da lista
    this.setState = [];
    this.updateList();
  }
  
  removeById(itemId) { // remove um item de acordo com a id dele
    const oldState = this.getState;
    const newState = oldState.filter(({ name, id }) => id !== +itemId)
    this.setState = newState;
    this.updateList();
  }

  removeSelected() { // remove os itens que estão marcaods como comprados
    const oldState = this.getState;
    oldState.forEach((item) => {
      if (item.checked) {
        this.removeById(item.id);
      }
    });
  }

  removePrice(itemId) { // ao desmarcar um item remove o valor dele do state
    const oldState = this.getState;
    const newState = oldState.map((item) => {
      if (item.id === +itemId) {
        const value = 0;
        return {...item, value };
      } else {
        return item;
      }
    });
    this.setState = newState;
    this.sumAll();
  }

  controllerModal(checked, itemId) { // controla o modal para ele não ser aberto ao desmarcar um item
    if (checked) {
      this.idOpenModal = itemId;
      myModal.show()
    } else {
      this.idOpenModal = itemId;
      this.removePrice(itemId);
      this.updateList();
    }
  }

  checkboxClick(itemId) { // atualiza o state ao marcar um item e também abre o modal
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

  updateList() { // renderiza a lista na tela com a atualização dos dados
    list.innerHTML = '';
    const state = this.getState;
    state.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input class="form-check-input" type="checkbox" value="${item.id}" id="item-${item.id}" />
        <label id="label-${item.id}" class="form-check-label" for="item-${item.id}">
          ${item.name}
        </label>
        <button id="btn-rmv-${item.id}" type="button" class="btn btn-outline-danger btn-sm">🗑️</button>
      `;
      list.appendChild(li);
      this.configItemList(item);
    });
    this.disabledBtns();
    this.sumAll();
  }

  configItemList({ id, checked }) { // configura os itens da lista, adicionando listeners nos botões e checkbox's
    const label = document.getElementById(`label-${id}`);
    const checkBox = document.getElementById(`item-${id}`);
    const btnRmvOne = document.getElementById(`btn-rmv-${id}`);

    checkBox.checked = checked;
    checkBox.addEventListener('click',() => productsList.checkboxClick(id));
    btnRmvOne.addEventListener('click',() => productsList.removeById(id));

    btnRmvOne.title = 'Apagar item.'
    if (checked) {
      label.style.textDecoration = 'line-through';
      checkBox.title = 'Desmarcar como comprado.';
      label.title = 'Desmarcar como comprado.';
    } else {
      checkBox.title = 'Marcar como comprado.';
      label.title = 'Marcar como comprado.';
    }
  }

  disabledBtns() { // controla se os botões 'remover todos' e 'remover selecionados' devem estar habilitados
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

  clearInput() { // limpa o input de produtos
    inputProduct.value = '';
  }

  addState() { // adiciona o novo produto a lista
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

  addPrice() { // adiciona o preço do produto 
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
    this.updateList();
  }

  sumAll() { // soma todos os produtos marcados como comprados
    const state = this.getState;
    this.sumTotal = parseFloat(state.reduce((acc, cur) => acc + cur.value, 0)).toFixed(2);
    valueSales.innerText = `Total das Compras: R$ ${this.sumTotal}`;
  }

  closeModal() { // se o modal for fechado sem adicionar um preço, faz com que o checkbox não fique checked
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

  mood() { // atualiza as variáveis css para o controle do mood
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

const productsList = new ProductsList(getLocalStorage()); // instancia a classe
productsList.updateList(); // renderiza a lista

// inserindo listeners nos botões
btnAdd.addEventListener('click', () => productsList.addState());
btnRmvAll.addEventListener('click', () => productsList.removeAll());
btnRmvSelect.addEventListener('click', () => productsList.removeSelected());
btnInsertModal.addEventListener('click', () => productsList.addPrice());
btnCloseModal1.addEventListener('click', () => productsList.closeModal());
btnCloseModal2.addEventListener('click', () => productsList.closeModal());
toggleMood.addEventListener('click', () => productsList.mood())

// instanciando o modal do bootstrap 
const myModal = new bootstrap.Modal(document.getElementById('myModal'), {});
