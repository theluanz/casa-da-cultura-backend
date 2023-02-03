import { IUpdateStudentDTO } from '@modules/students/dtos/IUpdateStudentDTO';
import { prismaClient } from '@shared/database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { z } from 'zod';

class UpdateStudentUseCase {
  async execute({
    id,
    active,
    bornDate,
    cpf,
    fatherName,
    motherName,
    name,
    period,
  }: z.infer<typeof IUpdateStudentDTO>) {
    const validateStudent = IUpdateStudentDTO.safeParse({
      id,
      active,
      bornDate,
      cpf,
      fatherName,
      motherName,
      name,
      period,
    });

    if (!validateStudent.success) {
      throw new AppError(validateStudent.error.message, 400);
    }

    const studentExists = await prismaClient.student.findUniqueOrThrow({
      where: {
        id: validateStudent.data.id,
      },
    });

    const student = await prismaClient.student.update({
      where: {
        id,
      },
      data: {
        active: active || studentExists.active,
        bornDate: bornDate || studentExists.bornDate,
        cpf: cpf || studentExists.cpf,
        fatherName: fatherName || studentExists.fatherName,
        motherName: motherName || studentExists.motherName,
        name: name || studentExists.name,
        period: period || studentExists.period,
      },
    });
    return student;
  }
}

export { UpdateStudentUseCase };
