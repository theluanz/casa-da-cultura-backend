import { Request, Response } from 'express';
import { RemoveClassUseCase } from './RemoveClassUseCase';

class RemoveClassController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const removeClassUseCase = new RemoveClassUseCase();

    await removeClassUseCase.execute(id);

    return response.json({ message: 'Turma removida com sucesso' });
  }
}

export { RemoveClassController };
