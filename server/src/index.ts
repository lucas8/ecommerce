import "reflect-metadata";
import "dotenv/config";
import * as signale from "signale";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { genSchema } from "./utils/genSchema";

const main = async () => {
  await createConnection();

  const server = new GraphQLServer({
    schema: genSchema() as any,
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
