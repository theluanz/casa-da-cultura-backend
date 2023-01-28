import { Router } from 'express';
import { CreateWorkshopController } from '../../../modules/workshops/useCases/CreateWorkshop/CreateWorkshopController';

const workshopsRoutes = Router();

const createWorkshopController = new CreateWorkshopController();

workshopsRoutes.post('/workshop', createWorkshopController.handle);
workshopsRoutes.get('/workshop', createWorkshopController.hi);

export { workshopsRoutes };
