//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app =  require('../src/index.js');

const chai = require('chai');

var assert = require('chai').assert

const chaiHttp = require('chai-http');
const chaiJson = require('chai-json-schema');

const userSchema = require('../test/models/User');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;



//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
/*describe('Um simples conjunto de testes', function () {
    it('deveria retornar -1 quando o valor não esta presente', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});*/

//testes da aplicação
describe('Testes da aplicação - Caminho perfeito',  () => {
    it('O servidor está online?', function (done) {
        chai.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        });
    });

    it('Deveria ser uma lista de usuários vazia', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
        });
    });

    it('Deveria criar o usuário raupp', function (done) {
        chai.request(app)
        .post('/user')
        .send({"nome": "raupp", "email": "jose.raupp@devoz.com.br", "idade": 35})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            assert.typeOf(res,'Object');
            expect(res.body).to.eql({"nome": "raupp", "email": "jose.raupp@devoz.com.br", "idade": 35});
            done();
        });
    });

    it('Deveria criar o usuário pedro', function (done) {
        chai.request(app)
        .post('/user')
        .send({"nome": "pedro", "email": "pedroivomonte@gmail.com", "idade": 26})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            assert.typeOf(res,'Object');
            expect(res.body).to.eql({"nome": "pedro", "email": "pedroivomonte@gmail.com", "idade": 26});
            done();
        });
    });

    it('Deveria criar o usuário zedagobe', function (done) {
        chai.request(app)
        .post('/user')
        .send({"nome": "zedagobe", "email": "zedagobe@devoz.com.br", "idade": 55})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            assert.typeOf(res,'Object');
            expect(res.body).to.eql({"nome": "zedagobe", "email": "zedagobe@devoz.com.br", "idade": 55});
            done();
        });
    });

    it('Deveria criar o usuário alexandre', function (done) {
        chai.request(app)
        .post('/user')
        .send({"nome": "alexandre", "email": "alexandre@devoz.com.br", "idade": 32})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            assert.typeOf(res,'Object');
            expect(res.body).to.eql({"nome": "alexandre", "email": "alexandre@devoz.com.br", "idade": 32});
            done();
        });
    });

    it('Deveria criar a usuária isilda', function (done) {
        chai.request(app)
        .post('/user')
        .send({"nome": "isilda", "email": "isilda@devoz.com.br", "idade": 23})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            assert.typeOf(res,'Object');
            expect(res.body).to.eql({"nome": "isilda", "email": "isilda@devoz.com.br", "idade": 23});
            done();
        });
    });

    it('Deveria criar a usuária rosaura', function (done) {
        chai.request(app)
        .post('/user')
        .send({"nome": "rosaura", "email": "rosaura@devoz.com.br", "idade": 45})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            assert.typeOf(res,'Object');
            expect(res.body).to.eql({"nome": "rosaura", "email": "rosaura@devoz.com.br", "idade": 45});
            done();
        });
    });



    it('Não deveria criar o usuário leonor (< 18 anos)', function (done) {
        chai.request(app)
        .post('/user')
        .send({"nome": "leonor", "email": "leonor@devoz.com.br", "idade": 14})
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            assert.typeOf(res,'Object');
            expect(res.body).to.eql({"error":"Não é possível adicionar um usuário que seja menor de idade"});
            done();
        });
    });





    //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

    it('O usuario naoExiste não existe no sistema', function (done) {
        chai.request(app)
        .get('/user/naoExiste')
        .end(function (err, res) {  
            expect(err).to.be.null;
            expect(res.body.error).to.be.eql('Usuário não encontrado'); //possivelmente forma errada de verificar a mensagem de erro
            expect(res).to.have.status(404);
            done();
        });
    });

    it('O usuario raupp existe e é valido', function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            //expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('deveria excluir o usuario raupp', function (done) {
        chai.request(app)
        .delete('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(204);
            done();
        });
    });

    it('O usuario raupp não deve existir mais no sistema', function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body.error).to.be.eql('Usuário não encontrado');
            done();
        });
    });

    it('Deveria ser uma lista com pelo menos 5 usuarios', function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.total).to.be.at.least(5);
        done();
        });
    });
})