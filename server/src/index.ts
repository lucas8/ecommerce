import "reflect-metadata";
import "dotenv/config";
import * as signale from "signale";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { GraphQLServer } from "graphql-yoga";
import { genSchema } from "./utils/genSchema";
import { RefreshRoute } from "./routes/refreshRoute";
import { GraphQLSchema } from "graphql";
import { createTypeormConn } from "./utils/createTypeormConn";
import { Context } from "./types/types";
import { getUserId } from "./utils/getUserId";
import { permissions } from "./utils/shieldRules";
import * as Stripe from "stripe";

const main = async () => {
  await createTypeormConn();

  const server: GraphQLServer = new GraphQLServer({
    schema: genSchema() as GraphQLSchema,
    middlewares: [permissions],
    context: (ctx: Context) => ({
      ...ctx,
      user: getUserId(ctx),
      stripe: new Stripe(process.env.STRIPE_PRIVATE as string)
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
      port: process.env.PORT || 4000,
      cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL
      }
    },
    () => signale.success("Server is running on http://localhost:4000")
  );

  return app;
};

main();
