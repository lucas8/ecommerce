import "reflect-metadata";
import "dotenv/config";
import * as signale from "signale";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import { genSchema } from "./utils/genSchema";
import { RefreshRoute } from "./routes/refreshRoute";

const main = async () => {
  await createConnection();

  const server: GraphQLServer = new GraphQLServer({
    schema: genSchema() as any,
    context: request => ({
      ...request
    })
  });

  server.express.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    })
  );
  server.express.use(cookieParser());
  server.express.use(bodyParser.urlencoded({ extended: false }));
  server.express.use(bodyParser.json());

  // Express routes
  server.express.post("/refresh_token", RefreshRoute);

  const app = await server.start(
    {
      port: process.env.PORT || 4000
    },
    () => signale.success("Server is running on http://localhost:4000")
  );

  return app;
};

main();
