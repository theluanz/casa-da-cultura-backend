import { CreateClassController } from '@modules/classes/useCases/CreateClass/CreateClassController';
import { authMiddleware } from '@shared/middleares/authMiddleware';
import { ensureIsAdminMiddleware } from '@shared/middleares/ensureIsAdminMiddleware';
import { Router } from 'express';

const createClassController = new CreateClassController();

const classesRoutes = Router();
classesRoutes.post('/class', authMiddleware, ensureIsAdminMiddleware, createClassController.handle);

export { classesRoutes };
