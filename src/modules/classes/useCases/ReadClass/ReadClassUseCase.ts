import { prismaClient } from '@shared/database/prismaClient';
import { z } from 'zod';
import { AppError } from '@shared/errors/AppError';

class ReadClassUseCase {
  async execute(id: string) {
    if (!id) {
      throw new AppError('O id da turma é obrigatório', 400);
    }

    const classExists = await prismaClient.class.findUnique({
      where: {
        id,
      },
      include: {
        ClassTeachers: {
          select: {
            teachers: {
              select: {
                id: true,
                name: true,
                email: true,
                active: true,
              },
            },
          },
        },
        WorkshopClass: {
          select: {
            workshops: {
              select: {
                id: true,
                name: true,
                description: true,
                active: true,
              },
            },
          },
        },
      },
    });
    return classExists;
  }
}

export { ReadClassUseCase };
