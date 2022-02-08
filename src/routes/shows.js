import express from 'express';
import { showController } from '../controllers/index.js';

const router = express.Router();

router.post('/', showController.create);

router.get('/', showController.getAll);

router.get('/:id', showController.getOne);

// router.put('/:id', showController.editOne);

// router.delete('/:id', showController.deleteOne);

export default router;
