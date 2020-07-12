const errors = {
  userNotFound: [
    { path: "user_notfound", message: "Usuário não encontrado!" },
  ],
  userInactive: [
    { path: "user_inactive", message: "Usuário bloqueado!" },
  ],
  incorrectPassword: [
    { path: "password_error", message: "Email ou senha incorreto!" },
  ],
  accessUnauthorized: [
    {
      path: "not_authorized",
      message: "Acesso não autorizado!",
    },
  ],
  internalError: [
    {
      path: "internal_error",
      message: "Erro interno de servidor!",
    },
  ],
};

export default errors;
