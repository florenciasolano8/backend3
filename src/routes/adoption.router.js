import { Router } from 'express';
import { getAdoptionById, getAllAdoptions, createAdoption } from '../controllers/adoptions.controller.js';

const router = Router();

router.get('/', getAllAdoptions);

router.get('/:aid', getAdoptionById);

router.post('/:uid/:pid', createAdoption);

export default router;
