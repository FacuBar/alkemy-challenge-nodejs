import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import docRouter from './routes/swagger.js';
import userRouter from './routes/user.js';
import showRouter from './routes/shows.js';
import characterRouter from './routes/character.js';
import genreRouter from './routes/genre.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', docRouter);
app.use('/users', userRouter);
app.use('/characters', characterRouter);
app.use('/shows', showRouter);
app.use('/genres', genreRouter);

app.all('/*', (_, res) => {
  res.status(404).json({ error: 'endpoint not found' });
});

const start = async () => {
  const PORT = process.env.PORT ? process.env.PORT : 8080;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  start();
}

export default app;
