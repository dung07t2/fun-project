import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    context: ({ req }) => ({ session: req.session })
  });

  await createConnection();

  const app = express();

  app.use(
    session({
      secret: "asdjlfkaasdfkjlads",
      resave: false,
      saveUninitialized: false
    }),
  );

  server.applyMiddleware({ 
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000"
    }
  }); // app is from an existing express app

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at ${process.env.PORT || 4000}${server.graphqlPath}`)
  );
};

startServer();
