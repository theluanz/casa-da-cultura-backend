import { Request, Response } from 'express';
import { ReadStudentUseCase } from '../ReadStudent/ReadStudentUseCase';

class ReadStudentController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const readStudentUseCase = new ReadStudentUseCase();

    const student = await readStudentUseCase.execute(id);

    return response.status(201).json(student);
  }
}

export { ReadStudentController };
