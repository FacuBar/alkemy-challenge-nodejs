const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const sequelize = require('../clients/sequelize');
const asyncWrapper = require('../utils/asyncWrapper');
const { Character } = sequelize.models;

module.exports.create = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { image, name, age, weight, history, movies } = req.body;

  const char = Character.build({ image, name, age, weight, history });
  await char.save();

  try {
    await char.addShows(movies);
  } catch (err) {
    if (err.name == 'SequelizeForeignKeyConstraintError') {
      await char.destroy();
      res.status(400).json({
        errors: [
          {
            msg: 'some of the movies id are invalid',
            param: 'movies',
            location: 'body',
          },
        ],
      });
      return;
    } else {
      throw err;
    }
  }

  const shows = await char.getShows({
    attributes: ['id', 'image', 'title'],
    joinTableAttributes: [],
  });
  char.setDataValue('movies', shows);

  res.status(200).json(char);
});

module.exports.getAll = asyncWrapper(async (req, res, next) => {
  let queryCharacters = [];
  let queryShows = {};
  let showRequired = false;

  if (req.query.name) {
    queryCharacters.push({ name: { [Op.like]: `%${req.query.name}%` } });
  }
  if (req.query.age) {
    queryCharacters.push({ age: req.query.age });
  }
  if (req.query.movies) {
    showRequired = true;
    if (Array.isArray(req.query.movies)) {
      queryShows = { id: { [Op.in]: req.query.movies } };
    } else {
      queryShows = { id: req.query.movies };
    }
  }

  const characters = await Character.findAll({
    attributes: ['image', 'name'],
    where: {
      [Op.and]: queryCharacters,
    },
    include: {
      where: queryShows,
      association: 'Shows',
      attributes: [],
      through: { attributes: [] },
      required: showRequired,
    },
  });

  res.status(200).json(characters);
});

module.exports.fetch = asyncWrapper(async (req, res, next) => {
  const char = await Character.findByPk(req.params.character_id, {
    include: {
      association: 'Shows',
      as: 'movies',
      through: { attributes: [] },
      attributes: ['id', 'image', 'title'],
    },
  });

  if (!char) {
    res.status(404).json({
      error: `character with id ${req.params.character_id} not found`,
    });
    return;
  }

  req.character = char;
  next();
});

module.exports.getOne = asyncWrapper(async (req, res, next) => {
  const char = req.character;
  res.json(char);
});

module.exports.edit = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const body = req.body;
  const char = req.character;

  if (body.image) {
    char.image = body.image;
  }
  if (body.name) {
    char.name = body.name;
  }
  if (body.age) {
    char.age = body.age;
  }
  if (body.weight) {
    char.weight = body.weight;
  }
  if (body.history) {
    char.history = body.history;
  }
  if (body.movies) {
    await char.addShows(body.movies);
  }

  await char.save();

  res.status(200).json(char);
});

module.exports.deleteOne = asyncWrapper(async (req, res, next) => {
  const char = req.character;

  await char.destroy();
  res.status(204).json({});
});
