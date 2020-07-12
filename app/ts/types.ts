/**
 * Users Types
 */
export type userTypes = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  telephone?: string;
  avatar?: string;
  active?: boolean;
  role?: string;
}

export type tablesTypes = {
  users: string;
}

/**
 * Context Type
 */
export type contextTypes = {
  req: any;
  io: any;
  db: any;
  tables: tablesTypes;
  axios: any;
  secret: string;
  verifyClientAuth: any;
}

export type sortTypes = {
  field: object;
  order: object;
}
