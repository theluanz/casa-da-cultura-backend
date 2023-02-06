import { prismaClient } from '@shared/database/prismaClient';
import { AppError } from '@shared/errors/AppError';

class RemoveClassUseCase {
  async execute(id: string) {
    if (!id) {
      throw new AppError('O id da turma é obrigatório', 400);
    }

    const classExists = await prismaClient.class.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
    return classExists;
  }
}

export { RemoveClassUseCase };
