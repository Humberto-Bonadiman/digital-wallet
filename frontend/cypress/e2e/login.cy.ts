/// <reference types="cypress" />
import "cypress-localstorage-commands";

const reqValueLogin = 'http://localhost:3001/users/login';
const reqValueUsername = 'http://localhost:3001/users/username';
const reqValueTransactions = 'http://localhost:3001/transactions';
const reqValueAccount = 'http://localhost:3001/accounts/2';

describe('Test login page', () => {
  it('if login contains the correct information', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="common_login__label-username"]').should('have.text', 'Username');
    cy.get('[data-testid="common_login__label-password"]').should('have.text', 'Senha');
    cy.get('[data-testid="common_login__button-login"]').should('have.text', 'Entrar');
    cy.get('[data-testid="common_login__button-register"]').should('have.text', 'Ainda não possuo uma conta');
    cy.get('[data-testid="common_login__button-login"]').should('be.disabled');
  });

  it('should go to "/account" page with correct data', () => {
    cy.visit('http://localhost:3000/login', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
    cy.get('[data-testid="common_login__input-username"]').type('bob@prisma.io');
    cy.get('[data-testid="common_login__input-password"]').type('Abcdefg1');
    
    cy.fixture('login').then(function(login) {
      cy.intercept('POST', reqValueLogin, {
        statusCode: 200,
        body: login
      }).as('login');
      cy.get('[data-testid="common_login__button-login"]').click();
      cy.url().should('include', 'http://localhost:3000/account');
    });
    cy.fixture('username').then(function(username) {
      cy.intercept('POST', reqValueUsername, {
        statusCode: 200,
        body: username
      }).as('username');
      cy.wait('@username', {timeout: 5000});
    });
    cy.fixture('transactions').then(function(transactions) {
      cy.intercept('GET', reqValueTransactions, {
        statusCode: 200,
        body: transactions
      }).as('transactions');
      cy.wait('@transactions', {timeout: 5000});
    });
    cy.fixture('findAccount').then(function(findAccount) {
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
    cy.get('[data-testid="common_login__button-register"]').click();
    cy.url().should('include', 'http://localhost:3000/register');
  });
})