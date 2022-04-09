const PAGE_TITLE = 'Minha Lista de Compras';
const ABA_TITLE = 'Lista de Compras';
const INPUT_PRODUCT = 'input#input-product';
const BTN_ADD = 'button#btn-add';
const BTN_RMV_ALL = 'button#btn-rmv-all'
const ITEM_LIST = 'ul#list>li';

const addProduct = (product) => {
  cy.get(INPUT_PRODUCT).type(product.content);
  cy.get(BTN_ADD).click();
};

const checkProductList = (products = []) => {
  if (products.length === 0) {
    cy.get(ITEM_LIST).should('not.exist');
  } else {
    cy.get(ITEM_LIST).each(($li, i) => {
      const product = products[i];
      const li = $li;

      expect(li).to.contains.text(product.content);
    });
  }
}

describe('1 - Um título na aba do navegador, para que o usuário encontre a sua aplicação no meio das várias abas que constantemente mantém abertas;', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });
  
  it('Será verificado se a página possui uma tag `title` com o conteúdo `Lista de Compras`', () => {
    cy.get('title').contains(ABA_TITLE);
  });
});

describe('2 - Um cabeçalho dentro da página, para que o usuário saiba facilmente em que página se encontra e do que se trata o conteúdo', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });
  
  it('Será verificado se a página possui uma tag `header` com o conteúdo `Minha Lista de Compras`', () => {
    cy.get('header').contains(PAGE_TITLE);
  });
});

describe('3 - Um campo de texto para digitar o nome do produto a ser adicionado à lista', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });
  
  it('Será verificado se a página possui uma tag `input` com `id = input-product`', () => {
    cy.get(INPUT_PRODUCT).should('exist');
  });

  it('Será verificado se a página possui uma tag `input` com `placeholder = Insira sua nova compra`', () => {
    cy.get('input[placeholder="Insira sua nova compra"]').should('exist');
  });
});

describe('4 - Um botão para adicionar um novo produto na lista', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });
  
  it('Será verificado se a página possui uma tag `button` com `id = btn-add`', () => {
    cy.get(BTN_ADD).should('exist');
  });

  it('No campo de input será digitado o nome de um produto qualquer e, em depois, será clickado no botão de Adicionar. Será verificado de após o clique, o texto digitado aparece na lista e desaparece do input', () => {
    const product01 = {
      content: 'Produto 01',
    };

    addProduct(product01);
    checkProductList([product01]);
    cy.get(INPUT_PRODUCT).should('have.value', '');
    cy.get('input[placeholder="Insira sua nova compra"]').should('exist');
  });

  it('Adicionando varios produtos e testando se todos aparecem', () => {
    const products = [
      {
        content: 'Produto 01',
      },
      {
        content: 'Produto 02',
      },
      {
        content: 'Produto 03',
      },
    ]

    products.forEach((product) => addProduct(product));
    checkProductList(products);
    cy.get(INPUT_PRODUCT).should('have.value', '');
    cy.get('input[placeholder="Insira sua nova compra"]').should('exist');
  });

  it('Será verificado se ao adicionar um produto na lista ele não vem com a text-decoration = line-trhough', () => {
    const product01 = {
      content: 'Produto 01',
    };

    addProduct(product01);
    checkProductList([product01]);
    cy.get(ITEM_LIST).should('not.have.css', 'text-decoration', 'line-through');
  });
});

describe('5 - Um botão para deletar todos os itens de uma única vez', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });
  
  it('Será verificado se a página possui uma tag `button` com `id = btn-rmv-all`', () => {
    cy.get(BTN_RMV_ALL).should('exist');
  });

  it('Adicionando varios produtos e testando se o botão `Apagar Lista` remove todos os produtos', () => {
    const products = [
      {
        content: 'Produto 01',
      },
      {
        content: 'Produto 02',
      },
      {
        content: 'Produto 03',
      },
    ]

    products.forEach((product) => addProduct(product));
    checkProductList(products);
    cy.get(BTN_RMV_ALL).click();
    cy.get(ITEM_LIST).should('not.exist');
  });
});
