// index, show, store, update, destroy

/*Deprecated by sqlite3*/
//const users = [];

const models = require("../../models");

module.exports = {


     async index(ctx){ 

        /*Deprecated by sqlite3*/
        //ctx.body = {total:users.length, rows: users}    
        
        
        ctx.status = 200;
        ctx.body = await models.Users.findAll();

        return ctx.body;
    },

    async store(ctx){ 

        const { nome, email, idade} = ctx.request.body;
        
        const users = await models.Users.findOne({ where: { nome } });

        if(users) {
            ctx.status = 400;
            ctx.body = { error : 'Usuário já existe' }
            return ctx.body;
        }
        else{

            if (idade <  18){
                ctx.status = 400;
                ctx.body = {error : "Não é possível adicionar um usuário que seja menor de idade"}   
                return ctx.body;
            }
            else{
    
                ctx.status = 200;
                await models.Users.create(ctx.request.body);
                ctx.body = ctx.request.body   
                return ctx.body;
    
            }

        }

        /*Deprecated by sqlite3*/
        //const user = { nome: nome, email: email , idade: idade };
        //users.push(user);

        //if (idade <  18){
        //    ctx.status = 400;
        //    ctx.body = {error : "Não é possível adicionar um usuário que seja menor de idade"}   
        //   return ctx.body;
        //}

        //ctx.status = 200;
        //ctx.body = ctx.request.body   
        //return ctx.body;


       
        
    },
    
    
    async show(ctx){ 

    
        const { nome } = ctx.params;


        /*Deprecated by sqlite3*/
        //const userIndex = users.findIndex(user => user.nome === nome);
    
        //if(userIndex < 0){
        //    ctx.status = 404;
        //    ctx.body = { error : 'Usuário não encontrado' }
        //    return ctx.body;
        //}

        //const results = users.filter(user => user.nome === nome);
 
        //ctx.status = 200;
        //ctx.body = results   
        //return ctx.body;

      


        const users = await models.Users.findOne({ where: { nome } });

        if(!users) {
            ctx.status = 404;
            ctx.body = { error : 'Usuário não encontrado' }
            return ctx.body;
        }
        else {

            ctx.status = 200;
            ctx.body = users;

            return ctx.body;
        }

    },

    async update(ctx){ 

        //const { nomeParam } = ctx.params.nome;
        //const { nome, email, idade } = ctx.request.body;
    
        /*Deprecated by sqlite3*/
        //const userIndex = users.findIndex(user => user.nomeParam === nomeParam);
    
        //if(userIndex < 0){
        //    ctx.body = { error : 'Usuário não encontrado' }
        //    ctx.status = 404;
        //    return ctx.body;
        //}

        //if(idade < 18){
        //    ctx.status = 400;
        //    ctx.body = { error : 'Não é possível atualizar a idade de um usuário para menos de 18 anos' }
        //    return ctx.body;
        // }

        //const user = {
        //    nome,
        //    email, 
        //    idade
        //};
    
        //users[userIndex] = user;

        //ctx.status = 204;
        //ctx.body = {}
        //return ctx.body;

        const users = await models.Users.findOne({ where: { nome: ctx.params.nome } });

        if(!users) {
            ctx.status = 404;
            ctx.body = { error : 'Usuário não encontrado' }
            return ctx.body;
        }
        else {

            if(ctx.request.body.idade < 18){

                ctx.status = 400;
                ctx.body = { error : 'Não é possível atualizar a idade de um usuário para menos de 18 anos' }
                return ctx.body;

            }
            else{

                await models.Users.update(ctx.request.body, { where: { id : users.id } });
                ctx.status = 204;
                ctx.body = {}
                return ctx.body;

            }
           
        }
          
    },

    async destroy(ctx){ 

        /*Deprecated by sqlite3*/ 

        //const { nomeParam } = ctx.params.nome;

        //const userIndex = users.findIndex(user => user.nomeParam === nomeParam);
    
        //if(userIndex < 0){
        //    ctx.status = 404;
        //    ctx.body = { error : 'Usuário não encontrado' }
        //    return ctx.body;
        //}
    
        //users.splice(userIndex,1);

        //ctx.status = 204;
        //ctx.body = {}
        //return ctx.body;


        const users = await models.Users.findOne({ where: { nome: ctx.params.nome } });

        if(!users) {
            ctx.status = 404;
            ctx.body = { error : 'Usuário não encontrado' }
            return ctx.body;
        }
        else {

                await models.Users.destroy({ where: { id : users.id } });
                ctx.status = 204;
                ctx.body = {}
                return ctx.body;
        }
        
    },

      clear(ctx){ 

         models.Users.destroy({where: {},truncate: true});
        ctx.status = 204;
        ctx.body = {}
        return ctx.body;

     }



 };