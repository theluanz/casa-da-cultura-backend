import { Router } from 'express';
import { authMiddleware } from '@shared/middleares/authMiddleware';
import { CreateStudentController } from '@modules/students/useCases/CreateStudent/CreateStudentController';
import { ReadStudentController } from '@modules/students/useCases/ReadStudent/ReadStudentController';
import { ensureIsAdminMiddleware } from '@shared/middleares/ensureIsAdminMiddleware';
import { ReadStudentsController } from '@modules/students/useCases/ReadStudents/ReadStudentsController';
import { RemoveStudentController } from '@modules/students/useCases/RemoveStudent/RemoveStudentController';
import { UpdateStudentController } from '@modules/students/useCases/UpdateStudent/UpdateStudentController';

const studentsRoutes = Router();
const createStudentController = new CreateStudentController();
const readStudentController = new ReadStudentController();
const readStudentsController = new ReadStudentsController();
const removeStudentsController = new RemoveStudentController();
const updateStudentController = new UpdateStudentController();

studentsRoutes.post('/student', authMiddleware, createStudentController.handle);

studentsRoutes.get('/student/:id', authMiddleware, readStudentController.handle);

studentsRoutes.delete('/student/:id', authMiddleware, removeStudentsController.handle);

studentsRoutes.patch('/student/:id', authMiddleware, updateStudentController.handle);

studentsRoutes.get('/students', authMiddleware, readStudentsController.handle);

export { studentsRoutes };
