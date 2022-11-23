import createTransaction from '../fixtures/createTransaction.json';
import afterCreateTransactions from '../fixtures/afterCreateTransactions.json';
import afterTransactionAccount from '../fixtures/afterTransactionAccount.json';
import beginAccountTest from './account.cy';

const reqCreateTransaction = 'http://localhost:3001/transactions';
const reqValueAccount = 'http://localhost:3001/accounts/2';

describe('Test transaction page', () => {
  it('if contains correct data', () => {
    beginAccountTest();
    cy.get('[data-testid="account__button-navigate"]').should('have.text', 'Realizar Transferência');
    cy.get('[data-testid="account__button-navigate"]').click();
    cy.url().should('include', 'http://localhost:3000/transaction');
    cy.get('[data-testid="transaction__label-username"]')
      .should('have.text', 'Username Conta Recebedora');
    cy.get('[data-testid="transaction__label-value"]')
      .should('have.text', 'Valor Transferência');
    cy.get('[data-testid="transaction__username"]').type('alice@prisma.io');
    cy.get('[data-testid="transaction__value"]').type('5,00');
    cy.get('[data-testid="transaction__button-tranfer"]').click();
    cy.get('[data-testid="transaction-confirm"]').should('have.text', 'Sim');
    cy.get('[data-testid="transaction-deny"]').should('have.text', 'Não');
    cy.fixture('createTransaction').then(function() {
      cy.intercept('POST', reqCreateTransaction, {
        statusCode: 201,
        body: createTransaction
      }).as('createTransaction');
      cy.get('[data-testid="transaction-confirm"]').click();
    });
    cy.url().should('include', 'http://localhost:3000/account');
    cy.fixture('afterCreateTransactions').then(function() {
      cy.intercept('GET', reqCreateTransaction, {
        statusCode: 200,
        body: afterCreateTransactions
      }).as('afterCreateTransactions');
    });
    cy.fixture('afterTransactionAccount').then(function() {
      cy.intercept('GET', reqValueAccount, {
        statusCode: 200,
        body: afterTransactionAccount
      }).as('afterTransactionAccount');
    });
    cy.get('[data-testid="account__show-transactions"]').click();
    cy.wait(500);
    cy.get('[data-testid="table-id-4"]').should('have.text', '4');
    cy.get('[data-testid="element-navbar-user-balance"]').should('have.text', 'R$ 72.00');
  });

  it('if you can go back to the account page without making the transfer', () => {
    beginAccountTest();
    cy.get('[data-testid="account__button-navigate"]').should('have.text', 'Realizar Transferência');
    cy.get('[data-testid="account__button-navigate"]').click();
    cy.get('[data-testid="button-account"]').should('have.text', 'Voltar');
    cy.get('[data-testid="button-account"]').click();
    cy.url().should('include', 'http://localhost:3000/account');
  });
});