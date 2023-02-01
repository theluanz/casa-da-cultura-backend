import { Request, Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;
    const { name, email, password, bornDate, cpf, role, active } = request.body;
    const updateUserUseCase = new UpdateUserUseCase();

    const user = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
      bornDate,
      cpf,
      role,
      active,
    }, request.userId);

    return response.status(201).json(user);
  }
}

export { UpdateUserController };
