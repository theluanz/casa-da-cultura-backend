import { CreateClassController } from '@modules/classes/useCases/CreateClass/CreateClassController';
import { ReadClassController } from '@modules/classes/useCases/ReadClass/ReadClassController';
import { UpdateClassController } from '@modules/classes/useCases/UpdateClass/UpdateClassController';
import { authMiddleware } from '@shared/middleares/authMiddleware';
import { ensureIsAdminMiddleware } from '@shared/middleares/ensureIsAdminMiddleware';
import { Router } from 'express';

const createClassController = new CreateClassController();
const readClassController = new ReadClassController();
const updateClassController = new UpdateClassController();

const classesRoutes = Router();

classesRoutes.post('/class', authMiddleware, ensureIsAdminMiddleware, createClassController.handle);

classesRoutes.get('/class/:id', authMiddleware, ensureIsAdminMiddleware, readClassController.handle);

classesRoutes.delete('/class/:id', authMiddleware, ensureIsAdminMiddleware, readClassController.handle);

classesRoutes.patch('/class/:id', authMiddleware, ensureIsAdminMiddleware, updateClassController.handle);

export { classesRoutes };
