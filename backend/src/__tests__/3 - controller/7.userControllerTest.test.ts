import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import StatusCode from '../../enums/StatusCode';
import { PrismaClient } from '@prisma/client';
import { App } from '../../app';
import bcrypt from 'bcrypt';
import user from '../mocks/usersMock';
import UsersService from '../../services/userService';

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();
const prisma = new PrismaClient();

describe('23 - Create a new user', () => {
  let chaiHttpResponse;
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;

    before(() => {
      create = sinon.stub(prisma.users, 'create')
        .resolves(user.createdUserController);
    });
    after( async () => {
      create.restore();
    });

    it('returns the correct data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/users')
        .set('X-API-Key', 'foobar')
        .send(user.newUserController);

      const response = chaiHttpResponse.body;
      expect(chaiHttpResponse).to.have.status(StatusCode.CREATED);
      expect(response.username).to.deep.equal(user.createdUserController.username);
      expect(response.accountId).to.be.an('number');

      await prisma.users.delete({ where: { id: response.id }});
    });
  });
});

describe('24 - Generate a token in login', () => {
  let chaiHttpResponse;
  describe('when login is successful', () => {
    let login: sinon.SinonStub;

    before(() => {
      login = sinon
        .stub(prisma.users, 'findUnique')
        .resolves(user.createdUserController);
    });
    after( async () => {
      login.restore();
    });

    it('returns the correct data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/users/login')
        .set('X-API-Key', 'foobar')
        .send({
          username: 'bob@email.com',
          password: 'Abcdefg1'
        });

      const response = chaiHttpResponse.body;
      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(response.token).to.be.an('string');
    });
  });
});

describe('25 - Find a user by id', () => {
  let chaiHttpResponse;
  describe('when find a user by id successfully', () => {
    let findUser: sinon.SinonStub;

    before(() => {
      findUser = sinon
        .stub(prisma.users, 'findUnique')
        .resolves(user.createdUserController);
    });
    after( async () => {
      findUser.restore();
    });
    it('returns the correct data', async () => {
      const token = await new UsersService().login('alice@email.com');
      chaiHttpResponse = await chai
        .request(app)
        .get('/users/1000000')
        .set('authorization', token);

      const response = chaiHttpResponse.body;

      expect(chaiHttpResponse).to.have.status(StatusCode.OK);
      expect(response).to.be.an('object');
      expect(response.username).be.be.equal('alice@email.com');
      expect(response.accountId).to.be.equal(1000000);
    });
  });
});

describe('26 - Update user password', () => {
  let chaiHttpResponse;
  describe('when update a user successfully', () => {
    let updateUser: sinon.SinonStub;

    before(() => {
      updateUser = sinon
        .stub(prisma.users, 'findUnique')
        .resolves(user.createdUserController);
    });
    after( async () => {
      updateUser.restore();
    });
    it('does not return anything', async () => {
      const token = await new UsersService().login('bob@email.com');
      chaiHttpResponse = await chai
        .request(app)
        .patch('/users/1000001')
        .set('authorization', token)
        .send({
          username: 'bob@email.com',
          password: 'Abcdefg1'
        });

      const updateUser = await prisma.users
          .findUniqueOrThrow({ where: { username: 'bob@email.com' }});
      const comparePasswrod = await bcrypt.compare('Abcdefg1', updateUser.password);

      expect(chaiHttpResponse).to.have.status(StatusCode.NO_CONTENT);
      expect(comparePasswrod).to.be.equal(true);
    });
  });
});

describe('26 - Delete a user by Id', () => {
  let chaiHttpResponse;
  describe('when delete a user by id successfully', () => {
    let deleteUser: sinon.SinonStub;

    before(() => {
      deleteUser = sinon
        .stub(prisma.users, 'delete')
        .resolves(user.createdUserController);
    });
    after( async () => {
      deleteUser.restore();
    });
    it('returns the correct data', async () => {
      const token = await new UsersService().login('dragon@email.com');
      chaiHttpResponse = await chai
        .request(app)
        .delete('/users/1000005')
        .set('authorization', token);

      const deletedUser = await prisma.users
          .findUnique({ where: { username: 'dragon@email.com' }});

      expect(chaiHttpResponse).to.have.status(StatusCode.NO_CONTENT);
      expect(deletedUser).to.be.equal(null);
    });
  });
});