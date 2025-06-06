import express, { Express, RequestHandler } from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from 'fs';
import { join } from 'path';
import { userRouter, authRouter, containerRouter, fraganceRouter, candleRouter, shopcartRouter } from './routes';
import { db } from './lib/connection_DB';
import { createRoles } from './lib/initial_Setup';
import { resolvers } from './graphql/resolvers';
import { authService } from './services/auth.service';
import { GraphQLError } from 'graphql';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 3000;

const schemaPath = process.env.NODE_ENV === 'production'
  ? join(process.cwd(), 'src', 'graphql', 'schema.graphql')
  : join(__dirname, 'graphql', 'schema.graphql');

const typeDefs = readFileSync(schemaPath, 'utf-8');

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      // Devuelve solo el mensaje de error al cliente
      return new GraphQLError(error.message, {
        extensions: {
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
        },
      });
    },
  });

  await server.start();
  await createRoles();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rutas REST
  app.use('/user', userRouter);
  app.use('/auth', authRouter);
  app.use('/container', containerRouter);
  app.use('/fragance', fraganceRouter);
  app.use('/candle', candleRouter);
  app.use('/cart', shopcartRouter);

  // GraphQL middleware 
  const graphqlMiddleware: RequestHandler = expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) return { user: null };

      try {
        const user = await authService.verifyToken(token);
        return { user }; 
      } catch {
        return { user: null };
      }
    }
  }) as unknown as RequestHandler; 

  app.use('/graphql', graphqlMiddleware);

  await db;
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
    console.log(`📈 GraphQL endpoint: http://localhost:${port}/graphql`);
  });
}

startServer().catch(console.error);

export default app;
