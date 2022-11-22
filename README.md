# Boas vindas ao repositório do projeto Digital Wallet

## Descrição do projeto

O desafio consistiu na criação de uma carteira digital cujo objetivo seja possibilitar que usuários consigam realizar transferências internas entre si. É uma aplicação Full-Stack onde o back-end foi desenvolvido com Node.js, TypeScript, Prisma ORM e o banco de dados utilizado foi o PostgreSQL. Já o Front-End foi construído utilizando React com TypeScript, Redux, BootStrap e CSS.

## Instalação do projeto localmente

Após cada um dos passos, haverá um exemplo do comando a ser digitado para fazer o que está sendo pedido.

1. Abra o terminal e depois clone o projeto:
```javascript
  git clone git@github.com:Humberto-Bonadiman/digital-wallet.git
```

2. Acesse o diretório do projeto e depois utilize o comando **npm i** para instalar todas as dependências necessárias:
```javascript
  cd digital-wallet
  npm install
```

3. Por último, rode o comando **npm run compose:up** para rodar o projeto via docker e acesse o projeto via browser, no caminho `http://localhost:3000/`.
```javascript
  npm run compose:up
```

---

## Rodando o projeto sem o Docker

Caso queira rodar o projeto sem a utilização do Docker, você pode seguir os passos abaixo, continuando após o 2º passo da descrição anterior.

1. Abra duas abas do seu terminal, uma para o diretório **frontend** e outra para o diretório **backend**

2. Entre na pasta **backend** e rode o comando **npm run migrate-seed**:
```javascript
  cd backend
  npm run migrate-seed
```

3. Rode a aplicação com **npm start**
```javascript
  npm start
```

4. Na aba para o frontend rode os seguintes comandos a partir da pasta raiz do projeto:
```javascript
  cd frontend
  npm start
```

## Erros que você pode encontrar

1. Caso você possua o PostgreSQL instalado e ativo na sua máquina pode ocorrer o seguinte erro ao rodar o docker:
```javascript
ERROR: for postgres  Cannot start service postgres: driver failed programming external connectivity on endpoint digital-wallet_postgres_1 (xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx): Error starting userland proxy: listen tcp4 0.0.0.0:5432: bind: address already in use
ERROR: Encountered errors while bringing up the project.
```

Para isso, você deve utilizar o seguinte comando:
´´´javascript
  sudo service postgresql stop
```

Caso ocorra algum error parecido no Windows ou no macOS indico seguir para o link abaixo e tentar parar o PostgreSQL:
Link: https://tableplus.com/blog/2018/10/how-to-start-stop-restart-postgresql-server.html

2. Caso você tenha rodado a aplicação sem o docker, o backend parou e apareceu o seguinte erro no terminal **Segmentation fault** indico seguir os passos abaixo:
```javascript
  nvm install v16.18.1
  nvm use v16.18.1
```

Após isso é só rodar a sua aplicação backend novamente.
