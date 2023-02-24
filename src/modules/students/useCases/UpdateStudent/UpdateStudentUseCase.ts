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

    const _address = await prismaClient.address.findUnique({
      where: {
        id: studentExists.addressId,
      },
    });

    if (
      studentExists.parentId &&
      (validateStudent.data.parent?.name ||
        validateStudent.data.parent?.cpf ||
        validateStudent.data.parent?.rg ||
        validateStudent.data.parent?.phone)
    ) {
      await prismaClient.parent.update({
        where: {
          id: studentExists.parentId,
        },
        data: {
          name: validateStudent.data.parent?.name,
          cpf: validateStudent.data.parent?.cpf,
          rg: validateStudent.data.parent?.rg,
          phone: validateStudent.data.parent?.phone,
        },
      });
    }

    const student = await prismaClient.student.update({
      where: {
        id: studentExists.id,
      },
      data: {
        active: validateStudent.data.active || studentExists.active,
        bornDate: validateStudent.data.bornDate || studentExists.bornDate,
        cpf: validateStudent.data.cpf || studentExists.cpf,
        name: validateStudent.data.name || studentExists.name,
        phone: validateStudent.data.phone || studentExists.phone,
        rg: validateStudent.data.rg || studentExists.rg,
        period: validateStudent.data.period || studentExists.period,
        schooling: validateStudent.data.schooling || studentExists.schooling,

        Address: {
          update: {
            complement: validateStudent.data.address?.complement || _address?.complement,
            neighborhood: validateStudent.data.address?.neighborhood || _address?.neighborhood,
            number: validateStudent.data.address?.number || _address?.number,
            street: validateStudent.data.address?.street || _address?.street,
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
