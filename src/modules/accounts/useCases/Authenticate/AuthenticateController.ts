import { Request, Response } from 'express';
import { AuthenticateUseCase } from './AuthenticateUseCase';

class AuthenticateController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const authenticateUseCase = new AuthenticateUseCase();
    const token = await authenticateUseCase.execute({ email, password });

    return response.json(token);
  }
}

export { AuthenticateController };
