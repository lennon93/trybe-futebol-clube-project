import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import matchMocks from './mocks/match.mocks';
import loginMocks from './mocks/login.mocks';
import MatchModel from '../database/models/SequelizeMatch';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /matches', function () { 
  beforeEach(function () { sinon.restore(); });
  it('retorna as partidas finalizadas', async function () {

    sinon.stub(MatchModel, 'findAll').resolves(matchMocks.matchsFinished as any);


    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMocks.matchsFinished);
  });
  it('retorna as partidas em andamento', async function () {

    sinon.stub(MatchModel, 'findAll').resolves(matchMocks.matchsInProgress as any);


    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMocks.matchsInProgress);
  });
  it('retorna todas as partidas', async function () {

    sinon.stub(MatchModel, 'findAll').resolves(matchMocks.allMatches as any);


    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMocks.allMatches);
  });
  it('finaliza uma partida', async function () {

    sinon.stub(MatchModel, 'update').resolves(matchMocks.match as any);


    const { status, body } = await chai.request(app).patch(`/matches/${matchMocks.match.id}/finish`)
    .set({Authorization: loginMocks.token.token});

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: "Finished" });
  });
  it('update em uma partida', async function () {

    sinon.stub(MatchModel, 'update').resolves(matchMocks.match as any);


    const { status, body } = await chai.request(app).patch(`/matches/${matchMocks.match.id}`)
    .set({Authorization: loginMocks.token.token}).send({'homeTeamGoals': 2, 'awayTeamGoals': 0});

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: "Updated" });
  });
  it('Erro ao encontrar a partida pelo id', async function () {

    sinon.stub(MatchModel, 'findOne').resolves();


    const { status, body } = await chai.request(app).patch(`/matches/${matchMocks.match.id}`)
    .set({Authorization: loginMocks.token.token});

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Match not found' });
  });
  it('Erro ao encontrar a partida pelo id, sem token', async function () {

    sinon.stub(MatchModel, 'update').resolves(matchMocks.match as any);


    const { status, body } = await chai.request(app).patch(`/matches/${matchMocks.match.id}`);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });
  it('cria uma partida nova', async function () {

    sinon.stub(MatchModel, 'create').resolves(matchMocks.newMatch as any);


    const { status, body } = await chai.request(app).post('/matches').set({Authorization: loginMocks.token.token})
    .send({
            "homeTeamId": 16, 
            "awayTeamId": 8,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
          });

    expect(status).to.equal(201);
    expect(body).to.deep.equal(matchMocks.newMatch);
  });
  it('dá erro ao cadastrar times iguais', async function () {

    sinon.stub(MatchModel, 'create').resolves();


    const { status, body } = await chai.request(app).post('/matches').set({Authorization: loginMocks.token.token})
    .send({
            "homeTeamId": 16, 
            "awayTeamId": 16,
            "homeTeamGoals": 2,
            "awayTeamGoals": 2,
          });

    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: "It is not possible to create a match with two equal teams" });
  });
});