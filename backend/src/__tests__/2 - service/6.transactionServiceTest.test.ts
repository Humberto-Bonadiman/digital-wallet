import sinon from 'sinon';
import { expect } from 'chai';
import { PrismaClient } from '@prisma/client';
import TransactionService from '../../services/transactionService';
import transaction from '../mocks/transactionMock';
import UsersService from '../../services/userService';

const transactionService = new TransactionService();
const userService = new UsersService();

describe('20- Create a new transaction by service', () => {
  const prisma = new PrismaClient();
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;
    before(() => {
      create = sinon
        .stub(prisma.transactions, 'create')
        .resolves(transaction.createdTransaction);
    });

    after(() => {
      create.restore();
    });

    it('returns an object with the correct data', async () => {
      const response = await transactionService.create('alice@email.com', 'bob@email.com', 10.00);
      const dateNow = new Date();
      const formatDate = `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`;

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('debitedAccountId');
      expect(response).to.have.a.property('creditedAccountId');
      expect(response).to.have.a.property('value');
      expect(response).to.have.a.property('createdAt');
      expect(response.debitedAccountId).to.be.equal(1000000);
      expect(response.creditedAccountId).to.be.equal(1000001);
      expect(Number(response.value)).to.be.equal(Number(10.00));
      expect(response.createdAt).to.be.equal(formatDate);
      const returnValue = await transactionService.create('bob@email.com', 'alice@email.com', 10.00);

      await prisma.transactions.delete({ where: { id: response.id }});
      await prisma.transactions.delete({ where: { id: returnValue.id }});
    });
  });
});

describe('21 - Find all user transaction by token in service', () => {
  const prisma = new PrismaClient();
  describe('when find the transaction', () => {
    let findByToken: sinon.SinonStub;
    before(() => {
      findByToken = sinon
        .stub(prisma.transactions, 'findMany')
        .resolves(transaction.listTransactions);
    });

    after(() => {
      findByToken.restore();
    });

    it('return the expected data', async () => {
      const token = await userService.login('alice@email.com');

      const response = await transactionService.findAllUserTransactions(token);
      const findIndex = response.findIndex((transactionId) => transactionId.id === 1000000);

      expect(response).to.be.an('array');
      expect(response[findIndex].id).to.be.an('number');
      expect(response[findIndex].debitedAccountId).to.be.equal(1000000);
      expect(response[findIndex].creditedAccountId).to.be.equal(1000001);
      expect(Number(response[findIndex].value)).to.be.equal(Number(10.00));
    });
  });
});

describe('22 - Filter all user transaction in service', () => {
  const prisma = new PrismaClient();
  describe('when find the transaction', () => {
    let filterTransaction: sinon.SinonStub;
    before(() => {
      filterTransaction = sinon
        .stub(prisma.transactions, 'findMany')
        .resolves(transaction.listTransactions);
    });

    after(() => {
      filterTransaction.restore();
    });

    it('return the expected data when all values are used to filter', async () => {
      const token = await userService.login('alice@email.com');

      const response = await transactionService.filterUserTransactions(token, true, true, '31-05-2022');
      const findIndexId1 = response.findIndex((transactionId) => transactionId.id === 1000000);
      const findIndexId3 = response.findIndex((transactionId) => transactionId.id === 1000002);

      expect(response).to.be.an('array');
      expect(response[findIndexId1].id).to.be.an('number');
      expect(response[findIndexId1].debitedAccountId).to.be.equal(1000000);
      expect(response[findIndexId1].creditedAccountId).to.be.equal(1000001);
      expect(Number(response[findIndexId1].value)).to.be.equal(Number(10.00));
      expect(response[findIndexId3].id).to.be.an('number');
      expect(response[findIndexId3].debitedAccountId).to.be.equal(1000002);
      expect(response[findIndexId3].creditedAccountId).to.be.equal(1000000);
      expect(Number(response[findIndexId3].value)).to.be.equal(Number(5.00));
    });
  });
});