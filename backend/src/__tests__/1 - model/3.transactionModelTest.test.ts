import sinon from 'sinon';
import { expect } from 'chai';
import { PrismaClient } from '@prisma/client';
import transactions from '../mocks/transactionMock';
import { Decimal } from '@prisma/client/runtime';

describe('9 - Create a new Transaction by model', () => {
  const prisma = new PrismaClient();
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;
    before(() => {
      create = sinon
        .stub(prisma.transactions, 'create')
        .resolves(transactions.createdTransaction);
    });

    after(()=>{
      create.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const response = await prisma.transactions.create({
          data: {
            debitedAccountId: 1000000,
            creditedAccountId: 1000001,
            value: new Decimal(10.00),
            createdAt: '31-05-2022'
          }
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('debitedAccountId');
        expect(response).to.have.a.property('creditedAccountId');
        expect(response).to.have.a.property('value');
        expect(response).to.have.a.property('createdAt');
        expect(response.debitedAccountId).to.be.equal(1000000);
        expect(response.creditedAccountId).to.be.equal(1000001);
        expect(Number(response.value)).to.be.equal(Number(10.00));
        expect(response.createdAt).to.be.equal('31-05-2022');

        await prisma.transactions.delete({ where: { id: response.id }});
      });
    });
  });
});

describe('10 - Find a Transaction by id in model', () => {
  const prisma = new PrismaClient();
  describe('when it is successfully founded', () => {
    let findById: sinon.SinonStub;
    before(() => {
      findById = sinon
        .stub(prisma.transactions, 'findUnique')
        .resolves(transactions.createdTransaction);
    });

    after(()=>{
      findById.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const response = await prisma.transactions.findUniqueOrThrow({
          where: { id: 1000000 }
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('debitedAccountId');
        expect(response).to.have.a.property('creditedAccountId');
        expect(response).to.have.a.property('value');
        expect(response).to.have.a.property('createdAt');
        expect(response.debitedAccountId).to.be.equal(1000000);
        expect(response.creditedAccountId).to.be.equal(1000001);
        expect(Number(response.value)).to.be.equal(Number(5.00));
        expect(response.createdAt).to.be.equal('31-05-2022');
      });
    });
  });
});

describe('11 - Update a Transaction by id in model', () => {
  const prisma = new PrismaClient();
  describe('when it is successfully updated', () => {
    let update: sinon.SinonStub;
    before(() => {
      update = sinon
        .stub(prisma.transactions, 'update')
        .resolves(transactions.createdTransaction);
    });

    after(()=>{
      update.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const response = await prisma.transactions.update({
          where: { id: 1000000 },
          data: { 
            debitedAccountId: 1000000,
            creditedAccountId: 1000001,
            value: 10.00,
            createdAt: '31-05-2022'
          },
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('debitedAccountId');
        expect(response).to.have.a.property('creditedAccountId');
        expect(response).to.have.a.property('value');
        expect(response).to.have.a.property('createdAt');
        expect(response.debitedAccountId).to.be.equal(1000000);
        expect(response.creditedAccountId).to.be.equal(1000001);
        expect(Number(response.value)).to.be.equal(Number(10.00));
        expect(response.createdAt).to.be.equal('31-05-2022');
      });
    });
  });
});

describe('12 - Delete a Transaction by id in model', () => {
  const prisma = new PrismaClient();
  describe('when it is successfully deleted', () => {
    let deleteById: sinon.SinonStub;
    before(() => {
      deleteById = sinon
        .stub(prisma.transactions, 'delete')
        .resolves(transactions.createdTransaction);
    });

    after(()=>{
      deleteById.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const response = await prisma.transactions.delete({
          where: { id: 1000001 }
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('debitedAccountId');
        expect(response).to.have.a.property('creditedAccountId');
        expect(response).to.have.a.property('value');
        expect(response).to.have.a.property('createdAt');
        expect(response.debitedAccountId).to.be.equal(1000001);
        expect(response.creditedAccountId).to.be.equal(1000000);
        expect(Number(response.value)).to.be.equal(Number(5.00));
        expect(response.createdAt).to.be.equal('31-05-2022');
      });
    });
  });
});