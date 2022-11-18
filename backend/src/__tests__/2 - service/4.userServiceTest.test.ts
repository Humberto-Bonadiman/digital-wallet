import sinon from 'sinon';
import { expect } from 'chai';
import { PrismaClient } from '@prisma/client';
import UsersService from '../../services/userService';
import user from '../mocks/usersMock';
import { usersInterface } from '../../interfaces/usersInterface';

const usersService = new UsersService();

describe('13- Create a new user by service', () => {
  const prisma = new PrismaClient();
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;
    before(() => {
      create = sinon
        .stub(prisma.users, 'create')
        .resolves(user.createdUserService);
    });

    after(() => {
      create.restore();
    });

    it('returns an object with the correct data', async () => {
      const response = await usersService.create(user.newUserService);

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('username');
      expect(response).to.have.a.property('accountId');
      expect(response.username).to.be.equal('username_for_test2@email.com');

      await prisma.users.delete({ where: { username: response.username }});
      await prisma.accounts.delete({ where: { id: response.accountId }});
    });
  });
});

describe('14 - Generate a token for user by service', () => {
  const prisma = new PrismaClient();
  describe('when it is generated successfully', () => {
    let login: sinon.SinonStub;
    before(() => {
      login = sinon
        .stub(prisma.users, 'findUnique')
        .resolves(user.createdUser);
    });

    after(() => {
      login.restore();
    });

    it('returns an object with the correct data', async () => {
      const response = await usersService.login('alice@prisma.io');

      expect(response).to.be.an('string');
    });
  });
});

describe('15 - Find a user by id in service', () => {
  const prisma = new PrismaClient();
  describe('when find the user', () => {
    let findById: sinon.SinonStub;
    before(() => {
      findById = sinon
        .stub(prisma.users, 'findUnique')
        .resolves(user.createdUser);
    });

    after(() => {
      findById.restore();
    });

    it('return the expected data', async () => {

      const response = await usersService.findById(1);

      expect(response.id).to.be.an('number');
      expect(response.username).to.be.equal('alice@prisma.io');
      expect(response.accountId).to.be.equal(1);
    });
  });
});

describe('16 - Update a user by username in service', () => {
  const prisma = new PrismaClient();
  describe('when update the user', () => {
    let updateById: sinon.SinonStub;
    before(() => {
      updateById = sinon
        .stub(prisma.users, 'update')
        .resolves(user.createdUser);
    });

    after(() => {
      updateById.restore();
    });
    it('return the expected data', async () => {
      const userUpdate: usersInterface = {
        username: 'alice@prisma.io',
        password: 'Abcdefg1'
      };
      const response = await usersService.updateUserPassword(userUpdate);

      expect(response.id).to.be.an('number');
      expect(response.username).to.be.equal('alice@prisma.io');
      expect(response.accountId).to.be.equal(1);
    })
  });
});

describe('17 - Delete a user by id in service', () => {
  const prisma = new PrismaClient();
  describe('when delete the user', () => {
    let deleteById: sinon.SinonStub;
    before(() => {
      deleteById = sinon
        .stub(prisma.users, 'delete');
    });
    after(() => {
      deleteById.restore();
    });
    it('return the expected data', async () => {

      await usersService.deleteById(5);
      const response = await prisma.users.findUnique({ where: { id: 5 }});
      expect(response).to.be.equal(null);

    })
  });
});