const request = require('supertest');

const app = require('../main/server');

describe('/accounts', function() {

    it('GET : /accounts lists all accounts', function() {
    return request(app)
      .get('/accounts')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([ "He6zdCh1ReYxzZ9EKRawsi_O_aRykQTV", "fvMymE7X0Je1IzMDgWooV5iGBPw0yoFy"]);
      });
    });

    it('POST : /tokenize swap a account numbers for a token', function() {
      return request(app)
        .post('/tokenize')
        .set('Content-Type', 'application/json')
        .send(["4444-4444-4444-4444"])
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(["He6zdCh1ReYxzZ9EKRawsi_O_aRykQTV"]);
        });
    });

    it('POST : /tokenize new account should return 200 and create record in db', function() {
      return request(app)
        .post('/tokenize')
        .set('Content-Type', 'application/json')
        .send(["2222-2222-2222-2222"])
        .expect(200)
        .then(response => {
          expect(response.body.length).toEqual(1);
        });
    });

    it('POST : /tokenize swap a collection of account numbers for tokens', function() {
      return request(app)
        .post('/tokenize')
        .set('Content-Type', 'application/json')
        .send(["4444-4444-4444-4444", "3333-3333-3333-3333"])
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(['He6zdCh1ReYxzZ9EKRawsi_O_aRykQTV','fvMymE7X0Je1IzMDgWooV5iGBPw0yoFy']);
        });
    });

    it('POST : /tokenize invalid account should return 400', function() {
      return request(app)
        .post('/tokenize')
        .set('Content-Type', 'application/json')
        .send(["4444-4444-4444"])
        .expect(400);
    });

    it('POST : /detokenize swap back a tokens for the original account number', function() {
      return request(app)
        .post('/detokenize')
        .set('Content-Type', 'application/json')
        .send(["He6zdCh1ReYxzZ9EKRawsi_O_aRykQTV"])
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(["4444-4444-4444-4444"]);
        });
    });

    it('POST : /detokenize swap back a collection of tokens numbers for accounts', function() {
      return request(app)
        .post('/detokenize')
        .set('Content-Type', 'application/json')
        .send(["He6zdCh1ReYxzZ9EKRawsi_O_aRykQTV", "fvMymE7X0Je1IzMDgWooV5iGBPw0yoFy"])
        .expect(200)
        .then(response => {
          expect(response.body).toEqual(["4444-4444-4444-4444", "3333-3333-3333-3333"]);
        });
    });

    it('POST : /detokenize token length should 32', function() {
      return request(app)
        .post('/detokenize')
        .set('Content-Type', 'application/json')
        .send(["He6zdCh1ReYxzZ9EKRawsi"])
        .expect(400);
    });

});
