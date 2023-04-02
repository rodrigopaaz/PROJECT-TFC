import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/UsersModel';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testing Endpoint Login', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves({
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password:
        'secret_admin',
      } as Users);
    })

  afterEach(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })
  it('Return status must be 400', async() => {
    chaiHttpResponse = await chai.request(app).post('/login')
    expect(chaiHttpResponse.status).to.be.eq(400);
  });

  it('Return must be equal to mockFile', async() => {    
    const mock = 
    chaiHttpResponse = await chai.request(app).post('/login')
    expect(chaiHttpResponse.body).to.exist;
  });

  it('Return must be 400', async() => {    
    const mock = 
    chaiHttpResponse = await chai.request(app).post('/login/')
    expect(chaiHttpResponse.status).to.be.eq(400);
  });

  it('Return must be equal to mockFile', async() => {    
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.eq(200);
  });
   })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  


