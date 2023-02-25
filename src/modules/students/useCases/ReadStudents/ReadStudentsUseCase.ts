import { prismaClient } from '@shared/database/prismaClient';

class ReadStudentsUseCase {
  async execute(page: number) {
    const students = await prismaClient.student.findMany({
      orderBy: [{ active: 'desc' }, { name: 'desc' }],

      take: 10,
      skip: +(page * 10),
      include: {
        Address: true,
        Parent: true,
      },
    });
    return students;
  }
}

export { ReadStudentsUseCase };
