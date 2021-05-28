import express, { Request, Response, NextFunction, Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';
import createError from 'http-errors';
import cors from 'cors';
import config from '../config';

// Our Express-Apollo-Server is getting started here (:

export default async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: resolvers as any,
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app });

  app.use('/', (req: Request, res: Response) => {
    res.send('Express Apollo Server is Ready');
  });

  // Express Bodyparser - Our code gets transformed into JSON
  app.use(express.json());

  // Cross-Origin Resource Sharing - As the name already says we are sharing our resources with the front-end
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

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

  app.listen(port, () =>
    console.log(`Server is ready at http://localhost:${port}`)
  );
};
