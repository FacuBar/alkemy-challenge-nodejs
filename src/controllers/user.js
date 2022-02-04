const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../clients/sequelize').models;
const mailer = require('../services/mailer');
const asyncWrapper = require('../utils/asyncWrapper');

module.exports.register = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const user = User.build({ email, password: encryptedPassword });
  try {
    await user.save();
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      res
        .status(400)
        .json({ error: 'an user already registered with that email' });
      return;
    } else {
      throw e;
    }
  }

  mailer.notify(email);

  const token = getJWT(user);
  res.status(200).json({ token });
});

module.exports.login = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(401).json({ error: 'invalid credentials' });
    return;
  }

  const isValid = bcrypt.compare(password, user.password);
  if (!isValid) {
    res.status(401).json({ error: 'invalid credentials' });
    return;
  }

  const token = getJWT(user);
  res.status(200).json({ token });
});

const getJWT = (user) => {
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    }
  );

  return userJwt;
};
