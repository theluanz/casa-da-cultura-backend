import { CreateUserDTO } from '@modules/accounts/dtos/CreateUserDTO';
import { prismaClient } from '@shared/database/prismaClient';
import { z } from 'zod';
import { hash } from 'bcrypt';
import { AppError } from '@shared/errors/AppError';

class CreateUserUseCase {
  async execute({ email, password, name, bornDate, cpf, role }: z.infer<typeof CreateUserDTO>) {
    const validateUser = CreateUserDTO.safeParse({ email, password, name,bornDate, cpf, role });
    if (!validateUser.success) {
      throw new AppError(validateUser.error.message, 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        bornDate: new Date(bornDate),
        cpf,
        role,
      },
    });
    return user;
  }
}

export { CreateUserUseCase };
