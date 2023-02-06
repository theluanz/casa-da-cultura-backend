import { Request, Response } from 'express';
import { ReadClassUseCase } from './ReadClassUseCase';

class ReadClassController {
  async handle(request: Request, response: Response) {
    const {id } = request.params
    const readClassUseCase = new ReadClassUseCase();

    const specificClass = await readClassUseCase.execute(id);

    return response.json(specificClass);
  }
}

export { ReadClassController };
