import swaggerUi from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import swaggerDocument from '../swagger.json';
import userRouter from './routes/userRoutes';

class App {
  public app;
  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    this.app.use(cors());
    const accessControl = (
      _req: Request,
      res: Response,
      next: NextFunction
    ) => {
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());

    this.app.get('/', (_req: Request, res: Response) => {
      res.status(200).json({ message: 'Aplicação funcionando' });
    });
    this.app.use('/users', userRouter);
    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(
      `Aplicação rodando na porta ${PORT}`,
    ));
  }
}

export { App };

export const { app } = new App();