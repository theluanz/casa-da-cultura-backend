import { prismaClient } from '@shared/database/prismaClient';

class ReadStudentUseCase {
  async execute(id: string) {
    const student = await prismaClient.student.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        Address: true,
        Parent: true,
      },
    });

    return student;
  }
}

export { ReadStudentUseCase };
