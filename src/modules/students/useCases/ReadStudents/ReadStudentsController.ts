import { Request, Response } from 'express';
import { ReadStudentsUseCase } from '../ReadStudents/ReadStudentsUseCase';

class ReadStudentsController {
  async handle(request: Request, response: Response) {
    const { p } = request.query;
    const readStudentsUseCase = new ReadStudentsUseCase();

    const students = await readStudentsUseCase.execute(Number(p));

    return response.status(201).json(students);
  }
}

export { ReadStudentsController };
