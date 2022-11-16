import sinon from 'sinon';
import { expect } from 'chai';
import { PrismaClient } from '@prisma/client';
import user from '../mocks/usersMock';
import { before, describe, after } from 'node:test';

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
        expect(response.username).to.be.equal('username_for_test@email.com');

        await prisma.users.delete({ where: { username: response.username }});
        await prisma.accounts.delete({ where: { id: createAccount.id }});
      });
    });
  });
});
