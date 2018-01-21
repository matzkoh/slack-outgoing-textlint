const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const lintText = require('./lintText');
const fs = require('fs');

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  const stream = fs.createReadStream('html/index.html');

  ctx.type = 'html';
  ctx.body = stream;
});

router.post('/textlint', async ctx => {
  const text = await lintText(ctx.request.body.text);

  ctx.body = {text};
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

if (!module.parent) {
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
}

module.exports = app;
