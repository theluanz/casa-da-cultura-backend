import { Request, Response } from 'express';
import { CreateStudentUseCase } from './CreateStudentUseCase';

class CreateStudentController {
  async handle(request: Request, response: Response) {
    const { bornDate, cpf, address, name, parent, period, rg, phone } = request.body;

    const createStudentUseCase = new CreateStudentUseCase();

    const newStudent = await createStudentUseCase.execute({
      bornDate,
      cpf,
      address,
      name,
      parent,
      period,
      rg,
      phone,
    });
    return response.status(201).json(newStudent);
  }
}

export { CreateStudentController };
