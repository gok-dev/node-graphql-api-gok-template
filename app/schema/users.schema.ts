import { gql } from "apollo-server-express";

export default gql`
  # Principal Types
  """
  Todos os dados que podem ser solicitados pelo cliente (Front-end).
  """
  type User @cacheControl(maxAge: 240) {
    id: Int!
    name: String
    email: String
    telephone: String
    avatar: String
    active: Boolean
    role: String
  }

  # Inputs
  """
  Todos os dados e tipos de dados que precisam ser passados como parametro para
  cadastrar um novo usuario.
  """
  input UserInput {
    name: String!
    email: String!
    telephone: String
    password: String!
    avatar: String
    active: Boolean
  }

  type Query {
    """
    Retorna os dados do usuario logado.
    """
    userCurrent: User! @cacheControl(maxAge: 10)
  }

  type Mutation {
    """
    Cadastra um novo usuario na base de dados.
    """
    userAdd(data: UserInput!): ResUser!
    """
    Realiza o login do usuario e retorna o token de acesso.
    """
    userLogin(email: String!, password: String!): ResUser!
  }

  type ResUser {
    ok: Boolean!
    user: User
    token: String
    refreshToken: String
    errors: [Error]
  }

  type Error {
    path: String
    message: String
  }
`;
