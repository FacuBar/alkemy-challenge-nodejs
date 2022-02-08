import { newShow } from '../domain/index.js';

export default function buildNewShowController(repo) {
  return Object.freeze({
    create,
    getAll,
    getOne,
    editOne,
    deleteOne,
  });

  async function create(req, res) {
    try {
      const show = newShow(req.body);
      const result = await repo.create(show);
      res.json({ data: result });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async function getAll(req, res) {
    try {
      const result = await repo.getAll(req.query);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async function getOne(req, res) {
    try {
      const result = await repo.getOne(req.params.id);
      res.json({ data: result });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async function editOne(req, res) {}

  async function deleteOne(req, res) {}
}
