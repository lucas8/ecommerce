import { writeFile, readFileSync } from "fs";
import { join } from "path";
import { sync } from "glob";
import { mergeTypes } from "merge-graphql-schemas";

const pathToModules: string = join(__dirname, "../modules");
const graphqlTypes: string[] = sync(`${pathToModules}/**/*.graphql`).map(x =>
  readFileSync(x, { encoding: "utf8" })
);

writeFile("dist/schema.graphql", mergeTypes(graphqlTypes), e => {
  console.log(e);
});
