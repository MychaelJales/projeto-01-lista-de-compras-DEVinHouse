class ProductsList {
  #state;
  constructor() {
    this.#state = [];
    this.id = 1;
  }

  set setState (name) {
    const { id } = this;
    const newProduct = { name, id }
    this.#state = [...this.#state, newProduct];
    this.id += 1;
  }

  get getState() {
    return this.#state;
  }
}

const productsList = new ProductsList();
