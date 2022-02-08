import express from 'express';
import { genreController } from '../controllers/index.js';

const router = express.Router();

router.post('/', genreController.create);

router.get('/', genreController.getAll);

export default router;
