import { newGenre } from '../domain/index.js';

export default function buildNewGenreController(repo) {
  return Object.freeze({
    create,
    getAll,
  });

  async function create(req, res) {
    try {
      const character = newGenre(req.body);
      const result = await repo.create(character);
      res.json({ data: result });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async function getAll(req, res) {
    try {
      console.log(req.query);
      const result = await repo.getAll(req.query);
      res.json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
