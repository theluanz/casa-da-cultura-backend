import { CreateClassController } from '@modules/classes/useCases/CreateClass/CreateClassController';
import { ReadClassController } from '@modules/classes/useCases/ReadClass/ReadClassController';
import { authMiddleware } from '@shared/middleares/authMiddleware';
import { ensureIsAdminMiddleware } from '@shared/middleares/ensureIsAdminMiddleware';
import { Router } from 'express';

const createClassController = new CreateClassController();
const readClassController = new ReadClassController();

const classesRoutes = Router();

classesRoutes.post('/class', authMiddleware, ensureIsAdminMiddleware, createClassController.handle);

classesRoutes.get('/class/:id', authMiddleware, ensureIsAdminMiddleware, readClassController.handle);

export { classesRoutes };
