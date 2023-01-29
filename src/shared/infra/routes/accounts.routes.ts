import { Router } from 'express';
import { CreateUserController } from '../../../modules/accounts/useCases/CreateUser/CreateUserController';
import { AuthenticateController } from '@modules/accounts/useCases/Authenticate/AuthenticateController';
import { ValidateJWTController } from '@modules/accounts/useCases/ValidateJWT/ValidateJWTController';
import { authMiddleware } from '@shared/middleares/authMiddleware';
import { ensureIsAdminMiddleware } from '@shared/middleares/ensureIsAdminMiddleware';
import { RemoveUserController } from '@modules/accounts/useCases/RemoveUser/RemoveUserController';

const accountsRoutes = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateController();
const validateJWTController = new ValidateJWTController();
const removeUserController = new RemoveUserController();

accountsRoutes.post('/account', createUserController.handle);
accountsRoutes.delete(
  '/account/:id',
  authMiddleware,
  ensureIsAdminMiddleware,
  removeUserController.handle,
);

accountsRoutes.post('/auth', authenticateController.handle);
accountsRoutes.get('/auth', authMiddleware, validateJWTController.handle);

export { accountsRoutes };
