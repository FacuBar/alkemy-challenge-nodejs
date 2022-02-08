import { newCharacter } from '../domain/index.js';

export default function buildNewCharacterController(repo) {
  return Object.freeze({
    create,
    getAll,
    getOne,
  });

  async function create(req, res) {
    try {
      const character = newCharacter(req.body);
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

  async function getOne(req, res) {
    try {
      const character = await repo.getOne(req.params.id);
      res.json({ data: character });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
