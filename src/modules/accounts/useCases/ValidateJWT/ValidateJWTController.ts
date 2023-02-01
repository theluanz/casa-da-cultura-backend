import { Request, Response } from 'express';
import { ValidateJWTUseCase } from './ValidateJWTUseCase';

class ValidateJWTController {
  async handle(request: Request, response: Response) {
    const token = request.headers.authorization;

    const validateUseCase = new ValidateJWTUseCase();
    const userInfo = await validateUseCase.execute(request.userId);

    return response.json(userInfo);
  }
}

export { ValidateJWTController };
