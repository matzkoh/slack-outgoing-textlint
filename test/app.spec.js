const app = require('..');
const request = require('supertest');

describe('GET /', () => {
  it('200 OK', async () => {
    await request(app.callback())
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8');
  });
});

describe('POST /textlint', () => {
  describe('lint error', () => {
    const wrongText = '柱で、食べれる、じゃぱりまんが、美味しい';

    it('respond with json', async () => {
      await request(app.callback())
        .post('/textlint')
        .type('form')
        .send({
          text: wrongText,
        })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(({body}) => {
          expect(body).toHaveProperty('link_names', true);
          expect(body.text).toBeTruthy();
        })
    });
  });

  describe('no lint error', () => {
    it('empty response', async () => {
      await request(app.callback())
        .post('/textlint')
        .type('form')
        .send({
          text: '柱で食べるじゃぱりまんが美味しい',
        })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Content-Length', '2')
        .expect(res => expect(res.body).toEqual({}));
    });
  });
});
