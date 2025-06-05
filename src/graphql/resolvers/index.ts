import { userResolvers } from './user.resolvers';
import { candleResolvers } from './candle.resolvers';
import { containerResolvers } from './container.resolvers';
import { fraganceResolvers } from './fragance.resolvers';
export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...candleResolvers.Query,
    ...containerResolvers.Query,
    ...fraganceResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...candleResolvers.Mutation,
    ...containerResolvers.Mutation,
    ...fraganceResolvers.Mutation,
  },
};