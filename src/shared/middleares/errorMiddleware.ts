import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(error);
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: 'error', message: error.message })
      .send();
  }

  return response
    .status(500)
    .json({
      status: 'error',
      message: `${error.message}`,
    })
    .send();
};

export { errorMiddleware };
