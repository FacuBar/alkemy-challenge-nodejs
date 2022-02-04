module.exports = (err, req, res, next) => {
  let statusCode;
  let errMessage;
  switch (err.name) {
    case 'SequelizeForeignKeyConstraintError':
      statusCode = 400;
      errMessage = `some of the ids provided doesn't corresponds to an existent object`;
      break;

    default:
      statusCode = 500;
      errMessage = 'internal server error, something went wrong';
      break;
  }
  res.status(statusCode).json({ error: errMessage });
};
