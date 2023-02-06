import { IUpdateClassDTO } from '@modules/classes/dtos/IUpdateClassDTO';
import { prismaClient } from '@shared/database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { z } from 'zod';

class UpdateClassUseCase {
  async execute({
    id,
    active,
    day_week,
    end_time,
    start_time,
    teachers_ids,
    workshop_id,
    students_ids,
  }: z.infer<typeof IUpdateClassDTO>) {
    const validateNewClass = IUpdateClassDTO.safeParse({
      id,
      active,
      day_week,
      end_time,
      start_time,
      teachers_ids,
      workshop_id,
      students_ids,
    });
    if (!validateNewClass.success) {
      throw new AppError(validateNewClass.error.message, 400);
    }

    const classExists = await prismaClient.class.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const updatedClass = await prismaClient.class.update({
      where: {
        id,
      },
      data: {
        active: validateNewClass.data.active,
        day_week: validateNewClass.data.day_week,
        end_time: validateNewClass.data.end_time,
        start_time: validateNewClass.data.start_time,
      },
      include: {
        ClassTeachers: true,
        WorkshopClass: true,
        ClassStudents: true,
      },
    });

    if (teachers_ids) {
      const currentTeachers = updatedClass.ClassTeachers.map((teacher) => teacher.fk_id_teacher);

      const teachersToAdd = teachers_ids.filter((teacher) => !currentTeachers.includes(teacher));
      const teachersToRemove = currentTeachers.filter((teacher) => !teachers_ids.includes(teacher));

      if (teachersToAdd.length > 0) {
        await prismaClient.classTeachers.createMany({
          data: teachersToAdd.map((teacher_id) => ({
            fk_id_class: updatedClass.id,
            fk_id_teacher: teacher_id,
          })),
        });
      }
      if (teachersToRemove.length > 0) {
        await prismaClient.classTeachers.updateMany({
          where: {
            fk_id_class: updatedClass.id,
            fk_id_teacher: {
              in: teachersToRemove,
            },
          },
          data: {
            active: false,
          },
        });
      }
    }

    if (workshop_id && workshop_id !== updatedClass.WorkshopClass[0].fk_id_workshop) {
      await prismaClient.workshopClass.update({
        where: {
          fk_id_class: updatedClass.id,
        },
        data: {
          fk_id_workshop: workshop_id,
        },
      });
    }

    if (students_ids) {
      const currentStudents = updatedClass.ClassStudents.map((student) => student.fk_id_student);

      const studentsToAdd = students_ids.filter((student) => !currentStudents.includes(student));
      const studentsToRemove = currentStudents.filter((student) => !students_ids.includes(student));

      if (studentsToAdd.length > 0) {
        await prismaClient.classStudents.createMany({
          data: studentsToAdd.map((student_id) => ({
            fk_id_class: updatedClass.id,
            fk_id_student: student_id,
          })),
        });
      }
      if (studentsToRemove.length > 0) {
        await prismaClient.classStudents.updateMany({
          where: {
            fk_id_class: updatedClass.id,
            fk_id_student: {
              in: studentsToRemove,
            },
          },
          data: {
            active: false,
          },
        });
      }
    }
    const updatedClassWithRelations = await prismaClient.class.findUnique({
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
              },
            },
          },
          where: {
            active: true,
          },
        },
        WorkshopClass: {
          select: {
            workshops: {
              select: {
                id: true,
                name: true,
                description: true,
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
                bornDate: true,
              },
            },
          },
          where: {
            active: true,
          },
        },
      },
    });

    return updatedClassWithRelations;
  }
}

export { UpdateClassUseCase };
