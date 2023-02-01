import { Router } from 'express';
import { CreateWorkshopController } from '../../../modules/workshops/useCases/CreateWorkshop/CreateWorkshopController';
import { authMiddleware } from '@shared/middleares/authMiddleware';

const workshopsRoutes = Router();

const createWorkshopController = new CreateWorkshopController();

workshopsRoutes.post('/workshop', createWorkshopController.handle);
workshopsRoutes.get('/workshop',authMiddleware, createWorkshopController.hi);

export { workshopsRoutes };
