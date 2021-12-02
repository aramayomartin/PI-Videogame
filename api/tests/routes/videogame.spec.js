/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);

describe('Videogame routes', () => {
  before(() =>
    conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Videogame.sync({ force: true }));
  // test
  describe('GET /videogames and GET /videogame', () => {
    it('Should get 200 if we have the first 5 pages of our API and DB games', () => agent.get('/videogames').expect(200)).timeout(10000);;
    it('Search by name, should return status 200 - test with pacman', () =>agent.get('/videogames?name=pacman').expect(200));
    it('Get by ID, should return status 200 - test with id=1', () =>agent.get('/videogame/1').expect(200));
    it('Get by ID, should return status 404 if the game is not found.', () =>agent.get('/videogame/skere').expect(404));
  });
});