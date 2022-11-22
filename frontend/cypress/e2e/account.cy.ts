import login from '../fixtures/login.json';
import username from '../fixtures/username.json';
import transactions from '../fixtures/transactions.json';
import findAccount from '../fixtures/findAccount.json';

const reqValueLogin = 'http://localhost:3001/users/login';
const reqValueUsername = 'http://localhost:3001/users/username';
const reqValueTransactions = 'http://localhost:3001/transactions';
const reqValueAccount = 'http://localhost:3001/accounts/2';

const beginAccountTest = () => {
  cy.visit('http://localhost:3000/login', {
    onBeforeLoad(win) {
      win.localStorage.clear();
    },
  });
  cy.get('[data-testid="login__input-username"]').type('bob@prisma.io');
  cy.get('[data-testid="login__input-password"]').type('Abcdefg1');
  
  cy.fixture('login').then(function() {
    cy.intercept('POST', reqValueLogin, {
      statusCode: 200,
      body: login
    }).as('login');
    cy.get('[data-testid="login__button-login"]').click();
    cy.url().should('include', 'http://localhost:3000/account');
  });
  cy.fixture('username').then(function() {
    cy.intercept('POST', reqValueUsername, {
      statusCode: 200,
      body: username
    }).as('username');
    // cy.wait('@username', {timeout: 5000});
  });
  cy.fixture('transactions').then(function() {
    cy.intercept('GET', reqValueTransactions, {
      statusCode: 200,
      body: transactions
    }).as('transactions');
    // cy.wait('@transactions', {timeout: 5000});
  });
  cy.fixture('findAccount').then(function() {
    cy.intercept('GET', reqValueAccount, {
      statusCode: 200,
      body: findAccount
    }).as('findAccount');
  });
}

describe('Test register page', () => {
  it('Test header of account page and go to login page', () => {
    beginAccountTest();
    cy.viewport(1000, 700);
    cy.get('[data-testid="element-navbar-site-name"]').should('have.text', 'Digital-Wallet');
    cy.get('[data-testid="element-navbar-username"]').should('have.text', 'bob@prisma.io');
    cy.get('[data-testid="element-navbar-user-balance"]').should('have.text', 'R$ 75.00');
    cy.get('[data-testid="element-navbar-link-logout"]').should('have.text', 'Sair');
    cy.get('[data-testid="element-navbar-link-logout"]').click();
    cy.url().should('include', 'http://localhost:3000/login');
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('Test if the table contains correct data', () => {
    beginAccountTest();
    cy.viewport(1000, 700);
    cy.get('[data-testid="account__show-transactions"]').should('have.text', 'Mostrar transferências');
    cy.get('[data-testid="account__hide-transactions"]').should('not.exist');
    cy.get('[data-testid="filter-debited-account"]').should('not.exist');
    cy.get('[data-testid="filter-credited-account"]').should('not.exist');
    cy.get('[data-testid="filter-data-transaction"]').should('not.exist');
    cy.get('[data-testid="filter-data-label"]').should('not.exist');
    cy.get('[data-testid="account__button-filter"]').should('not.exist');
    cy.get('[data-testid="account-transition-table"]').should('not.exist');
    cy.get('[data-testid="account__show-transactions"]').click();
    cy.wait(500);
    cy.get('[data-testid="account__hide-transactions"]').should('have.text', 'Ocultar transferências');
    cy.get('#filter-debited-account');
    cy.get('#filter-credited-account');
    cy.get('[data-testid="filter-data-transaction"]');
    cy.get('#filter-data-label');
    cy.get('[data-testid="account__button-filter"]').should('have.text', 'Filtrar dados');
    cy.get('[data-testid="account-transition-table"]');
    cy.get('[data-testid="table-id-1"]').should('have.text', '1');
    cy.get('[data-testid="table-id-2"]').should('have.text', '2');
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });
});