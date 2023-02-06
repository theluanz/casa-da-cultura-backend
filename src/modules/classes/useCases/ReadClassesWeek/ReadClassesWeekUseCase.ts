import { Prisma } from '@prisma/client';
import { prismaClient } from '@shared/database/prismaClient';

class ReadClassesWeekUseCase {
  async execute(day_week: string) {
    const include = {
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
      ClassStudents: {
        select: {
          students: {
            select: {
              id: true,
              name: true,
              motherName: true,
              fatherName: true,
              active: true,
            },
          },
        },
      },
    };

    const classExists = day_week
      ? await prismaClient.class.findMany({
          where: {
            day_week: day_week as Prisma.EnumDayWeekFilter,
            active: true,
          },
          orderBy: [{ day_week: 'asc' }, { start_time: 'asc' }],
          include: include,
        })
      : await prismaClient.class.findMany({
          where: {
            active: true,
          },
          orderBy: [{ day_week: 'asc' }, { start_time: 'asc' }],
          include: include,
        });
    return classExists;
  }
}

export { ReadClassesWeekUseCase };
