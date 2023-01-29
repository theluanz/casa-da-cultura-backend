import { IAuthenticateDTO } from '@modules/accounts/dtos/IAuthenticateDTO';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { prismaClient } from '@shared/database/prismaClient';
import bcrypt from 'bcrypt';
import { AppError } from '@shared/errors/AppError';

class AuthenticateUseCase {
  async execute({ email, password }: z.infer<typeof IAuthenticateDTO>) {
    const user = await prismaClient.user.findFirstOrThrow({
      where: {
        email,
      },
    });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Email or password incorrect', 401);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return token;
  }
}

export { AuthenticateUseCase };
