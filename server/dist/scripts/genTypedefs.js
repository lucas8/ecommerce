"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const glob_1 = require("glob");
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const pathToModules = path_1.join(__dirname, "../modules");
const graphqlTypes = glob_1.sync(`${pathToModules}/**/*.graphql`).map(x => fs_1.readFileSync(x, { encoding: "utf8" }));
fs_1.writeFile("dist/schema.graphql", merge_graphql_schemas_1.mergeTypes(graphqlTypes), e => {
    console.log(e);
});
//# sourceMappingURL=genTypedefs.js.map