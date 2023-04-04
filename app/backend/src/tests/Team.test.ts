import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Teams from '../database/models/TeamsModel';
import teams from './mocks/expected/teams/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Endpoint Team', () => {
  let chaiHttpResponse: Response;

  beforeEach(async() => {
    sinon.stub(Teams, 'findAll').resolves(teams)
    sinon.stub(Teams, 'findByPk').resolves(teams[0])
  }) 
  
  afterEach(() => {
    (Teams.findAll as sinon.SinonStub).restore();
    (Teams.findByPk as sinon.SinonStub).restore();
  })
  
  it('Team return status must be 200', async() => {
    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('get all teams', async() => {    
    chaiHttpResponse = await chai.request(app).get('/teams')
    expect(chaiHttpResponse.body).to.be.deep.equal(teams);
  });
  it('getting team by id', async() => {    
    chaiHttpResponse = await chai.request(app).get('/teams/1')
    expect(chaiHttpResponse.body).to.be.deep.equal(teams[0]);
  });
   })

   describe('Testing Endpoint Team Using a Invalid Value', () => {
    
    let chaiHttpResponse: Response;
  
    beforeEach(async() => {
      sinon.stub(Teams, 'findAll').resolves(teams)
      sinon.stub(Teams, 'findByPk').resolves(teams[0])
    }) 
    
    afterEach(() => {
      (Teams.findAll as sinon.SinonStub).restore();
      (Teams.findByPk as sinon.SinonStub).restore();
    })
  
    it('Teams does not exist test', async() => {    
      chaiHttpResponse = await chai.request(app).get('/teams/50')
      expect(chaiHttpResponse).not.to.key('body');
    });
  
  })  

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  


