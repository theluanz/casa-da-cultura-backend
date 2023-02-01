import { IAuthenticateDTO } from '@modules/accounts/dtos/IAuthenticateDTO';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { prismaClient } from '@shared/database/prismaClient';
import bcrypt from 'bcrypt';
import { AppError } from '@shared/errors/AppError';

class ValidateJWTUseCase {
  async execute(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true,
        createdAt: true,
        active: true,
        cpf: true,
      },
    });
    return user;
  }
}

export { ValidateJWTUseCase };
