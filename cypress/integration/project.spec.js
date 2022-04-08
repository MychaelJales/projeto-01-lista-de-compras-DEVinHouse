const PAGE_TITLE = 'Minha Lista de Compras';
const ABA_TITLE = 'Lista de Compras';
const INPUT_PRODUCT = 'input#input-product';

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
