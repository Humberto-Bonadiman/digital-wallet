import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import StatusCode from '../../enums/StatusCode';
import { PrismaClient } from '@prisma/client';
import { App } from '../../app';
import transaction from '../mocks/transactionMock';
import UsersService from '../../services/userService';

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();
const prisma = new PrismaClient();

describe('29 - Create a new transaction', () => {
  let chaiHttpResponse;
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;

    before(() => {
      create = sinon.stub(prisma.transactions, 'create')
        .resolves(transaction.createdTransaction);
    });
    after( async () => {
      create.restore();
    });

    it('returns the correct data', async () => {
      const token = await new UsersService().login('alice@email.com');
      chaiHttpResponse = await chai
        .request(app)
        .post('/transactions')
        .set('authorization', token)
        .send(transaction.newTransactionController);
      
      const dateNow = new Date();
      const formatDate = `${dateNow.getDate()}-${dateNow.getMonth() + 1}-${dateNow.getFullYear()}`;

      const response = chaiHttpResponse.body;
      expect(chaiHttpResponse).to.have.status(StatusCode.CREATED);
      expect(response.debitedAccountId).to.be.equal(transaction.createdTransaction.debitedAccountId);
      expect(response.creditedAccountId).to.be.equal(transaction.createdTransaction.creditedAccountId);
      expect(Number(response.value)).to.be.equal(Number(transaction.createdTransaction.value));
      expect(response.createdAt).to.be.equal(formatDate);

      await prisma.transactions.delete({ where: { id: response.id }});
    });
  });
});

describe('Find all user transactions', () => {
  let chaiHttpResponse;
  describe('when show all transactions successfully', () => {
    let findAll: sinon.SinonStub;

    before(() => {
      findAll = sinon.stub(prisma.transactions, 'findMany')
        .resolves(transaction.listTransactions);
    });
    after( async () => {
      findAll.restore();
    });

    it('returns the correct data', async () => {
      const token = await new UsersService().login('alice@email.com');
      chaiHttpResponse = await chai
        .request(app)
        .get('/transactions')
        .set('authorization', token);

      const response = chaiHttpResponse.body;

      const findIndexId1 = response.findIndex((transactionId: { id: number; }) => transactionId.id === 1000000);
      const findIndexId3 = response.findIndex((transactionId: { id: number; }) => transactionId.id === 1000002);

      expect(response).to.be.an('array');
      expect(response[findIndexId1].id).to.be.an('number');
      expect(response[findIndexId1].debitedAccountId).to.be.equal(1000000);
      expect(response[findIndexId1].creditedAccountId).to.be.equal(1000001);
      expect(Number(response[findIndexId1].value)).to.be.equal(Number(5.00));
      expect(response[findIndexId3].id).to.be.an('number');
      expect(response[findIndexId3].debitedAccountId).to.be.equal(1000002);
      expect(response[findIndexId3].creditedAccountId).to.be.equal(1000000);
      expect(Number(response[findIndexId3].value)).to.be.equal(Number(5.00));
    });
  });
});