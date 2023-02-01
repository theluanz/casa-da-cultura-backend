import { IUpdateDTO } from '@modules/accounts/dtos/IUpdateUserDTO';
import { prismaClient } from '@shared/database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { z } from 'zod';

class UpdateUserUseCase {
  async execute(data: z.infer<typeof IUpdateDTO>, userID: string) {
    console.log(data);
    data = IUpdateDTO.parse(data);
    
    if (data.id !== userID) {
      const roleOfUser = await prismaClient.user.findFirstOrThrow({
        where: { id: userID, active: true },
        select: { role: true },
      });

      if (!roleOfUser.role.includes('ROOT')) {
        throw new AppError('Acesso negado', 403);
      }
    }
    const user = await prismaClient.user.findFirstOrThrow({
      where: { id: data.id },
    });

    const updateUser = await prismaClient.user.update({
      where: { id: data.id },
      data: {
        email: data.email ?? user.email,
        password: data.password ? await hash(data.password, 8): user.password,
        name: data.name ?? user.name,
        bornDate: data.bornDate ? new Date(data.bornDate) : user.bornDate,
        cpf: data.cpf ?? user.cpf,
        role: data.role ?? user.role,
        active: data.active ?? user.active,
      },
    });

    return updateUser;
  }
}

export { UpdateUserUseCase };
