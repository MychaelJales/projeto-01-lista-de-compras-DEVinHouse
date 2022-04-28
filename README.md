
# Projeto-01-DEVinHouse
- [Lista de Compras 🖥️ 📝](#ListadeCompras-️-)
  - [Requisitos](#requisitos)
  - [Instalação](#instalação)
    - [Estrutura do aplicativo](#estrutura-do-aplicativo)
    - [Quais Bibliotecas e Frameworks foram utilizados no desenvolvimento desta aplicação?](#bibis-frameworks)
      - [Instalando e Rodando os Testes](#instalando-e-rodando-os-testes)
### Lista de Compras 🖥️ 📝

Projeto avaliativo 1 referente ao módulo 1 do curso DEVinHouse.

Olá! Essa é uma aplicação de Lista de Compras **ListadeCompras**!

Com ela, você pode cadastrar uma lista de produdos que deseja comprar e a cada compra realizada, marcar o item como comprado. Ao marcar como comprado, deverá ser inserido o valor do produto para que seja realizada uma soma do total das compras.

Além disso a aplicação conta com modos dark e light, para o usuário escolher de acordo com sua preferência.

A aplicação também conta com cobertura de testes E2E.

Uma verdadeira *mão-na-roda* na hora de ir as compras!

#### Requisitos

- [NodeJS LTS](https://github.com/nodesource/distributions/blob/master/README.md#debinstall) (14 ou mais).
  - O Sistema Operacional [deve suportar o NodeJS](https://github-com.translate.goog/nodejs/build/issues/2168?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=nui).

#### Instalação

Essa é uma aplicação com HTML, CSS e JavaScript apenas, para rodar precisa apenas de um software que inicie um servidor local (Ex.: Live Server).

##### Estrutura do aplicativo

```bash
projeto-01-lista-de-compras-DEVinHouse/
├── README.md # este arquivo
├── cypress # responsável pelos testes
│   ├── downloads 
│   ├── fixtures # configurações do cypress
│   ├── integrations # onde ficam os arquivos .spec.js que são onde os testes são escritos
│   ├── plugins # configurações do cypress
│   ├── reports # configurações do cypress
│   └── support # configurações do cypress
├── helpers # funções de suporte ao código principal
│   └── localStorage.js # funções de acesso ao localStorage
├── .gitignore # arquivos para o git ignorar
├── cypress.json # configurações do cypress
├── fav-icon.png # fav icon da página
├── index.html # HTML da página
├── package-lock.json # # arquivo responsável por otimizar a instalação das bibs de testes em outros ambientes
├── package.json # responsável pela instalação das bibs de testes
├── reporter.json # configurações de integração do cypress e o mocha
├── script.js # arquivo JS da página
└── styles.css # arquivo de estilizações da página

```

##### Quais Bibliotecas e Frameworks foram utilizados no desenvolvimento desta aplicação?

- Bootstrap 5;
- cypress;
- mocha;

###### Instalando e Rodando os Testes

- Acesse a pasta `./projeto-01-lista-de-compras-DEVinHouse`;
- Instale as dependências da aplicação utilizando o comando `npm install`;
- O processo não deve retornar erros. `Warns` *(Avisos)* não impedem seu funcionamento;
- Rodar os testes com `npm run cy:open` (Para ver no navegador) ou `npm tests`;

