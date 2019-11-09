"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const signale = require("signale");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const graphql_yoga_1 = require("graphql-yoga");
const genSchema_1 = require("./utils/genSchema");
const refreshRoute_1 = require("./routes/refreshRoute");
const createTypeormConn_1 = require("./utils/createTypeormConn");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield createTypeormConn_1.createTypeormConn();
    const server = new graphql_yoga_1.GraphQLServer({
        schema: genSchema_1.genSchema(),
        context: request => (Object.assign({}, request))
    });
    server.express.use(cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    }));
    server.express.use(cookieParser());
    server.express.use(bodyParser.urlencoded({ extended: false }));
    server.express.use(bodyParser.json());
    server.express.post("/refresh_token", refreshRoute_1.RefreshRoute);
    const app = yield server.start({
        port: process.env.PORT || 4000,
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL
        }
    }, () => signale.success("Server is running on http://localhost:4000"));
    return app;
});
main();
//# sourceMappingURL=index.js.map