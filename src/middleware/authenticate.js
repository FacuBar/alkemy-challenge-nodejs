const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.statusCode = 400;
    res.json({ error: 'no authorization header provided' });
    return;
  }

  if (authHeader.split(' ')[0] !== 'Bearer') {
    res.statusCode = 400;
    res.json({
      error: 'authorization header should follow the pattern: Bearer {token}',
    });
  }

  try {
    const payload = jwt.verify(authHeader.split(' ')[1], process.env.JWT_KEY);
    req.currentUser = payload;
  } catch (err) {}

  if (!req.currentUser) {
    res.statusCode = 401;
    res.json({ error: 'unauthorized' });
    return;
  }
  next();
}

module.exports = authenticate;
