import express from 'express';
import { characterController } from '../controllers/index.js';

const router = express.Router();

router.post('/', characterController.create);

router.get('/', characterController.getAll);

router.get('/:id', characterController.getOne);

// router.put('/characters/:id', characterController.edit);
//
// router.delete('/:id', characterController.deleteOne);

export default router;
