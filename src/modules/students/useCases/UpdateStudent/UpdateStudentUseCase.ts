import { IUpdateStudentDTO } from '@modules/students/dtos/IUpdateStudentDTO';
import { prismaClient } from '@shared/database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { z } from 'zod';

class UpdateStudentUseCase {
  async execute({
    id,
    active,
    bornDate,
    address,
    cpf,
    name,
    period,
    parent,
    phone,
    rg,
    schooling,
  }: z.infer<typeof IUpdateStudentDTO>) {
    const validateStudent = IUpdateStudentDTO.safeParse({
      id,
      active,
      bornDate,
      address,
      cpf,
      name,
      period,
      parent,
      phone,
      rg,
      schooling,
    });

    if (!validateStudent.success) {
      throw new AppError(validateStudent.error.message, 400);
    }

    const studentExists = await prismaClient.student.findUniqueOrThrow({
      where: {
        id: validateStudent.data.id,
      },
    });
    if (!studentExists) {
      throw new AppError('Aluno não encontrado', 404);
    }

    if (studentExists.parentId) {
      const student = await prismaClient.student.update({
        where: {
          id: studentExists.id,
        },
        data: {
          active: validateStudent.data.active,
          bornDate: validateStudent.data.bornDate,
          cpf: validateStudent.data.cpf,
          name: validateStudent.data.name,
          phone: validateStudent.data.phone,
          rg: validateStudent.data.rg,
          period: validateStudent.data.period,
          schooling: validateStudent.data.schooling,

          Address: {
            update: {
              complement: validateStudent.data.address?.complement,
              neighborhood: validateStudent.data.address?.neighborhood,
              number: validateStudent.data.address?.number,
              street: validateStudent.data.address?.street,
            },
          },

          Parent: {
            update: {
              name: validateStudent.data.parent?.name,
              cpf: validateStudent.data.parent?.cpf,
              rg: validateStudent.data.parent?.rg,
              phone: validateStudent.data.parent?.phone,
            },
          },
        },
        include: {
          Address: true,
          Parent: true,
        },
      });
      return student;
    }
    const student = await prismaClient.student.update({
      where: {
        id: studentExists.id,
      },
      data: {
        active: validateStudent.data.active,
        bornDate: validateStudent.data.bornDate,
        cpf: validateStudent.data.cpf,
        name: validateStudent.data.name,
        phone: validateStudent.data.phone,
        rg: validateStudent.data.rg,
        period: validateStudent.data.period,
        schooling: validateStudent.data.schooling,

        Address: {
          update: {
            complement: validateStudent.data.address?.complement,
            neighborhood: validateStudent.data.address?.neighborhood,
            number: validateStudent.data.address?.number,
            street: validateStudent.data.address?.street,
          },
        },
      },
      include: {
        Address: true,
      },
    });

    return student;
  }
}

export { UpdateStudentUseCase };
