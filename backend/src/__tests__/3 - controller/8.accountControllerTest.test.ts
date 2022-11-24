import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import StatusCode from '../../enums/StatusCode';
import { PrismaClient } from '@prisma/client';
import { App } from '../../app';
import account from '../mocks/accountMock';
import UsersService from '../../services/userService';
// import AccountsService from '../../services/accountService';

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();
const prisma = new PrismaClient();

describe('28 - Find a account by id', () => {
  let chaiHttpResponse;
  describe('when find a user by id successfully', () => {
    let findAccount: sinon.SinonStub;

    before(() => {
      findAccount = sinon
        .stub(prisma.accounts, 'findUnique')
        .resolves(account.createdAccount);
    });
    after( async () => {
      findAccount.restore();
    });
    it('returns the correct data', async () => {
      const token = await new UsersService().login('bob@email.com');
      chaiHttpResponse = await chai
        .request(app)
        .get('/accounts/1000001')
        .set('authorization', token);

      const response = chaiHttpResponse.body;

      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(response).to.be.an('object');
      expect(response.id).be.be.equal(1000001);
      expect(Number(response.balance)).to.be.equal(Number(100.00));
    });
  });
});