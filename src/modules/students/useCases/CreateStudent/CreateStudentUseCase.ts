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
    });

    if (!validateStudent.success) {
      throw new AppError(validateStudent.error.message, 400);
    }

    if (GetAge(new Date(validateStudent.data.bornDate)) < 18) {
      console.log(GetAge(new Date(validateStudent.data.bornDate)));
      if (!validateStudent.data.parent) {
        throw new AppError('Responsável é obrigatório para menores de idade', 400);
      }

      const parentCreated = await prismaClient.parent.upsert({
        where: {
          cpf: validateStudent.data.parent.cpf,
        },
        update: {
          name: validateStudent.data.parent.name,
          phone: validateStudent.data.parent.phone,
          rg: validateStudent.data.parent.rg,
        },
        create: {
          name: validateStudent.data.parent.name,
          phone: validateStudent.data.parent.phone,
          rg: validateStudent.data.parent.rg,
          cpf: validateStudent.data.parent.cpf,
        },
      });

      const addressCreated = await prismaClient.address.create({
        data: {
          complement: validateStudent.data.address.complement,
          neighborhood: validateStudent.data.address.neighborhood,
          number: validateStudent.data.address.number,
          street: validateStudent.data.address.street,
        },
      });

      const student = await prismaClient.student.create({
        data: {
          bornDate: new Date(validateStudent.data.bornDate),
          cpf: validateStudent.data.cpf,
          name: validateStudent.data.name,
          period: validateStudent.data.period,
          rg: validateStudent.data.rg,
          phone: validateStudent.data.phone,
          adressId: addressCreated.id,
          parentId: parentCreated.id,
        },
      });
      return student;
    }

    const addressCreated = await prismaClient.address.create({
      data: {
        complement: validateStudent.data.address.complement,
        neighborhood: validateStudent.data.address.neighborhood,
        number: validateStudent.data.address.number,
        street: validateStudent.data.address.street,
      },
    });

    const student = await prismaClient.student.create({
      data: {
        bornDate: new Date(bornDate),
        cpf,
        name,
        period,
        rg,
        phone,
        adressId: addressCreated.id,
      },
    });
    return student;
  }
}

export { CreateStudentUseCase };
