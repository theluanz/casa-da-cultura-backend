import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '@shared/database/prismaClient';
import { AppError } from '@shared/errors/AppError';

interface IJwtInfo {
  id: string;
  iat: number;
  exp: number;
}

const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  // Get the token from the headers
  const token = request.headers.authorization;

  if (!token) {
    throw new AppError('Invalid Token', 401);
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as IJwtInfo;
  request.userId = decoded.id;

  const user = await prismaClient.user.findUniqueOrThrow({
    where: {
      id: request.userId,
    },
    select: {
      role: true
    }
  });
  
  if (user.role.length === 0) {
    throw new AppError('Invalid Token', 401);
  }

  next();
};

export { authMiddleware };
