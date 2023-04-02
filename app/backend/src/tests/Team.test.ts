import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Endpoint Team', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore())
  it('Return status must be 200', async() => {
    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('get all teams', async() => {    
    const mock = 
    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.body).to.exist;
  });
  it('getting team by id', async() => {    
    const mock = 
    chaiHttpResponse = await chai.request(app).get('/teams/1')
    expect(chaiHttpResponse.body).to.exist;
  });

  it('Teams does not exist test', async() => {    
    const mock = 
    chaiHttpResponse = await chai.request(app).get('/teams/100')
    expect(chaiHttpResponse.body).to.exist;
  });
   })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  


