const Koa = require('koa');
const app = new Koa();
// const Router = require('./router')
const Cache = require("./cache");
const cache = new Cache();
// router.get('/index', async ctx => { ctx.body = 'index page'; });
// app.use(static(__dirname + '/public'));
app.use(cache.handleCache());
app.use(async ctx => {
    ctx.body = 'Hello World';
});

app.listen(3000, () => {
    console.log('server runing on port 3000')
})