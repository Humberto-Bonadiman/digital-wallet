import userCreated from '../fixtures/userCreated.json';
const reqValueUser = 'http://localhost:3001/users';

const CREATED = 201;

describe('Test register page', () => {
  it('should register a new user page', () => {
    cy.visit('http://localhost:3000/register', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
    cy.get('[data-testid="common_register__label-username"]').should('have.text', 'Username');
    cy.get('[data-testid="common_register__input-username"]').type('jacobTestRegister@prisma.io');
    cy.get('[data-testid="common_register__label-password"]').should('have.text', 'Senha');
    cy.get('[data-testid="common_register__input-password"]').type('1234567A');
    cy.fixture('userCreated').then(function() {
      cy.intercept('POST', reqValueUser, {
        statusCode: CREATED,
        body: userCreated
      }).as('userCreated');
      cy.get('[data-testid="common_register__button-register"]').click();
    });
    cy.url().should('include', 'http://localhost:3000/login');
  });

  it('should return to the login page by clicking in "Entrar"', () => {
    cy.visit('http://localhost:3000/register');
    cy.get('[data-testid="paragraph-login"]').should('have.text', 'Entrar');
    cy.get('[data-testid="paragraph-login"]').click();
    cy.url().should('include', 'http://localhost:3000/login');
  });
});