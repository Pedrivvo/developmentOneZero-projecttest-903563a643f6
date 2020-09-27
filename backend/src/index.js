//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body')
const UserController = require('./controllers/userController')


const koa = new Koa();
var router = new Router();



//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/  por exemplo
router.get('/users',  ctx => UserController.index(ctx));
router.get('/user/:nome',  ctx => UserController.show(ctx));
router.post('/user',  ctx => UserController.store(ctx));
router.put('/user/:nome',  ctx => UserController.update(ctx));
router.delete('/user/:nome',  ctx => UserController.destroy(ctx));


koa
  .use(KoaBody())
  .use(router.routes())
  .use(router.allowedMethods());
  

const server = koa.listen(PORT, () => {
    console.log('🚀  Back-end started!');
});

module.exports = server;