import { Request, Response } from 'express';
import { UpdateStudentUseCase } from './UpdateStudentUseCase';

class UpdateStudentController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { active, bornDate, address, cpf, name, period, parent, phone, rg, schooling } =
      request.body;
    const updateStudentUseCase = new UpdateStudentUseCase();

    const student = await updateStudentUseCase.execute({
      id,
      active,
      bornDate,
      address,
      cpf,
      name,
      period,
      parent,
      phone,
      rg,
      schooling,
    });

    return response.status(201).json(student);
  }
}

export { UpdateStudentController };
