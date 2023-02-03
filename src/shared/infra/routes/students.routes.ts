import { Router } from 'express';
import { authMiddleware } from '@shared/middleares/authMiddleware';
import { CreateStudentController } from '@modules/students/useCases/CreateStudent/CreateStudentController';
import { ReadStudentController } from '@modules/students/useCases/ReadStudent/ReadStudentController';
import { ensureIsAdminMiddleware } from '@shared/middleares/ensureIsAdminMiddleware';
import { ReadStudentsController } from '@modules/students/useCases/ReadStudents/ReadStudentsController';
import { RemoveStudentController } from '@modules/students/useCases/RemoveStudent/RemoveStudentController';
import { UpdateStudentController } from '@modules/students/useCases/UpdateStudent/UpdateStudentController';

const workshopsRoutes = Router();
const createStudentController = new CreateStudentController();
const readStudentController = new ReadStudentController();
const readStudentsController = new ReadStudentsController();
const removeStudentsController = new RemoveStudentController();
const updateStudentController = new UpdateStudentController();

workshopsRoutes.post(
  '/student',
  authMiddleware,
  ensureIsAdminMiddleware,
  createStudentController.handle,
);

workshopsRoutes.get('/student/:id', authMiddleware, readStudentController.handle);

workshopsRoutes.delete('/student/:id', authMiddleware, removeStudentsController.handle);

workshopsRoutes.patch('/student/:id', authMiddleware, updateStudentController.handle);

workshopsRoutes.get('/students', authMiddleware, readStudentsController.handle);

export { workshopsRoutes };
