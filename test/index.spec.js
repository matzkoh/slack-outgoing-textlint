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
  const post = () => request(app.callback()).post('/textlint');

  describe('throws', () => {
    it('406 Not Acceptable', async () => {
      await post()
        .type('form')
        .accept('html')
        .expect(406);
    });

    it('415 Unsupported Media Type', async () => {
      await post()
        .type('json')
        .expect(415);
    });
  });

  describe('lint error', () => {
    const wrongText = '柱で、食べれる、じゃぱりまんが、美味しい';

    it('respond with json', async () => {
      await post()
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

    it('ignore bot message', async () => {
      await post()
        .type('form')
        .send({
          text: wrongText,
          bot_id: 'BOT_ID',
        })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Content-Length', '2')
        .expect(res => expect(res.body).toEqual({}));
    });
  });

  describe('no lint error', () => {
    it('empty response', async () => {
      await post()
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
