import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import leaderboardMocks from './mocks/leaderboard.mocks';
import teamsMocks from './mocks/teams.mocks';
import matchMocks from './mocks/match.mocks';
import TeamsModel from '../database/models/SequelizeTeam';
import MatchModel from '../database/models/SequelizeMatch';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /leaderboard', function () { 
  beforeEach(function () { sinon.restore(); });
  it('retorna a classificação dos times com mando de campo', async function () {

    sinon.stub(TeamsModel, 'findAll').resolves(teamsMocks.allTeams as any);
    sinon.stub(MatchModel, 'findAll').resolves(matchMocks.matchsFinished as any);


    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardMocks.home);
  });
  it('retorna a classificação dos times com mando de campo', async function () {

    sinon.stub(TeamsModel, 'findAll').resolves(teamsMocks.allTeams as any);
    sinon.stub(MatchModel, 'findAll').resolves(matchMocks.matchsFinished as any);


    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardMocks.away);
  });
  it('retorna a classificação dos times com mando de campo', async function () {

    sinon.stub(TeamsModel, 'findAll').resolves(teamsMocks.allTeams as any);
    sinon.stub(MatchModel, 'findAll').resolves(matchMocks.matchsFinished as any);


    const { status, body } = await chai.request(app).get('/leaderboard');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardMocks.total);
  });
  
});