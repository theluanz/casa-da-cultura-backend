import { prismaClient } from '@shared/database/prismaClient';
import { z } from 'zod';
import { AppError } from '@shared/errors/AppError';
import { ICreateStudentDTO } from '@modules/students/dtos/ICreateStudentDTO';
import { GetAge } from '@shared/utils/GetAge';

class CreateStudentUseCase {
  async execute({
    bornDate,
    cpf,
    address,
    name,
    parent,
    period,
    rg,
    phone,
    schooling,
  }: z.infer<typeof ICreateStudentDTO>) {
    const validateStudent = ICreateStudentDTO.safeParse({
      bornDate,
      cpf,
      address,
      name,
      parent,
      period,
      rg,
      phone,
      schooling,
    });

    if (!validateStudent.success) {
      throw new AppError(validateStudent.error.message, 400);
    }

    if (GetAge(new Date(validateStudent.data.bornDate)) < 18) {
      console.log(GetAge(new Date(validateStudent.data.bornDate)));
      if (!validateStudent.data.parent) {
        throw new AppError('Responsável é obrigatório para menores de idade', 400);
      }

      const student = await prismaClient.student.create({
        data: {
          name: validateStudent.data.name,
          cpf: validateStudent.data.cpf,
          rg: validateStudent.data.rg,
          bornDate: new Date(validateStudent.data.bornDate),
          period: validateStudent.data.period,
          phone: validateStudent.data.phone,
          schooling: validateStudent.data.schooling,

          Address: {
            create: {
              complement: validateStudent.data.address.complement,
              neighborhood: validateStudent.data.address.neighborhood,
              number: validateStudent.data.address.number,
              street: validateStudent.data.address.street,
            },
          },
          Parent: {
            connectOrCreate: {
              where: {
                cpf: validateStudent.data.parent.cpf,
              },
              create: {
                name: validateStudent.data.parent.name,
                cpf: validateStudent.data.parent.cpf,
                rg: validateStudent.data.parent.rg,
                phone: validateStudent.data.parent.phone,
              },
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

    const student = await prismaClient.student.create({
      data: {
        bornDate: new Date(bornDate),
        cpf,
        name,
        period,
        rg,
        phone,
        schooling: validateStudent.data.schooling,
        Address: {
          create: {
            complement: validateStudent.data.address.complement,
            neighborhood: validateStudent.data.address.neighborhood,
            number: validateStudent.data.address.number,
            street: validateStudent.data.address.street,
          },
        },
      },
    });
    return student;
  }
}

export { CreateStudentUseCase };
