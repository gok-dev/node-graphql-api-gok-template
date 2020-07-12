import { createdNewUser, tryLogin } from "../services/users.services";
import { contextTypes, userTypes } from "../ts/types";

export default {
  User: {},

  Query: {
    userCurrent: async (_: void, args: void, context: contextTypes): Promise<userTypes | null> => {
      const auth = await context.verifyClientAuth(context.req);

      if (!auth) return null;

      return await context
        .db(context.tables.users)
        .where({ id: auth.user.id })
        .first();
    },
  },

  Mutation: {
    userAdd: async (_: void, { data }, context: contextTypes): Promise<any> => {
      return await createdNewUser(data, context.db, context.tables.users, context.secret);
    },

    userLogin: async (_: void, { email, password }, context: contextTypes): Promise<any> => {
      return await tryLogin(email, password, context.db, context.tables.users, context.secret);
    }
  }
}
