import "reflect-metadata";
import "dotenv/config";
import * as glob from "glob";
import * as path from "path";
import * as signale from "signale";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";

const main = async () => {
  await createConnection();

  const server = new GraphQLServer({
    resolvers: glob
      .sync(`${path.join(__dirname, "./modules")}/**/resolvers.?s`)
      .map((resolver: any) => require(resolver).resolvers),
    typeDefs: "./src/schema.graphql",
    context: request => ({
      ...request
    })
  });

  const app = await server.start(
    {
      port: process.env.PORT || 4000
    },
    () => signale.success("Server is running on http://localhost:4000")
  );

  return app;
};

main();
