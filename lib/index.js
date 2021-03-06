const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const lintText = require('./lintText');
const keepalive = require('koa-glitch-keepalive');

const app = new Koa();
const router = new Router();

router.get('/', async ctx => {
  const stream = fs.createReadStream('html/index.html');

  ctx.type = 'html';
  ctx.body = stream;
});

const createPayload = async params => {
  if (params.bot_id)
    return {};

  const text = await lintText(params.text);

  if (!text)
    return {};

  return {
    text,
    link_names: true,
  };
};

router.post('/textlint', async ctx => {
  const {request, response} = ctx;

  request.is('application/x-www-form-urlencoded') || ctx.throw(415);
  request.accepts('json') || ctx.throw(406);

  response.status = 200;
  response.body = await createPayload(request.body);
});

app.use(keepalive('slack-outgoing-textlint'));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

if (require.main === module) {
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
}

module.exports = app;
