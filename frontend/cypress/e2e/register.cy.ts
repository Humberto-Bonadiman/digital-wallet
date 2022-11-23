import userCreated from '../fixtures/userCreated.json';

const NUMBER = 3001;
const PORT = process.env.REACT_APP_BACKEND_PORT || NUMBER;
const URL = process.env.REACT_APP_HOSTNAME || 'localhost';
const CREATED = 201;

const reqValueUser = `http://${URL}:${PORT}/users`;

describe('Test register page', () => {
  it('should register a new user page', () => {
    cy.visit('http://localhost:3000/register', {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
    cy.get('[data-testid="register__label-username"]').should('have.text', 'Username');
    cy.get('[data-testid="register__input-username"]').type('jacobTestRegister@email.com');
    cy.get('[data-testid="register__label-password"]').should('have.text', 'Senha');
    cy.get('[data-testid="register__input-password"]').type('1234567A');
    cy.fixture('userCreated').then(function() {
      cy.intercept('POST', reqValueUser, {
        statusCode: CREATED,
        body: userCreated
      }).as('userCreated');
      cy.get('[data-testid="register__button-register"]').click();
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