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

  it('Return must be equal to mockFile', async() => {    
    const mock = 
    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.body).to.exist;
  });
   })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  


