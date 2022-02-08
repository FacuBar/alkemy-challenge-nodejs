import { newUser } from '../domain/index.js';

export default function buildNewUserController(repo, jwt) {
  return Object.freeze({
    register,
    login,
  });

  async function register(req, res) {
    try {
      const user = newUser(req.body);
      const result = await repo.create(user);
      const token = await jwt.sign(result.dataValues);
      res.json({ token });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async function login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await repo.findByEmail(email);
      const validPass = await user.validatePassword(password);
      if (!validPass) return res.status(400).json({});

      delete user.dataValues.password;
      const token = jwt.sign(user.dataValues);
      res.json({ token });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
