# Labeddit

- [Documentação Labeddit API](https://documenter.getpostman.com/view/28315812/2s9YeHbBMQ)
- [Link para repositório o front-end](https://github.com/felipelimars/labeddit-frontend)
- [Modelagem de relação entre as tabelas](https://github.com/felipelimars/labeddit-backend/blob/main/src/assets/modelagem%20-%20co%CC%81pia.png)

<br>

Labeddit é um projeto fullstack, uma rede social com o objetivo de promover a conexão e interação entre pessoas. Quem se cadastrar no aplicativo poderá criar, curtir e comentar publicações.
O projeto possui a criação de API e banco de dados, implementação de segurança e código escalável seguindo padrões de design e arquitetura POO (Programação orientada a objetos).

## Conteúdos abordados
<p align="left">
<br>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=postman,nodejs,typescript,express,sqlite,mysql,jest,zod,knex" style="height: 25px;"/>
  </a>
</p>

### Tecnologias Utilizadas

- TypeScript
- Node.js
- Express
- SQLite3
- Bcrypt.js
- Knex
- Jest
- Cors
- Dotenv
- Jsonwebtoken
- Uuid
- Zod

- Endpoints
  
    - [ ]  signup
    - [ ]  login
    - [ ]  create post
    - [ ]  get posts
    - [ ]  create comment
    - [ ]  get comments
    - [ ]  likeOrDislikeComment
    - [ ]  likeOrDislikePosts

- Autenticação e autorização
    - [ ]  identificação UUID
    - [ ]  senhas hasheadas com Bcrypt
    - [ ]  tokens JWT
 
 - Código
    - [ ]  POO
    - [ ]  Arquitetura em camadas
    - [ ]  Roteadores no Express

### Exemplos de requisição

### Signup
```
// request POST url/users/signup
// body JSON
{
  "name": "Felipe",
  "email": "felipe@email.com",
  "password": "felipe123"
}

// response
// status 201 CREATED
{
  token: "devolve-um-token-jwt"
}
```

### Login

```
// request POST url/users/login
// body JSON
{
  "email": "felipe@email.com",
  "password": "felipe123"
}

// response
// status 200 OK
{
  token: "devolve-um-token-jwt"
}
```

### Create post

```
// request POST url/users/login
// body JSON
{
    "content": "Postagem bem legal."
}
// response
// status 201 CREATED
```

### Get posts

```
// request GET /posts
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "uma uuid v4",
        "content": "Hoje vou estudar POO!",
        "likes": 2,
        "dislikes" 1,
        "creator": {
            "id": "uma uuid v4",
            "name": "Fulano"
        }
    },
    {
        "id": "uma uuid v4",
        "content": "Uhul",
        "likes": 0,
        "dislikes" 0,
        "creator": {
            "id": "uma uuid v4",
            "name": "Ciclana"
        }
    }
]
```

### Create comment
```
// request POST url//posts/:post_id/comments
// path variables = post_id
// headers.authorization = "token jwt"
// body JSON
{
    "content": "Comentário novo!"
}
// response
// status 201 CREATED
```
### Get Comments
```
// request GET /posts/:post_id/comments
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "7cfee4ad-69c2-4aa9-a411-f1fcd997398d",
        "postId": "de28a2a4-b33d-4d18-9c8f-70b136fde94a",
        "content": "Isso mesmo, foco e determinação é a chave para alcançar os objetivos!",
        "likes": 0,
        "dislikes": 1,
        "createdAt": "2024-02-18T02:48:31.232Z",
        "updatedAt": "2024-02-18T02:48:31.232Z",
        "creator": {
            "id": "2024-02-18T02:48:31.232Z",
            "name": "Sabrina"
        }
    },
    {
        "id": "c81bb339-2f1b-40a0-9c8e-9e02290ed944",
        "postId": "de28a2a4-b33d-4d18-9c8f-70b136fde94a",
        "content": "Pra cima!",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2024-02-18T02:53:58.826Z",
        "updatedAt": "2024-02-18T02:53:58.826Z",
        "creator": {
            "id": "2024-02-18T02:53:58.826Z",
            "name": "Sabrina"
        }
    }
]
```

### LikeOrDislikePost
```
// request PUT /posts/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true 
}
para like

ou

{
    "like": false
}
para dislike

// response
// status 200 OK
```
### LikeOrDislikeComment
```
// request PUT /:post_id/comments/:comment_id/like
// headers.authorization = "token jwt"
// path variables = post_id
// path variables = comment_id
// body JSON
{
    "like": true 
}
para like

ou

{
    "like": false
}
para dislike

// response
// status 200 OK
```

Para entender a tabela likes_dislikes
no SQLite, lógicas booleanas devem ser controladas via 0 e 1 (INTEGER)
- quando like valer 1 na tabela é porque a pessoa deu like no post
na requisição like é true
- quando like valer 0 na tabela é porque a pessoa deu dislike no post
na requisição like é false
- caso não exista um registro na tabela de relação, é porque a pessoa não deu like nem dislike
- caso dê like em um post que já tenha dado like, o like é removido (deleta o item da tabela)
- caso dê dislike em um post que já tenha dado dislike, o dislike é removido (deleta o item da tabela)


## Postman

Para testar os endpoints da API, você pode usar o [**Postman**](https://documenter.getpostman.com/view/28315812/2s9YC8xBvZ). Basta importar a coleção no Postman para começar a fazer solicitações e testar os diferentes recursos da API.

## Como instalar e executar o projeto

### Pré-requisitos

Antes de começar, certifique-se de atender aos seguintes requisitos:

- Node.js e VScode instalados em sua máquina.


```bash / terminal
# clonar repositório
git clone https://github.com/felipelimars/projeto-labook-backend.git

# Abra o projeto no Visual Studio Code (ou em seu editor de código preferido).

# instalar dependências
npm install

# executar o projeto
npm run dev
```

Agora o servidor está em execução e conectado com a API.

# Autor

[**Felipe Lima**](https://www.linkedin.com/in/felipelimars)

