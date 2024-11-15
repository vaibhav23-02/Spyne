import express from 'express';
import * as carController from '../controllers/carController.js';
import auth from '../middleware/auth.js';
import { upload } from '../utils/cloudinaryConfig.js';

const router = express.Router();

// Allow up to 10 images
router.post('/', auth, upload.array('images', 10), carController.createCar);
router.get('/', auth, carController.getCars);
router.get('/:id', auth, carController.getCar);
router.put('/:id', auth, upload.array('images', 10), carController.updateCar);
router.delete('/:id', auth, carController.deleteCar);

export default router;