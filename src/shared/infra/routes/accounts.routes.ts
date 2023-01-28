import { Router } from 'express';
import { CreateUserController } from '../../../modules/accounts/useCases/CreateUser/CreateUserController';

const accountsRoutes = Router();

const createUserController = new CreateUserController();

accountsRoutes.post('/account', createUserController.handle);


export { accountsRoutes };