const request = require('supertest');

const app = require('../main/server');

describe('/accounts', function() {

    it('GET : /accounts lists all accounts', function() {
    return request(app)
      .get('/accounts')
      .set('Accept', 'application/json')
     // .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([ 'He6zdCh1ReYxzZ9EKRawsi_O_aRykQTV', 'fvMymE7X0Je1IzMDgWooV5iGBPw0yoFy']);
      });
    });

    it('POST : /tokenize swap a collection of account numbers for tokens', function() {
      return request(app)
        .post('/tokenize')
        .set('Content-Type', 'application/json')
        .send(["4444-4444-4444-4444"])
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(['He6zdCh1ReYxzZ9EKRawsi_O_aRykQTV']);
        });
    });

    it('POST : /detokenize swap a collection of tokens numbers for accounts', function() {
      return request(app)
        .post('/detokenize')
        .set('Content-Type', 'application/json')
        .send(["He6zdCh1ReYxzZ9EKRawsi_O_aRykQTV"])
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(['4444-4444-4444-4444']);
        });
    });

});
