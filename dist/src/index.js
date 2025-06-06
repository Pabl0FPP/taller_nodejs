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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const fs_1 = require("fs");
const path_1 = require("path");
const routes_1 = require("./routes");
const connection_DB_1 = require("./lib/connection_DB");
const initial_Setup_1 = require("./lib/initial_Setup");
const resolvers_1 = require("./graphql/resolvers");
const auth_service_1 = require("./services/auth.service");
const graphql_1 = require("graphql");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const typeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'graphql', 'schema.graphql'), 'utf-8');
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs,
            resolvers: resolvers_1.resolvers,
            formatError: (error) => {
                var _a;
                // Devuelve solo el mensaje de error al cliente
                return new graphql_1.GraphQLError(error.message, {
                    extensions: {
                        code: ((_a = error.extensions) === null || _a === void 0 ? void 0 : _a.code) || 'INTERNAL_SERVER_ERROR',
                    },
                });
            },
        });
        yield server.start();
        yield (0, initial_Setup_1.createRoles)();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        // Rutas REST
        app.use('/user', routes_1.userRouter);
        app.use('/auth', routes_1.authRouter);
        app.use('/container', routes_1.containerRouter);
        app.use('/fragance', routes_1.fraganceRouter);
        app.use('/candle', routes_1.candleRouter);
        app.use('/cart', routes_1.shopcartRouter);
        // GraphQL middleware 
        const graphqlMiddleware = (0, express4_1.expressMiddleware)(server, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                var _b;
                const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', '');
                if (!token)
                    return { user: null };
                try {
                    const user = yield auth_service_1.authService.verifyToken(token);
                    return { user };
                }
                catch (_c) {
                    return { user: null };
                }
            })
        });
        app.use('/graphql', graphqlMiddleware);
        yield connection_DB_1.db;
        app.listen(port, () => {
            console.log(`🚀 Server ready at http://localhost:${port}`);
            console.log(`📈 GraphQL endpoint: http://localhost:${port}/graphql`);
        });
    });
}
startServer().catch(console.error);
exports.default = app;
