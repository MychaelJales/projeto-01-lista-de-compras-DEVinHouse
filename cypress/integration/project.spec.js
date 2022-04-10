const PAGE_TITLE = 'Minha Lista de Compras';
const ABA_TITLE = 'Lista de Compras';
const INPUT_PRODUCT = 'input#input-product';
const BTN_ADD = 'button#btn-add';
const BTN_RMV_ALL = 'button#btn-rmv-all'
const BTN_RMV_SELECT = 'button#btn-rmv-select'
const ITEM_LIST = 'ul#list>li';
const LIST = 'ul#list';
const MY_MODAL = 'div#myModal';
const INPUT_PRICE = 'input#input-price';
const BTN_INSERT_PRICE = 'button#btn-insert-modal';
const BTN_CLOSE_01 = 'button#btn-close-1';
const BTN_CLOSE_02 = 'button#btn-close-2';
const SUM_TOTAL = 'p#value-sales';

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
    cy.get(ITEM_LIST).should('have.css', 'text-decoration').and('not.match', /line-through/);
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

describe('6 - Um botão para deletar todos os itens que estejam marcados como comprado', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });

  it('Marcando varios produtos como comprado e verificando se ao clickar em apagar selecionados, os selecionados são apagados', () => {
    const products = [
      {
        content: 'Produto 01',
        value: 5,
      },
      {
        content: 'Produto 02',
        value: 4,
      },
      {
        content: 'Produto 03',
        value: 6,
      },
    ];

    products.forEach((product) => addProduct(product));
    checkProductList(products);

    products.forEach((product, i) => {
      if (i < 2) {
        cy.get(`input#item-${i+1}`).click();
        cy.get(INPUT_PRICE).type(product.value);
        cy.get(BTN_INSERT_PRICE).click();
        cy.reload();
      }
    });

    cy.get(BTN_RMV_SELECT).click();
    cy.get(ITEM_LIST).contains(products[0].content).should('not.exist');
    cy.get(ITEM_LIST).contains(products[1].content).should('not.exist');
    cy.get(ITEM_LIST).contains(products[2].content).should('exist');
  });
});

describe('7 - Uma lista contendo os produtos já inseridos', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });
  
  it('Será verificado se a página possui uma tag `ul` com `id = list`', () => {
    cy.get(LIST).should('exist');
  });

  it('Adicionando varios produtos e verificando se cada item da lista possui um checkbox, o nome do produto e um botão', () => {
    const products = [
      {
        content: 'Produto 01',
      },
    ]
    products.forEach((product) => addProduct(product));
    checkProductList(products);
    cy.get(ITEM_LIST).find('input[type="checkbox"]').should('exist');
    cy.get(ITEM_LIST).find('label').contains(products[0].content);
    cy.get(ITEM_LIST).find('button#btn-rmv-1').should('exist');
  });
});

describe('8 - Cada linha da lista deve conter: checkbox para o usuário marcar aquele produto que já foi comprado; o texto que o usuário digitou ao cadastrar a atividade; botão para excluir o produto da lista, caso desejado', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });
  
  it('Será verificado se a página possui uma tag `ul` com `id = list`', () => {
    cy.get(LIST).should('exist');
  });

  it('Adicionando um produto e verificando se o item na lista possui um checkbox, o nome do produto e um botão', () => {
    const products = [
      {
        content: 'Produto 01',
      },
    ]
    products.forEach((product) => addProduct(product));
    checkProductList(products);
    cy.get(ITEM_LIST).find('input[type="checkbox"]').should('exist');
    cy.get(ITEM_LIST).find('label').contains(products[0].content);
    cy.get(ITEM_LIST).find('button#btn-rmv-1').should('exist');
  });
});

