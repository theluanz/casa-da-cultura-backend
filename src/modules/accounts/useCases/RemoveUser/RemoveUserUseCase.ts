import { prismaClient } from '@shared/database/prismaClient';

class RemoveUserUseCase {
  async execute(id: string) {
    const user = await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        active: false,
        role: [],
      },
    });
    console.log(user);
    return;
  }
}

export { RemoveUserUseCase };
