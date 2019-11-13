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
import { rule, shield, and } from "graphql-shield";
import { Context } from "./types/types";
import { getUserId } from "./utils/getUserId";
import { User } from "./entity/User";

const main = async () => {
  await createTypeormConn();

  // Rules
  const isAuthenticated = rule()(async (_, __, ctx: Context, ___) => {
    return ctx.user !== undefined;
  });

  const hasConfirmedEmail = rule()(async (_, __, ctx: Context, ___) => {
    const { user: userId } = ctx;

    if (!userId) {
      return false;
    }

    const user = await User.findOne({ id: userId as any });
    if (!user) {
      return false;
    }

    if (user.confirmed) {
      return true;
    }

    return false;
  });

  const permissions = shield({
    Query: {
      me: isAuthenticated
    },
    Mutation: {
      logout: isAuthenticated,
      newPost: and(isAuthenticated, hasConfirmedEmail),
      purchase: and(isAuthenticated, hasConfirmedEmail)
    }
  });

  const server: GraphQLServer = new GraphQLServer({
    schema: genSchema() as GraphQLSchema,
    middlewares: [permissions],
    context: (ctx: Context) => ({
      ...ctx,
      user: getUserId(ctx)
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
