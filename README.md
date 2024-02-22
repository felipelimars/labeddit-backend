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

- **Descrição**: Cadastra um novo _user_.
- **Método**: POST
- **URL**: `/users/signup`

### Login

- **Descrição**: Login do _user_.
- **Método**: POST
- **URL**: `/users/login`

### Create post

- **Descrição**: Cadastra umo novo _post_.
- **Método**: POST
- **URL**: `/posts`

### Get posts

- **Descrição**: Retorna todos _posts_ cadastrados.
- **Método**: GET
- **URL**: `/posts`
- 
### Create comment

- **Descrição**: Cadastra umo novo _comment_.
- **Método**: POST
- **URL**: `/posts/:post_id/comments`

### Get posts

- **Descrição**: Retorna todos _comments_ cadastrados.
- **Método**: GET
- **URL**: `/posts/:post_id/comments`

### LikeOrDislikePost

- **Descrição**: Da um like em um _post_ cadastrado.
- **Método**: PUT
- **URL**: `/posts/:id/like`
- **Body**: formato raw JSON `true` para like `false` para dislike
Exemplo:
`{
    "like": true 
}`

### LikeOrDislikeComment

- **Descrição**: Da um like em um _comment_ cadastrado.
- **Método**: PUT
- **URL**: `/posts/:post_id/comments/:comment_id/like`
- **Body**: formato raw JSON `true` para like `false` para dislike
Exemplo:
`{
    "like": true 
}`


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

