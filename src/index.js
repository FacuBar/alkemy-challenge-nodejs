require('dotenv').config();

const express = require('express');

const sequelize = require('./clients/sequelize');
const userRouter = require('./routes/user');
const charactersRouter = require('./routes/characters');
const showsRouter = require('./routes/shows');
const swaggerRouter = require('./routes/swagger');
const authMiddleware = require('./middleware/authenticate');
const errorController = require('./utils/errorController');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// docs
app.use(swaggerRouter);

app.use('/users', userRouter);
// applying authentication for the following endpoints.
app.use(authMiddleware);
app.use('/characters', charactersRouter);
app.use('/movies', showsRouter);

app.all('/*', (_, res) => {
  res.status(404).json({ error: 'endpoint not found' });
});
// catching errors
app.use(errorController);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('database connection succesful');
  } catch (err) {
    console.log(`db connection error: ${err}`);
    process.exit(1);
  }

  await sequelize.sync();

  const PORT = process.env.PORT ? process.env.PORT : 8080;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  start();
}

module.exports = app;
