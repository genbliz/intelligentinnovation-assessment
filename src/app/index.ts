import 'reflect-metadata';
import express from 'express';
import { envConfig } from './config/env';
import { InversifyExpressServer } from 'inversify-express-utils';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import methodOverride from 'method-override';
import container from './config/inversify.config';

const app = express();
const server = new InversifyExpressServer(container, null, null, app);

server.setConfig((app01) => {
  app01.use(express.json());
  app01.use(cors());
  app01.use(compression());
  app01.use(helmet());
  app01.use(express.json({ limit: '20mb' }));
  app01.use(
    express.urlencoded({
      extended: true,
      limit: '20mb'
    })
  );
  app01.use(
    express.json({
      type: 'application/vnd.api+json',
      limit: '20mb'
    })
  );
  app01.use(methodOverride());
  app01.disable('x-powered-by');
});

const serverInstance = server.build();
const PORT = envConfig.port;

serverInstance.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).send({
    message: `Route '${req.path}', NOT found...`,
    status: 'error'
  });
});

if (process.env.NODE_ENV !== 'test') {
  serverInstance.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}

export default app;
