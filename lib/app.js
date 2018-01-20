const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const lintText = require('./lintText');

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  ctx.body = 'working';
});

router.post('/textlint', async ctx => {
  const text = await lintText(ctx.request.body.text);

  ctx.body = {text};
});

app.use(bodyParser());
app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

if (!module.parent) {
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
}

module.exports = app;
