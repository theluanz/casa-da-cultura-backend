import { Router } from 'express';
import { workshopsRoutes } from './workshop.routes';
import { accountsRoutes } from './accounts.routes';

const router = Router();

router.use(workshopsRoutes);
router.use(accountsRoutes);

export { router };
