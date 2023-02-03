import { Request, Response } from 'express';
import { CreateStudentUseCase } from './CreateStudentUseCase';

class CreateStudentController {
  async handle(request: Request, response: Response) {
    const { bornDate, cpf, name, period, fatherName, motherName } = request.body;
    
    const createStudentUseCase = new CreateStudentUseCase();

    const newStudent = await createStudentUseCase.execute({
      bornDate,
      cpf,
      name,
      period,
      fatherName,
      motherName,
    });
    return response.status(201).json(newStudent);
  }
}

export { CreateStudentController };
