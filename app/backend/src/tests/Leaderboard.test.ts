import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import homeResult from './mocks/expected/leaderboard/homeResult';
import { LeaderBoardService } from '../services';
import Matches from '../database/models/MatchesModel';
import getAllMatches from './mocks/expected/matches/allMatches';
import Users from '../database/models/UsersModel';
import awayResult from './mocks/expected/leaderboard/awayResult';
import state01 from './mocks/expected/leaderboard/state01';
import allResult from './mocks/expected/leaderboard/state01';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Endpoint Leaderboard', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore())
  it('Return status must be 200', async() => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard')
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('Return must be equal to mockFile', async() => {    
    chaiHttpResponse = await chai.request(app).get('/leaderboard')
    expect(chaiHttpResponse.body).to.be.deep.equal(allResult.state01);
  });

  it('Return must be equal to homeResult', async() => {    
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home')
    expect(chaiHttpResponse.body).to.be.deep.equal(homeResult.homeResult1);
  });

  it('Return must be equal to mockFile', async() => {    
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away')
    expect(chaiHttpResponse.body).to.be.deep.equal(awayResult.awayResult1);
  });
   })
