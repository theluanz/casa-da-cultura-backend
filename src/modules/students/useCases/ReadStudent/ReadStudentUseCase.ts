import { prismaClient } from '@shared/database/prismaClient';

class ReadStudentUseCase {
  async execute(id: string) {
    const student = await prismaClient.student.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return student;
  }
}

export { ReadStudentUseCase };
