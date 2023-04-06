import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/MatchesModel';
import getAllMatches from './mocks/expected/matches/allMatches';
import Users from '../database/models/UsersModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Endpoint Match', () => {
  let chaiHttpResponse: Response;

  beforeEach(async() => {
    sinon.stub(Matches, 'findAll').resolves(getAllMatches)
    sinon.stub(Matches, 'findByPk').resolves(getAllMatches[0])
        sinon
    .stub(Users, 'findOne')
    .resolves({
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password:
      '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    } as Users);
  }) 
  
  afterEach(() => {
    (Matches.findAll as sinon.SinonStub).restore();
    (Matches.findByPk as sinon.SinonStub).restore();
  })

  afterEach(() => sinon.restore())
  it('Return status must be 200', async() => {
    chaiHttpResponse = await chai.request(app).get('/matches')
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Get all matches', async() => {    
    chaiHttpResponse = await chai.request(app).get('/matches')
    expect(chaiHttpResponse.body).to.be.deep.equal(getAllMatches);
  });

  it('Get matches by id', async() => {    
     chaiHttpResponse = await chai
      .request(app).post('/login').send({ 
        email: 'admin@admin.com', password: 'secret_admin' });
        const authorization = chaiHttpResponse.body
    chaiHttpResponse = await chai.request(app).patch('/matches/1/').set('Authorization', authorization.token).send({
      homeTeamGoals: 2, awayTeamGoals: 3
    })
    expect(chaiHttpResponse.body).to.be.deep.equal({message: { awayTeamGoals: 3,
    homeTeamGoals: 2,}
      });
  });
  it('Finish match test', async() => {    
    chaiHttpResponse = await chai
    .request(app).post('/login').send({ 
      email: 'admin@admin.com', password: 'secret_admin' });
      const authorization = chaiHttpResponse.body
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').set('Authorization', authorization.token)
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished'});
  });

  it('Invalid finish match test', async() => {    
    chaiHttpResponse = await chai
    .request(app).post('/login').send({ 
      email: 'admin@admin.com', password: 'secret_admin' });
      const authorization = chaiHttpResponse.body
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found'});
  });
   })


