import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, password, name, bornDate, cpf, role } = request.body;
    const createUserUseCase = new CreateUserUseCase();
    const newUser = await createUserUseCase.execute({ email, password, name, bornDate, cpf, role });
    return response.status(201).json(newUser);
  }
}

export { CreateUserController };
