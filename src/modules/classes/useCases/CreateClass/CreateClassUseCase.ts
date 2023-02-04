import { prismaClient } from '@shared/database/prismaClient';
import { z } from 'zod';
import { AppError } from '@shared/errors/AppError';
import { ICreateClassDTO } from '@modules/classes/dtos/ICreateClassDTO';

class CreateClassUseCase {
  async execute({
    end_time,
    day_week,
    start_time,
    year,
    teachers_id,
    workshop_id,
  }: z.infer<typeof ICreateClassDTO>) {
    const validateClass = ICreateClassDTO.safeParse({
      end_time,
      day_week,
      start_time,
      year,
      teachers_id,
      workshop_id,
    });

    if (!validateClass.success) {
      throw new AppError(validateClass.error.message, 400);
    }
    const newClass = await prismaClient.class.create({
      data: {
        day_week: validateClass.data.day_week.toUpperCase() as any,
        end_time: validateClass.data.end_time,
        start_time: validateClass.data.start_time,
        year: validateClass.data.year,
        ClassTeachers: {
          createMany: {
            data: validateClass.data.teachers_id.map((id) => ({
              fk_id_teacher: id,
            })),
          },
        },
        WorkshopClass: {
          create: {
            fk_id_workshop: validateClass.data.workshop_id,
          },
        },
      },
    });
    return newClass;
  }
}

export { CreateClassUseCase };
