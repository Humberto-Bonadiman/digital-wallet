import sinon from 'sinon';
import { expect } from 'chai';
import { PrismaClient } from '@prisma/client';
import AccountsService from '../../services/accountService';
import account from '../mocks/accountMock';

const accountsService = new AccountsService();

describe('18- Create a new account by service', () => {
  const prisma = new PrismaClient();
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;
    before(() => {
      create = sinon
        .stub(prisma.accounts, 'create')
        .resolves(account.createdAccount);
    });

    after(() => {
      create.restore();
    });

    it('returns an object with the correct data', async () => {
      const response = await accountsService.create();

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('balance');
      expect(Number(response.balance)).to.be.equal(Number(100.00));

      await prisma.accounts.delete({ where: { id: response.id }});
    });
  });
});

describe('19 - Find an account by id in service', () => {
  const prisma = new PrismaClient();
  describe('when find the account', () => {
    let findById: sinon.SinonStub;
    before(() => {
      findById = sinon
        .stub(prisma.accounts, 'findUnique')
        .resolves(account.createdAccount);
    });

    after(() => {
      findById.restore();
    });

    it('return the expected data', async () => {

      const response = await accountsService.findById(1);

      expect(response.id).to.be.an('number');
      expect(Number(response.balance)).to.be.equal(Number(300.00));
    });
  });
});