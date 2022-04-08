const PAGE_TITLE = 'Minha Lista de Compras';

describe('2 - Um cabeçalho dentro da página, para que o usuário saiba facilmente em que página se encontra e do que se trata o conteúdo', () => {
  beforeEach(() => {
    cy.viewport(1366, 768);
    cy.visit('./index.html');
  });
  
  it('Será verificado se sua página possui uma tag `header` com o conteúdo `Minha Lista de Compras`', () => {
    cy.get('header').contains(PAGE_TITLE);
  });
});
