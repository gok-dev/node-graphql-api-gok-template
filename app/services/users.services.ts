import * as bcrypt from "bcryptjs";
import { createTokens } from "./tokens.services";
import { userTypes } from "../ts/types";
import errors from "../utils/errors";

/**
 * @description register new user
 * @param data
 * @param db
 * @param table
 * @param secret
 */
export async function createdNewUser(
  data: userTypes,
  db: any,
  table: string,
  secret: string
): Promise<any> {
  const findUser = await db(table)
    .where({ email: data.email })
    .first();

  if (findUser)
    return {
      ok: false,
      errors: [{ path: "user_exists", message: "Usuário já cadastrado!" }]
    }

  data.password = bcrypt.hashSync(data.password);

  try {
    const [{ id, name, email, telephone, avatar, active, role }] = await db(table)
      .insert(
        data,
        ["id", "name", "email", "telephone", "avatar", "active", "role"]
      );

    const user: userTypes = {
      id,
      name,
      email,
      telephone,
      avatar,
      active,
      role
    }

    const [token, refreshToken] = createTokens(
      user,
      secret
    );

    return {
      ok: true,
      user,
      token,
      refreshToken
    };
  } catch (err) {
    console.log(err);
    return {
      ok: false,
      errors: errors.internalError
    }
  }
}

/**
 * @description user login
 * @param email
 * @param password
 * @param db
 * @param table
 * @param secret
 */
export async function tryLogin(
  email: string,
  password: string,
  db: any,
  table: string,
  secret: string
) {
  const findUser = await db(table)
    .where({ email })
    .first();

  if (!findUser)
    return {
      ok: false,
      errors: errors.userNotFound
    }

  if (!findUser.active)
    return {
      ok: false,
      errors: errors.userInactive
    }

  const validPass = await bcrypt.compare(password, findUser.password);

  if (!validPass)
    return {
      ok: false,
      errors: errors.incorrectPassword
    }

  const [token, refreshToken] = await createTokens(findUser, secret);

  return {
    ok: true,
    user: findUser,
    token,
    refreshToken
  }
}
