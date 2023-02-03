import { Router } from 'express';
import { workshopsRoutes } from './workshop.routes';
import { accountsRoutes } from './accounts.routes';
import { studentsRoutes } from './students.routes';

const router = Router();

router.use(workshopsRoutes);
router.use(accountsRoutes);
router.use(studentsRoutes);

export { router };
