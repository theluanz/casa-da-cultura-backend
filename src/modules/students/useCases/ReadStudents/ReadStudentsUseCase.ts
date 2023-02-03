import { prismaClient } from '@shared/database/prismaClient';

class ReadStudentsUseCase {
  async execute(page: number) {
    const students = await prismaClient.student.findMany({
      orderBy: {
        active: 'desc',
        name: 'asc',
      },
      skip: (page) * 10,
    });
    return students;
  }
}

export { ReadStudentsUseCase };
