# Point Records

Api de gerenciamento de pontos feitos em NodeJS com o uso de Socket.io

## :hammer_and_wrench: Ferramentas

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [celebrate](https://www.npmjs.com/package/celebrate)
- [class-transformer](https://www.npmjs.com/package/class-transformer)
- [cors](https://www.npmjs.com/package/cors)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [docker](https://docs.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [express](https://expressjs.com/pt-br/)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [jest](https://jestjs.io/pt-BR/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [nodejs](https://nodejs.org/en/docs/)
- [rate-limiter-flexible](https://www.npmjs.com/package/rate-limiter-flexible)
- [redis](https://www.npmjs.com/package/redis)
- [signale](https://www.npmjs.com/package/signale)
- [supertest](https://www.npmjs.com/package/supertest)
- [socket.io](https://socket.io/docs/v4/)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [typescript](https://www.typescriptlang.org/)
- [tsyringe](https://www.npmjs.com/package/tsyringe)
- [typeorm](https://www.npmjs.com/package/typeorm)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)

## :desktop_computer: Padronização de código

- [editorconfig](https://EditorConfig.org)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)

## 👨🏻‍💻 Requests

[Arquivo com requests do insomnia](https://github.com/Marcos-afk/point-records/blob/master/Requests%20point%20records%20api)

## :rocket: Executando o projeto, rodando testes e acesso a documentação

```bash
// Instale as dependências

yarn install

// Concluindo a instalação rode

docker-compose up(iniciar a aplicação no docker)
yarn migration:run (executar todas as migrações)


// Tests
criar manualmente uma database e adicionar seu nom em POSTGRES_DB_TEST(para que seja possível rodar os testes de integração)
yarn test(rodar testes unitários e de integração)


// Documentação realizada com swagger

baseUrl/api-docs/
ex: http://localhost:5000/api-docs/


```
