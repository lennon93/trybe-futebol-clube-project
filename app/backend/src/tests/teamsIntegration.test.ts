import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import teamsMocks from './mocks/teams.mocks';
import TeamsModel from '../database/models/SequelizeTeam';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /teams', function () { 
  beforeEach(function () { sinon.restore(); });
  it('retorna todos os times', async function () {

    sinon.stub(TeamsModel, 'findAll').resolves(teamsMocks.allTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMocks.allTeams);
  });
  it('retorna um time pelo ID', async function () {

    sinon.stub(TeamsModel, 'findOne').resolves(teamsMocks.teamById as any);

    const { status, body } = await chai.request(app).get(`/teams/${teamsMocks.teamById.id}`);

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMocks.teamById);
  });
  it('retorna um erro quando não encontra um time pelo ID', async function () {

    sinon.stub(TeamsModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get(`/teams/${teamsMocks.teamById.id}`);

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: `Team ${teamsMocks.teamById.id} not found` });
  });
});