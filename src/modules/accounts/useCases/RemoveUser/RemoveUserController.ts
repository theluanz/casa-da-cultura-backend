import { Request, Response } from 'express';
import { RemoveUserUseCase } from './RemoveUserUseCase';

class RemoveUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const removeUserUseCase = new RemoveUserUseCase();

    await removeUserUseCase.execute(id);

    return response.status(201).json({status: 'Usuário removido com sucesso'});
  }
}

export { RemoveUserController };
