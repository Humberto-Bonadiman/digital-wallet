import sinon from 'sinon';
import { expect } from 'chai';
import { PrismaClient } from '@prisma/client';
import account from '../mocks/accountMock';
import { Decimal } from '@prisma/client/runtime';

describe('5 - Create a new Account by model', () => {
  const prisma = new PrismaClient();
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;
    before(() => {
      create = sinon
        .stub(prisma.accounts, 'create')
        .resolves(account.createdAccount);
    });

    after(()=>{
      create.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const response = await prisma.accounts.create({
          data: { balance: 300.5 }
        });
        const balanceTest = { balance: new Decimal(300.5) }
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('balance');
        expect(typeof response.balance).to.be.equal(typeof balanceTest.balance);

        await prisma.accounts.delete({ where: { id: response.id }});
      });
    });
  });
});

describe('6 - Find a Account by id in model', () => {
  const prisma = new PrismaClient();
  describe('when it is successfully founded', () => {
    let findById: sinon.SinonStub;
    before(() => {
      findById = sinon
        .stub(prisma.accounts, 'findUnique')
        .resolves(account.createdAccount);
    });

    after(()=>{
      findById.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const response = await prisma.accounts.findUniqueOrThrow({
          where: { id: 1 }
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('balance');
        expect(Number(response.balance)).to.be.equal(Number(100));
      });
    });
  });
});

describe('7 - Update a Account by id in model', () => {
  const prisma = new PrismaClient();
  describe('when it is successfully updated', () => {
    let update: sinon.SinonStub;
    before(() => {
      update = sinon
        .stub(prisma.accounts, 'update')
        .resolves(account.createdAccount);
    });

    after(()=>{
      update.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const response = await prisma.accounts.update({
          where: { id: 1 },
          data: { balance: 300 },
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('balance');
        expect(Number(response.balance)).to.be.equal(Number(300));
      });
    });
  });
});

describe('8 - Delete a Account by id in model', () => {
  const prisma = new PrismaClient();
  describe('when it is successfully deleted', () => {
    let deleteById: sinon.SinonStub;
    before(() => {
      deleteById = sinon
        .stub(prisma.accounts, 'delete')
        .resolves(account.createdAccount);
    });

    after(()=>{
      deleteById.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const response = await prisma.accounts.delete({
          where: { id: 4 }
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('balance');
        expect(Number(response.balance)).to.be.equal(Number(100));
      });
    });
  });
});