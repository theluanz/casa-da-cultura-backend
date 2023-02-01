import { Request, Response } from 'express';
import { UpdateStudentUseCase } from '../UpdateStudent/UpdateStudentUseCase';

class RemoveStudentController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const updateStudentUseCase = new UpdateStudentUseCase();

    const student = await updateStudentUseCase.execute({ id });

    return response.status(201).json(student);
  }
}

export { RemoveStudentController };
