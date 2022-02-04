const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const sequelize = require('../clients/sequelize');
const { Show } = sequelize.models;
const asyncWrapper = require('../utils/asyncWrapper');

module.exports.create = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, release_date, calification, image } = req.body;

  const show = Show.build({
    title,
    releaseDate: release_date,
    calification,
    image,
  });
  await show.save();
  show.setDataValue('characters', []);

  res.status(200).json(show);
});

module.exports.getAll = asyncWrapper(async (req, res, next) => {
  let queryShows = {};
  let sortShows = 'DESC';
  let queryGenres = {};
  let genreRequired = false;

  if (req.query.title) {
    queryShows = { title: { [Op.like]: `%${req.query.title}%` } };
  }
  if (req.query.genres) {
    genreRequired = true;
    if (Array.isArray(req.query.genres)) {
      queryGenres = { id: { [Op.in]: req.query.genres } };
    } else {
      queryGenres = { id: req.query.genres };
    }
  }
  if (req.query.order === 'ASC') {
    sortShows = 'ASC';
  }

  const shows = await Show.findAll({
    attributes: ['image', 'title', 'release_date'],
    where: queryShows,
    order: [['release_date', sortShows]],
    include: {
      where: queryGenres,
      association: 'Genres',
      attributes: [],
      through: { attributes: [] },
      required: genreRequired,
    },
  });

  res.status(200).json(shows);
});

module.exports.fetch = asyncWrapper(async (req, res, next) => {
  const show = await Show.findByPk(req.params.movie_id, {
    include: {
      association: 'Characters',
      through: { attributes: [] },
      attributes: ['id', 'image', 'name'],
      as: 'characters',
    },
  });

  if (!show) {
    res.status(404).json({
      error: `movie with id ${req.params.movie_id} not found`,
    });
    return;
  }

  req.show = show;
  next();
});

module.exports.getOne = asyncWrapper(async (req, res, next) => {
  const show = req.show;

  res.json(show);
});

module.exports.edit = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const body = req.body;
  const show = req.show;

  if (body.title) {
    show.title = body.title;
  }
  if (body.calification) {
    show.calification = body.calification;
  }
  if (body.release_date) {
    show.release_date = body.release_date;
  }
  if (body.genres) {
    show.addGenres(genres);
  }
  if (body.characters) {
    show.addCharacters(body.characters);
  }

  await show.save();

  res.status(200).json(show);
});

module.exports.deleteOne = asyncWrapper(async (req, res, next) => {
  const show = req.show;

  await show.destroy();
  res.status(204).json({});
});
