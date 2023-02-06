import { CreateClassController } from '@modules/classes/useCases/CreateClass/CreateClassController';
import { ReadClassController } from '@modules/classes/useCases/ReadClass/ReadClassController';
import { ReadClassesWeekController } from '@modules/classes/useCases/ReadClassesWeek/ReadClassesWeekController';
import { UpdateClassController } from '@modules/classes/useCases/UpdateClass/UpdateClassController';
import { authMiddleware } from '@shared/middleares/authMiddleware';
import { ensureIsAdminMiddleware } from '@shared/middleares/ensureIsAdminMiddleware';
import { Router } from 'express';

const createClassController = new CreateClassController();
const readClassController = new ReadClassController();
const updateClassController = new UpdateClassController();
const readClassesWeekController = new ReadClassesWeekController();

const classesRoutes = Router();

classesRoutes.get(
  '/class',
  authMiddleware,
  ensureIsAdminMiddleware,
  readClassesWeekController.handle,
);

classesRoutes.post('/class', authMiddleware, ensureIsAdminMiddleware, createClassController.handle);

classesRoutes.get(
  '/class/:id',
  authMiddleware,
  ensureIsAdminMiddleware,
  readClassController.handle,
);

classesRoutes.delete(
  '/class/:id',
  authMiddleware,
  ensureIsAdminMiddleware,
  readClassController.handle,
);

classesRoutes.patch(
  '/class/:id',
  authMiddleware,
  ensureIsAdminMiddleware,
  updateClassController.handle,
);

export { classesRoutes };
