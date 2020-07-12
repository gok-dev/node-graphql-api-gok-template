import { mergeResolvers } from "@graphql-tools/merge";

import users from "./users.resolver";

const resolvers: any = [
  users
];

export default mergeResolvers(resolvers);
