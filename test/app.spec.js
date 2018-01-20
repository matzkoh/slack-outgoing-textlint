const app = require('..');
const request = require('supertest');

describe('GET /', () => {
  it('200 OK', async () => {
    await request(app.callback())
      .get('/')
      .expect(200);
  });
});

describe('POST /textlint', () => {
  it('respond with json', async () => {
    await request(app.callback())
      .post('/textlint')
      .type('form')
      .send({
        "text": "柱で、食べれる、じゃぱりまんが、美味しいです",
      })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(res => expect(res.body).toHaveProperty('text'));
  });
});
