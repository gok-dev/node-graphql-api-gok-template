require('dotenv').config();
import * as http from "http";
import * as express from "express";
import * as cors from "cors";
import * as axios from "axios";
import { ApolloServer } from "apollo-server-express";
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

// Database
import db from "./database/connection";
import tables from "./database/tables";

// GraphQL
import typeDefs from "./schema";
import resolvers from "./resolvers";

// Auth Middleware
import verifyClientAuth from "./utils/auth";

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 4000;
const secret = process.env.SECRET || "dev@Secret";

const io = require("socket.io")(httpServer);
io.origins('*:*');

// Rest Api
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS"
  );

  app.use(cors());
  next();
});

// Routes Rest
const routes = express.Router();
routes.get('/', (req: void, res: any) => res.status(200).json({ status: 'API ONLINE' }));

app.use(routes);
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

// Context GraphQL
export const context = async (request: any) => {
  return {
    ...request,
    io,
    db,
    tables,
    axios,
    secret,
    verifyClientAuth
  };
};

const server: any = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context,
  playground: process.env.NODE_ENV !== "production" ? true : false,
});

server.applyMiddleware({ app });
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 API GraphQL rodando em: http://localhost:${PORT}/graphql`);
  console.log(`🚀 API Rest rodando em: http://localhost:${PORT}`);
});
