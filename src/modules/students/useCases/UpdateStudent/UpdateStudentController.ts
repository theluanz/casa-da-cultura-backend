import { Request, Response } from 'express';
import { UpdateStudentUseCase } from './UpdateStudentUseCase';

class UpdateStudentController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { active, bornDate, cpf, fatherName, motherName, name, period } = request.body;
    const updateStudentUseCase = new UpdateStudentUseCase();

    const student = await updateStudentUseCase.execute({
      id,
      active,
      bornDate,
      cpf,
      fatherName,
      motherName,
      name,
      period,
    });

    return response.status(201).json(student);
  }
}

export { UpdateStudentController };
