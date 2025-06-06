"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_resolvers_1 = require("./user.resolvers");
const candle_resolvers_1 = require("./candle.resolvers");
const container_resolvers_1 = require("./container.resolvers");
const fragance_resolvers_1 = require("./fragance.resolvers");
exports.resolvers = {
    Query: Object.assign(Object.assign(Object.assign(Object.assign({}, user_resolvers_1.userResolvers.Query), candle_resolvers_1.candleResolvers.Query), container_resolvers_1.containerResolvers.Query), fragance_resolvers_1.fraganceResolvers.Query),
    Mutation: Object.assign(Object.assign(Object.assign(Object.assign({}, user_resolvers_1.userResolvers.Mutation), candle_resolvers_1.candleResolvers.Mutation), container_resolvers_1.containerResolvers.Mutation), fragance_resolvers_1.fraganceResolvers.Mutation),
};
