import { prismaClient } from '@shared/database/prismaClient';
import { z } from 'zod';
import { AppError } from '@shared/errors/AppError';
import { ICreateStudentDTO } from '@modules/students/dtos/ICreateStudentDTO';

class CreateStudentUseCase {
  async execute({
    bornDate,
    cpf,
    name,
    period,
    fatherName,
    motherName,
  }: z.infer<typeof ICreateStudentDTO>) {
    const validateStudent = ICreateStudentDTO.safeParse({
      bornDate,
      cpf,
      name,
      period,
      fatherName,
      motherName,
    });

    if (!validateStudent.success) {
      throw new AppError(validateStudent.error.message, 400);
    }

    const student = await prismaClient.student.create({
      data: {
        bornDate: new Date(bornDate),
        cpf,
        name,
        period,
        fatherName: fatherName ?? '',
        motherName: motherName ?? '',
        active: true,
      },
    });
    return student;
  }
}

export { CreateStudentUseCase };
