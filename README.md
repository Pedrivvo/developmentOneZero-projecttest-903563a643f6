# developmentOneZero-projecttest-903563a643f6
TEST

This project is for evaluation purposes only...

Creating an API with node.js, koa.js, sqlite3 and testunits for it with Mocha and Chai.

This API can list, add, update and remove users, observing the following schema { nome: string, email: string, idade: number}
With the business rule that users that are minors are not allowed to be inserted or updated (idade < 18). 

PT-BR
Considerações:

- Nunca usei o Koa, Somente o express, que é mais fácil de ser usado.
- Nunca usei mocha ou chai para testes automatizados.
- Prefiro o yarn sobre o npm como gerenciador de pacotes.

TO-DO

- Create some kind of Front-end.
- Change the get all users requests so it can be paginated.
- Review how to use mocha and chai to test more thoroughly.
- Remove node_modules from git.
