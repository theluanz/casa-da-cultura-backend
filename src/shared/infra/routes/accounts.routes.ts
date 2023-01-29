import { Router } from 'express';
import { CreateUserController } from '../../../modules/accounts/useCases/CreateUser/CreateUserController';
import { AuthenticateController } from '@modules/accounts/useCases/Authenticate/AuthenticateController';
import { ValidateJWTController } from '@modules/accounts/useCases/ValidateJWT/ValidateJWTController';
import { authMiddleware } from '@shared/middleares/authMiddleware';

const accountsRoutes = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateController();
const validateJWTController = new ValidateJWTController();

accountsRoutes.post('/account', createUserController.handle);
accountsRoutes.post('/auth', authenticateController.handle);
accountsRoutes.get('/auth', authMiddleware, validateJWTController.handle);

export { accountsRoutes };