describe('9 - Quando o usuário marcar um item da compra, deve-se abrir um pop-up para que o usuário digite o valor da compra, após isso, deve-se somar ao valor total das compras', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });
  
  it('Será verificado se a inicia com o modal com display="none"', () => {
    cy.get(MY_MODAL).should('have.css', 'display', 'none');
    cy.get(INPUT_PRICE).should('not.be.visible');
    cy.get(BTN_INSERT_PRICE).should('not.be.visible');
    cy.get(BTN_CLOSE_01).should('not.be.visible');
    cy.get(BTN_CLOSE_02).should('not.be.visible');
  });

  it('Adicionando um produto e verificando se o ao clicar no checkbox, o modal é aberto', () => {
    const products = [
      {
        content: 'Produto 01',
      },
    ]
    products.forEach((product) => addProduct(product));
    checkProductList(products);
    cy.get(ITEM_LIST).find('input[type="checkbox"]').click();
    cy.get(MY_MODAL).should('not.have.css', 'display', 'none');
  });

  it('Adicionando um produto e verificando se o ao clicar no checkbox, o modal é aberto e contem um input e um botão inserir', () => {
    const products = [
      {
        content: 'Produto 01',
      },
    ]
    products.forEach((product) => addProduct(product));
    checkProductList(products);
    cy.get(ITEM_LIST).find('input[type="checkbox"]').click();
    cy.get(MY_MODAL).should('not.have.css', 'display', 'none');
    cy.get(INPUT_PRICE).should('be.visible');
    cy.get(BTN_INSERT_PRICE).should('be.visible');
    cy.get(BTN_CLOSE_01).should('be.visible');
    cy.get(BTN_CLOSE_02).should('be.visible');
  });

  it('Adicionando um produto e verificando se o ao clicar no checkbox, e inserir o preço o checkbox fica marcado, o texto riscado e o valor é somado no total', () => {
    const products = [
      {
        content: 'Produto 01',
        value: 5,
      },
    ];
    const valueTotal = parseFloat(products.reduce((acc, cur) => acc + cur.value, 0)).toFixed(2)
    products.forEach((product) => addProduct(product));
    checkProductList(products);
    cy.get(ITEM_LIST).find('input[type="checkbox"]').click();

    cy.get(INPUT_PRICE).type(5);
    cy.get(BTN_INSERT_PRICE).click();
    cy.reload();
    cy.get(ITEM_LIST).find('label').should('have.css', 'text-decoration').and('match', /line-through/);
    cy.get(ITEM_LIST).find('input[type="checkbox"]').check();
    cy.get(SUM_TOTAL).contains(`Total das Compras: R$ ${valueTotal}`);
  });

  it('Desmarcando o checkbox e verificando se o preço é diminuido do total, o checkbox é desmarcado e o texto volta a não ser riscado', () => {
    const products = [
      {
        content: 'Produto 01',
        value: 5,
      },
    ];
    const valueTotal = parseFloat(products.reduce((acc, cur) => acc + cur.value, 0)).toFixed(2)
    products.forEach((product) => addProduct(product));
    checkProductList(products);
    cy.get(ITEM_LIST).find('label').click();

    cy.get(INPUT_PRICE).type(5);
    cy.get(BTN_INSERT_PRICE).click();
    cy.reload();
    cy.get(ITEM_LIST).find('input[type="checkbox"]').click();
    cy.get(ITEM_LIST).find('label').should('have.css', 'text-decoration').and('not.match', /line-through/);

    cy.get(SUM_TOTAL).contains(`Total das Compras: R$ 0.00`);
  });

  it('Marcando varios produtos como comprado e verificando se a soma total está correta', () => {
    const products = [
      {
        content: 'Produto 01',
        value: 5,
      },
      {
        content: 'Produto 02',
        value: 4,
      },
      {
        content: 'Produto 03',
        value: 6,
      },
    ];
    const valueTotal = parseFloat(products.reduce((acc, cur) => acc + cur.value, 0)).toFixed(2);
    products.forEach((product) => addProduct(product));
    checkProductList(products);

    products.forEach((product, i) => {
      cy.get(`input#item-${i+1}`).click();
      cy.get(INPUT_PRICE).type(product.value);
      cy.get(BTN_INSERT_PRICE).click();
      cy.reload();
    });

    cy.get(SUM_TOTAL).contains(`Total das Compras: R$ ${valueTotal}`);
  });
});

describe('10 - A lista deve ser salva no "localStorage" do navegador (incluindo os produtos que já foram realizados), e deve ser carregada sempre que a página for reaberta.', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });

  it('Verificando se a lista está sendo salva no localStorage e ao atualizar a pagina ela não apaga os produtos', () => {
    const products = [
      {
        content: 'Produto 01',
        value: 5,
      },
      {
        content: 'Produto 02',
        value: 4,
      },
      {
        content: 'Produto 03',
        value: 6,
      },
    ];

    const valueTotal = parseFloat(products.reduce((acc, cur) => acc + cur.value, 0)).toFixed(2);
    products.forEach((product) => addProduct(product));
    checkProductList(products);

    products.forEach((product, i) => {
      cy.get(`input#item-${i+1}`).click();
      cy.get(INPUT_PRICE).type(product.value);
      cy.get(BTN_INSERT_PRICE).click();
      cy.reload();
    });
    cy.reload();
    cy.get(SUM_TOTAL).contains(`Total das Compras: R$ ${valueTotal}`);

    cy.get(ITEM_LIST).contains(products[0].content).should('exist');
    cy.get(ITEM_LIST).contains(products[1].content).should('exist');
    cy.get(ITEM_LIST).contains(products[2].content).should('exist');
  });

  it('Verificando se a lista está sendo salva no localStorage e ao atualizar a pagina ela não apaga os produtos marcados como comprados', () => {
    const products = [
      {
        content: 'Produto 01',
        value: 5,
      },
      {
        content: 'Produto 02',
        value: 4,
      },
      {
        content: 'Produto 03',
        value: 6,
      },
    ];

    products.forEach((product) => addProduct(product));
    checkProductList(products);

    products.forEach((product, i) => {
      if (i < 2) {
        cy.get(`input#item-${i+1}`).click();
        cy.get(INPUT_PRICE).type(product.value);
        cy.get(BTN_INSERT_PRICE).click();
        cy.reload();
      }
    });

    cy.reload();
    cy.get('#label-1').should('have.css', 'text-decoration').and('match', /line-through/);
    cy.get('#item-1').check();
    cy.get('#label-2').should('have.css', 'text-decoration').and('match', /line-through/);
    cy.get('#item-2').check();
    cy.get('#label-3').should('have.css', 'text-decoration').and('not.match', /line-through/);
    cy.get('#item-3').uncheck();
    cy.get(ITEM_LIST).contains(products[0].content).should('exist');
    cy.get(ITEM_LIST).contains(products[1].content).should('exist');
    cy.get(ITEM_LIST).contains(products[2].content).should('exist');
  });
});
