import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '@shared/database/prismaClient';
const ensureIsAdminMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: {
      id: request.userId,
    },
    select: {
      role: true,
    },
  });
  if (user.role.includes('ADMIN')) {
    return next();
  }
  throw new Error('User is not admin');
};

export { ensureIsAdminMiddleware };
