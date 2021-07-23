import express, { Request, Response, NextFunction, Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';
import createError from 'http-errors';
import cors from 'cors';
import config from '../config';
import ws from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { execute, subscribe } from 'graphql';
import { verifyAccessTokenWS } from '../services/auth';

const atob = require('atob');

// Our Express-Apollo-Server is getting started here (:

export default async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: resolvers as any,
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  // Cross-Origin Resource Sharing - As the name already says we are sharing our resources with the front-end
  const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  apolloServer.applyMiddleware({ app: app, cors: corsOption });

  app.use('/', (req: Request, res: Response) => {
    res.send('Express Apollo Server is Ready');
  });

  // Express Bodyparser - Our code gets transformed into JSON
  app.use(express.json());

  app.use(cors(corsOption));

  //Error Handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createError.NotFound());
  });

  app.use(
    (
      err: { status: number; message: string },
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      res.status(err.status || 500);
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    }
  );

  const port = config.port;

  const server = app.listen(4000, () => {
    const wsServer = new ws.Server({
      server: server,
      path: '/graphql',
    });

    useServer(
      {
        onConnect: async (ctx) => {
          const token = await ctx.connectionParams?.authorization;
          const accessToken = await atob(token);
          if (
            !(await verifyAccessTokenWS(
              ctx.extra.request,
              (await accessToken) as string
            ))
          ) {
            return false;
          }
        },

        context: ({ extra }) => ({ req: extra.request }),
        schema: typeDefs,
        roots: resolvers,
        // execute,
        subscribe,
      },
      wsServer
    );

    console.log(`Server is ready at http://localhost:${port}`);
  });
};
