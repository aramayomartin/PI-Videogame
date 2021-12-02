const { Videogame, Genres, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('Should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('Should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });

      it('Should return all genres availables in our API', (done) => {
        Genres.findAll()
          .then((response) => done(expect(response).toHaveLength(19)))
          .catch(() => done());
      });
    });
  });
});