import { mergeTypeDefs } from "@graphql-tools/merge";

import users from "./users.schema";

const types: any = [
  users
];

export default mergeTypeDefs(types);
