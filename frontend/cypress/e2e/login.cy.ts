/// <reference types="cypress" />

describe('Test login page', () => {
  it('if login contains the correct information', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="common_login__label-username"]').should('have.text', 'Username');
    cy.get('[data-testid="common_login__label-password"]').should('have.text', 'Senha');
    cy.get('[data-testid="common_login__button-login"]').should('have.text', 'Entrar');
    cy.get('[data-testid="common_login__button-register"]').should('have.text', 'Ainda não possuo uma conta');
  });
})