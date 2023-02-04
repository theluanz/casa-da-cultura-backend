import { Router } from 'express';
import { workshopsRoutes } from './workshop.routes';
import { accountsRoutes } from './accounts.routes';
import { studentsRoutes } from './students.routes';
import { classesRoutes } from './classes.routes';

const router = Router();

router.use(workshopsRoutes);
router.use(accountsRoutes);
router.use(studentsRoutes);
router.use(classesRoutes);

export { router };
