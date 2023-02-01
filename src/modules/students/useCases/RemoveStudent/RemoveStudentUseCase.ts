import { prismaClient } from '@shared/database/prismaClient';
import { AppError } from '@shared/errors/AppError';

class RemoveStudentUseCase {
  async execute(id: string, cpf: string) {
    if (!id && !cpf) {
      throw new AppError('Informe o id ou o cpf do aluno', 400);
    }
    if (id) {
      const student = await prismaClient.student.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });
      return student;
    }

    if (cpf) {
      const student = await prismaClient.student.update({
        where: {
          cpf,
        },
        data: {
          active: false,
        },
      });
      return student;
    }
  }
}

export { RemoveStudentUseCase };
