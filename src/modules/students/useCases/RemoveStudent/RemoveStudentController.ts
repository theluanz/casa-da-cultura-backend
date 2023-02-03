import { Request, Response } from 'express';
import { RemoveStudentUseCase } from './RemoveStudentUseCase';

class RemoveStudentController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { cpf } = request.body;
    const removeStudentUseCase = new RemoveStudentUseCase();

    await removeStudentUseCase.execute(id, cpf);

    return response.status(201).json({ status: 'Usuário removido com sucesso' });
  }
}

export { RemoveStudentController };
