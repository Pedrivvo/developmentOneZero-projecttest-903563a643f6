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

const { step } = require('mocha-steps');

const userSchema = require('../test/models/User');

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;



//Inicio dos testes

//este teste é simplesmente pra enteder a usar o mocha/chai
//Ceritifica-se que sqlite vai estar vazio para o proximo teste

describe('limpar o sqlite3',  () => {
    it('Executando Delete All', function (done) {
        chai.request(app)
        .get('/clear')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        done();
        });
    });
});

//testes da aplicação
describe('Testes da aplicação',  () => {
    it('O servidor está online?', function (done) {
        chai.request(app)
        .get('/')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
        });
    });


    
    /* All must be synchro */


    it('Deveria ser uma lista de usuários vazia', () => function (done) {
        chai.request(app)
        .get('/users')
        .end( function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
        });
    });

    it('Deveria criar o usuário raupp', () => function (done) {
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

    it('Deveria criar o usuário pedro', () => function (done) {
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

    it('Deveria criar o usuário zedagobe', () => function (done) {
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

    it('Deveria criar o usuário alexandre', () => function (done) {
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

    it('Deveria criar a usuária isilda', () => function (done) {
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

    it('Deveria criar a usuária rosaura', () => function (done) {
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

    it('Não deveria criar o usuário leonor (< 18 anos)', () => function (done) {
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

    it('O usuario naoExiste não existe no sistema', () => function (done) {
        chai.request(app)
        .get('/user/naoExiste')
        .end(function (err, res) {  
            expect(err).to.be.null;
            expect(res.body.error).to.be.eql('Usuário não encontrado'); //possivelmente forma errada de verificar a mensagem de erro
            expect(res).to.have.status(404);
            done();
        });
    });

    it('O usuario raupp existe e é valido', () => function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            //expect(res.body).to.be.jsonSchema(userSchema);
            done();
        });
    });

    it('deveria excluir o usuario raupp', () => function (done) {
        chai.request(app)
        .delete('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(204);
            done();
        });
    });

    it('O usuario raupp não deve existir mais no sistema', () => function (done) {
        chai.request(app)
        .get('/user/raupp')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body.error).to.be.eql('Usuário não encontrado');
            done();
        });
    });


    //must be synchro
    it('Deveria ser uma lista com pelo menos 5 usuarios', () => function (done) {
        chai.request(app)
        .get('/users')
        .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.total).to.be.at.least(5);
        done();
        });
    });
});


describe('Bateria de testes personalizados',  () => {


    describe('CREATE',  () => {

    it('Deve retornar um bad request ao tentar CRIAR um usuário com request body vazio',  () => function (done) {
            chai.request(app)
            .post('/user')
            .send({})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "O JSON de payload tem mais campos que o esquema permitido"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar CRIAR um usuário duplicado (nome já existente na base)',  () => function (done) {
            chai.request(app)
            .post('/user')
            .send({"nome": "rosaura", "email": "rosaura@devoz.com.br", "idade": 45})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "Usuário já existe"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar CRIAR um usuário com um request-body com mais campos que o esquema ',  () => function (done) {
            chai.request(app)
            .post('/user')
            .send({"nome": "ronivaldo", "email": "ronivaldo@devoz.com.br", "idade": 30, "rua": "seila"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "O JSON de payload tem mais campos que o esquema permitido"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar CRIAR um usuário com um request-body com menos campos que o esquema ',  () => function (done) {
            chai.request(app)
            .post('/user')
            .send({"nome": "ronivaldo", "email": "ronivaldo@devoz.com.br"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "O JSON de payload tem menos campos que o esquema permitido"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar CRIAR um usuário com um request-body com os campos do esquema mas tipos diferentes',  () => function (done) {
            chai.request(app)
            .post('/user')
            .send({"nome": "ronivaldo", "email": "ronivaldo@devoz.com.br", "idade": "Trinta e dois"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "JSON Payload deve seguir o modelo -> nome:string, email:string, idade: number"});
                done();
            });
        });});


        //Update


        describe('UPDATE',  () => {

        it('Deve retornar um bad request ao tentar ATUALIZAR um usuário para uma idade menor que 18 anos',  () => function (done) {
                chai.request(app)
                .put('/user/zedagobe')
                .send({"nome": "zedagobe", "email": "zedagobe@devoz.com.br", "idade": 13})
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    assert.typeOf(res,'Object');
                    expect(res.body).to.eql({"erro": "Não é possível atualizar a idade de um usuário para menos de 18 anos"});
                    done();
                });
        });    

        it('Deve retornar um bad request ao tentar ATUALIZAR um usuário com request body vazio',  () => function (done) {
            chai.request(app)
            .put('/user/ronivaldo')
            .send({})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "O JSON de payload tem mais campos que o esquema permitido"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar ATUALIZAR um usuário com um request-body com mais campos que o esquema ',  () => function (done) {
            chai.request(app)
            .put('/user/ronivaldo')
            .send({"nome": "ronivaldo", "email": "ronivaldo@devoz.com.br", "idade": 30, "rua": "seila"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "O JSON de payload tem mais campos que o esquema permitido"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar ATUALIZAR um usuário com um request-body com menos campos que o esquema ',  () => function (done) {
            chai.request(app)
            .put('/user/ronivaldo')
            .send({"nome": "ronivaldo", "email": "ronivaldo@devoz.com.br"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "O JSON de payload tem menos campos que o esquema permitido"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar ATUALIZAR um usuário com um request-body com os campos do esquema mas tipos diferentes',  () => function (done) {
            chai.request(app)
            .put('/user/ronivaldo')
            .send({"nome": "ronivaldo", "email": "ronivaldo@devoz.com.br", "idade": "Trinta e dois"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "JSON Payload deve seguir o modelo -> nome:string, email:string, idade: number"});
                done();
            });
        });});

        //Delete

        describe('DELETE',  () => {

        it('Deve retornar um bad request ao tentar REMOVER um usuário com request body vazio',  () => function (done) {
            chai.request(app)
            .delete('/user/ronivaldo')
            .send({})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "O JSON de payload tem mais campos que o esquema permitido"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar REMOVER um usuário com um request-body com mais campos que o esquema ',  () => function (done) {
            chai.request(app)
            .delete('/user/ronivaldo')
            .send({"nome": "ronivaldo", "email": "ronivaldo@devoz.com.br", "idade": 30, "rua": "seila"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "O JSON de payload tem mais campos que o esquema permitido"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar REMOVER um usuário com um request-body com menos campos que o esquema ',  () => function (done) {
            chai.request(app)
            .delete('/user/ronivaldo')
            .send({"nome": "ronivaldo", "email": "ronivaldo@devoz.com.br"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "O JSON de payload tem menos campos que o esquema permitido"});
                done();
            });
        });

        it('Deve retornar um bad request ao tentar REMOVER um usuário com um request-body com os campos do esquema mas tipos diferentes',  () => function (done) {
            chai.request(app)
            .delete('/user/ronivaldo')
            .send({"nome": "ronivaldo", "email": "ronivaldo@devoz.com.br", "idade": "Trinta e dois"})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                assert.typeOf(res,'Object');
                expect(res.body).to.eql({"erro": "JSON Payload deve seguir o modelo -> nome:string, email:string, idade: number"});
                done();
            });
        });});


});