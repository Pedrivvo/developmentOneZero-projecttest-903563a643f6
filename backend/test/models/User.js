const { builtinModules } = require("module")

//Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
const userSchema = {
    title: "Schema do Usuario",
    type: "object",
    required: ['nome', 'email', 'idade'],
    properties: {
        nome: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        idade: {
            type: 'number',
            minimum: 18
        }
    }
}


module.exports = userSchema;