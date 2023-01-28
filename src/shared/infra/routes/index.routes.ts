import { Router } from 'express';
import { workshopsRoutes } from './workshop.routes';

const router = Router();

router.use(workshopsRoutes);

export { router };
