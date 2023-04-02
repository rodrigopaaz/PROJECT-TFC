import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Endpoint Match', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore())
  it('Return status must be 200', async() => {
    chaiHttpResponse = await chai.request(app).get('/matches')
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Get all matches', async() => {    
    const mock = 
    chaiHttpResponse = await chai.request(app).get('/matches')
    expect(chaiHttpResponse.body).to.exist;
  });

  it('Get matches by id', async() => {    
    const mock = 
    chaiHttpResponse = await chai.request(app).patch('/matches/1/')
    expect(chaiHttpResponse.body).to.exist;
  });
  it('Finish match test', async() => {    
    const mock = 
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')
    expect(chaiHttpResponse.body).to.exist;
  });
   })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  


