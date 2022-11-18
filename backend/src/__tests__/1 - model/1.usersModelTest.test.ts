import sinon from 'sinon';
import { expect } from 'chai';
import { PrismaClient } from '@prisma/client';
import user from '../mocks/usersMock';
import bcrypt from 'bcrypt';

describe('1 - Create a new User by model', () => {
  const prisma = new PrismaClient();
  describe('when it is created successfully', () => {
    let create: sinon.SinonStub;
    before(() => {
      create = sinon
        .stub(prisma.users, 'create')
        .resolves(user.createdUser);
    });

    after(()=>{
      create.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const createAccount = await prisma.accounts.create({
          data: { balance: 100.00 }
        });
        const response = await prisma.users.create({
          data: {
            username: user.newUser.username,
            password: user.newUser.password,
            accountId: createAccount.id
          }
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('username');
        expect(response).to.have.a.property('accountId');
        expect(response.username).to.be.equal('username_for_test1@email.com');

        await prisma.users.delete({ where: { username: response.username }});
        await prisma.accounts.delete({ where: { id: createAccount.id }});
      });
    });
  });
});

describe('2 - Find a User by Id using model', () => {
  const prisma = new PrismaClient();
  describe('when it is successfully found', () => {
    let findById: sinon.SinonStub;
    before(() => {
      findById = sinon
        .stub(prisma.users, 'findUnique')
        .resolves(user.createdUser);
    });

    after(()=>{
      findById.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {

        const response = await prisma.users.findUniqueOrThrow({
          where: { id: 1 }
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('username');
        expect(response).to.have.a.property('accountId');
        expect(response.username).to.be.equal('alice@prisma.io');
        expect(response.id).to.be.equal(1);
        expect(response.accountId).to.be.equal(1);

      });
    });
  });
});

describe('3 - Update a User by Id using model', () => {
  const prisma = new PrismaClient();
  describe('when it is successfully updated', () => {
    let update: sinon.SinonStub;
    before(() => {
      update = sinon
        .stub(prisma.users, 'update')
        .resolves(user.createdUser);
    });

    after(()=>{
      update.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {
        const passwordHash = bcrypt.hashSync('1234567A', 10);

        const response = await prisma.users.update({
          where: { id: 1 },
          data: {
            password: passwordHash
          }
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('username');
        expect(response).to.have.a.property('accountId');
        expect(response.username).to.be.equal('alice@prisma.io');
        expect(response.id).to.be.equal(1);
        expect(response.accountId).to.be.equal(1);
        expect(response.password).to.be.equal(passwordHash);
      });
    });
  });
});

describe('4 - Delete a User by Id using model', () => {
  const prisma = new PrismaClient();
  describe('when it is successfully deleted', () => {
    let deleteById: sinon.SinonStub;
    before(() => {
      deleteById = sinon
        .stub(prisma.users, 'delete')
        .resolves(user.createdUser);
    });

    after(()=>{
      deleteById.restore();
    });
    describe('when it is successfully entered', () => {
      it('returns an object with the correct data', async () => {

        const response = await prisma.users.delete({
          where: { id: 3 },
        });
  
        expect(response).to.be.an('object');
        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('username');
        expect(response).to.have.a.property('accountId');
        expect(response.username).to.be.equal('natsu@prisma.io');
        expect(response.id).to.be.equal(3);
        expect(response.accountId).to.be.equal(3);
      });
    });
  });
});