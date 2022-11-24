import "cypress-localstorage-commands";
import login from '../fixtures/login.json';
import username from '../fixtures/username.json';
import transactions from '../fixtures/transactions.json';
import findAccount from '../fixtures/findAccount.json';

const NUMBER = 3001;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';

const reqValueLogin = `http://${URL}:${PORT}/users/login`;
const reqValueUsername = `http://${URL}:${PORT}/users/username`;
const reqValueTransactions = `http://${URL}:${PORT}/transactions`;
const reqValueAccount = `http://${URL}:${PORT}/accounts/1000001`;

describe('Test login page', () => {
  it('if login contains the correct information', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="login__label-username"]').should('have.text', 'Username');
    cy.get('[data-testid="login__label-password"]').should('have.text', 'Senha');
    cy.get('[data-testid="login__button-login"]').should('have.text', 'Entrar');
    cy.get('[data-testid="login__button-register"]').should('have.text', 'Ainda não possuo uma conta');
    cy.get('[data-testid="login__button-login"]').should('be.disabled');
  });

  it('should go to "/account" page with correct data', () => {
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
    });
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('should go to "/register" page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="login__button-register"]').click();
    cy.url().should('include', 'http://localhost:3000/register');
  });
})