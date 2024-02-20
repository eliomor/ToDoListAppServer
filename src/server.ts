import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { sequelize } from './config/sequelize';
import taskRoutes from './routes/task.routes';

const app: Express = express();
const PORT = 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!', error: err.message });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
