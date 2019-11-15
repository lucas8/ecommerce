import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as path from "path";
import * as fs from "fs";
import { makeExecutableSchema } from "graphql-tools";
import * as glob from "glob";

export const genSchema = () => {
  const pathToModules: string = path.join(__dirname, "../modules");
  const graphqlTypes: string[] = glob
    .sync(`${pathToModules}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: "utf8" }));

  const resolvers: any[] = glob
    .sync(`${pathToModules}/**/resolvers.?s`)
    .map(resolver => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs:
      process.env.NODE_ENV === "production"
        ? fs.readFileSync("dist/schema.graphql", {
            encoding: "utf8"
          })
        : mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers)
  });
};
