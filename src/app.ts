import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import spec from './config/swagger';

const app = express();
app.use(cors());
app.use(express.json());


// import the router from the file
import booksRouter from './routes/books';
import membersRouter from './routes/members';
import borrowsRouter from './routes/borrows';
import { sequelize, syncDatabase } from './config/database';
import errorHandler from './utils/errorHandler';

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));


// use the router on the app
app.use('/books', booksRouter);
app.use('/members', membersRouter);
app.use('/borrows', borrowsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
syncDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });