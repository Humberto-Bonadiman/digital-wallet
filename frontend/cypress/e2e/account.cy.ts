/// <reference types="cypress" />
import login from '../fixtures/login.json';
import username from '../fixtures/username.json';
import transactions from '../fixtures/transactions.json';
import findAccount from '../fixtures/findAccount.json';
import filterDebited from '../fixtures/filterDebited.json';
import filterCredited from '../fixtures/filterCredited.json';
import filterCreditedDate from '../fixtures/filterCreditedDate.json';

const NUMBER = 3001;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

const reqValueLogin = `http://${URL}:${PORT}/users/login`;
const reqValueUsername = `http://${URL}:${PORT}/users/username`;
const reqValueTransactions = `http://${URL}:${PORT}/transactions`;
const reqValueAccount = `http://${URL}:${PORT}/accounts/1000001`;
const reqFilterDebited = `http://${URL}:${PORT}/transactions/filter`;

const beginAccountTest = () => {
  cy.visit('http://localhost:3000/login', {
    onBeforeLoad(win) {
      win.localStorage.clear();
    },
  });
  cy.get('[data-testid="login__input-username"]').type('bob@email.com');
  cy.get('[data-testid="login__input-password"]').type('Abcdefg1');
  
  cy.fixture('login').then(function() {
    cy.intercept('POST', reqValueLogin, {
      statusCode: 200,
      body: login
    }).as('login');
    cy.get('[data-testid="login__button-login"]').click();

    cy.url().should('include', 'http://localhost:3000/account');

    cy.intercept('POST', reqValueUsername, {
      statusCode: 200,
      body: username
    }).as('username');

    cy.intercept('GET', reqValueTransactions, {
      statusCode: 200,
      body: transactions
    }).as('transactions');

    cy.intercept('GET', reqValueAccount, {
      statusCode: 200,
      body: findAccount
    }).as('findAccount');
    cy.wait('@findAccount')
  });
}

describe('Test account page', () => {
  it('test header of account page and go to login page', () => {
    beginAccountTest();
    cy.viewport(1000, 700);
    cy.get('[data-testid="element-navbar-site-name"]').should('have.text', 'Digital-Wallet');
    cy.get('[data-testid="element-navbar-username"]').should('have.text', 'bob@email.com');
    cy.get('[data-testid="element-navbar-user-balance"]').should('have.text', 'R$ 75.00');
    cy.get('[data-testid="element-navbar-link-logout"]').should('have.text', 'Sair');
    cy.get('[data-testid="element-navbar-link-logout"]').click();
    cy.url().should('include', 'http://localhost:3000/login');
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('test if the table contains correct data', () => {
    beginAccountTest();
    cy.viewport(1000, 700);
    cy.get('[data-testid="account__show-transactions"]').should('have.text', 'Mostrar transferências');
    cy.get('[data-testid="account__hide-transactions"]').should('not.exist');
    cy.get('#filter-debited-account').should('not.exist');
    cy.get('#filter-credited-account').should('not.exist');
    cy.get('[data-testid="filter-data-transaction"]').should('not.exist');
    cy.get('#filter-data-label').should('not.exist');
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
    cy.get('[data-testid="table-id-1"]').should('have.text', '1000000');
    cy.get('[data-testid="table-id-2"]').should('have.text', '1000001');
    cy.get('[data-testid="table-id-3"]').should('have.text', '1000002');
    cy.get('[data-testid="account__hide-transactions"]').click();
    cy.get('[data-testid="account-transition-table"]').should('not.exist');
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('tests if the table correctly filters the data', () => {
    beginAccountTest();
    cy.viewport(1000, 700);
    cy.get('[data-testid="account__show-transactions"]').click();
    cy.get('#filter-debited-account').click();
    cy.fixture('filterDebited').then(function() {
      cy.intercept('POST', reqFilterDebited, {
        statusCode: 200,
        body: filterDebited
      }).as('filterDebited');
      cy.get('[data-testid="account__button-filter"]').click();
    });
    cy.get('[data-testid="table-id-1"]').should('have.text', '1000001');
    cy.get('[data-testid="table-id-2"]').should('not.exist');
    cy.get('#filter-debited-account').click();
    cy.get('#filter-credited-account').click();
    cy.fixture('filterCredited').then(function() {
      cy.intercept('POST', reqFilterDebited, {
        statusCode: 200,
        body: filterCredited
      }).as('filterCredited');
      cy.get('[data-testid="account__button-filter"]').click();
    });
    cy.get('[data-testid="table-id-1"]').should('have.text', '1000000');
    cy.get('[data-testid="table-id-2"]').should('have.text', '1000002');
    cy.get('#filter-data-label').type('2022-05-31');
    cy.fixture('filterCreditedDate').then(function() {
      cy.intercept('POST', reqFilterDebited, {
        statusCode: 200,
        body: filterCreditedDate
      }).as('filterCreditedDate');
      cy.get('[data-testid="account__button-filter"]').click();
    });
    cy.get('[data-testid="table-id-1"]').should('have.text', '1000000');
    cy.get('[data-testid="table-id-2"]').should('not.exist');
    cy.fixture('transactions').then(function() {
      cy.intercept('GET', reqValueTransactions, {
        statusCode: 200,
        body: transactions
      }).as('transactions');
      cy.get('[data-testid="account__button-transaction"]').click();
    });
    cy.get('[data-testid="table-id-1"]').should('have.text', '1000000');
    cy.get('[data-testid="table-id-2"]').should('have.text', '1000001');
    cy.get('[data-testid="table-id-3"]').should('have.text', '1000002');
  });
});

export default beginAccountTest;
