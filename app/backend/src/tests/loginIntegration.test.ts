import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import { app } from '../app';
import loginMocks from './mocks/login.mocks';
import UserModel from '../database/models/SequelizeUser';

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Login sem Email deve retornar 400', async function () { 
      
    
      const response = await chai.request(app)
      .post('/login').send(loginMocks.noEmailLoginBody);

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: "All fields must be filled" });
  });
  it('Login sem password deve retornar 400', async function () { 
      
    
    const response = await chai.request(app)
    .post('/login').send(loginMocks.noPasswordLoginBody);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: "All fields must be filled" });
});
it('ao receber um Email inexistente, retorne um erro', async function () {

  sinon.stub(UserModel, 'findOne').resolves(null);

  const response = await chai.request(app).post('/login').send(loginMocks.notExistingEmailBody);

  expect(response.status).to.equal(401);
  expect(response.body).to.be.deep.equal({ message: "Invalid email or password" });
});
it('ao receber um password inexistente, retorne um erro', async function () {

  sinon.stub(UserModel, 'findOne').resolves(null);

  const response = await chai.request(app).post('/login').send(loginMocks.notExistingPassword);

  expect(response.status).to.equal(401);
  expect(response.body).to.be.deep.equal({ message: "Invalid email or password" });
});
it('ao receber um Email e login, retorne um token', async function () {

    const findOneReturn = UserModel.build(loginMocks.userMock);
    sinon.stub(UserModel, 'findOne').resolves(findOneReturn);
    sinon.stub(bcrypt, 'compareSync').returns(true);

    const response = await chai.request(app).post('/login').send(loginMocks.validLoginBody);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.key('token');
});
});