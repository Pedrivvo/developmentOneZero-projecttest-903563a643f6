// index, show, store, update, destroy


const users = [];

module.exports = {


     index(ctx){ 

        ctx.status = 200;
        ctx.body = {total:users.length, rows: users}     

        return ctx.body;
    },

     store(ctx){ 

        const { nome, email, idade} = ctx.request.body;
        const user = { nome: nome, email: email , idade: idade };

        if (idade <  18){
            ctx.status = 400;
            ctx.body = {error : "Não é possível adicionar um usuário que seja menor de idade"}   
            return ctx.body;
        }

    
        users.push(user);
    
        ctx.status = 200;
        ctx.body = ctx.request.body   
        return ctx.body;
    },
    
    show(ctx){ 

    
        const { nome } = ctx.params;


        const userIndex = users.findIndex(user => user.nome === nome);
    
        if(userIndex < 0){
            ctx.status = 404;
            ctx.body = { error : 'Usuário não encontrado' }
            return ctx.body;
        }

        const results = users.filter(user => user.nome === nome);
 
        ctx.status = 200;
        ctx.body = results   
        return ctx.body;

    },

    update(ctx){ 

        const { nomeParam } = ctx.params.nome;
        const { nome, email, idade } = ctx.request.body;
    
        const userIndex = users.findIndex(user => user.nomeParam === nomeParam);
    
        if(userIndex < 0){
            ctx.body = { error : 'Usuário não encontrado' }
            ctx.status = 404;
            return ctx.body;
        }

        if(idade < 18){
            ctx.status = 400;
            ctx.body = { error : 'Não é possível atualizar a idade de um usuário para menos de 18 anos' }
            return ctx.body;
        }

        const user = {
            nome,
            email, 
            idade
        };
    
        users[userIndex] = user;

        ctx.status = 204;
        ctx.body = {}
        return ctx.body;
       
        
    },

    destroy(ctx){ 

     
        const { nomeParam } = ctx.params.nome;

        const userIndex = users.findIndex(user => user.nomeParam === nomeParam);
    
        if(userIndex < 0){
            ctx.status = 404;
            ctx.body = { error : 'Usuário não encontrado' }
            return ctx.body;
        }
    
        users.splice(userIndex,1);

        ctx.status = 204;
        ctx.body = {}
        return ctx.body;
        
    }






 };