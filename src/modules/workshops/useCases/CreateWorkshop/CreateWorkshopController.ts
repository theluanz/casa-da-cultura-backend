import { Request, Response } from 'express';
import { ICreateWorkshopDTO } from '../../dtos/ICreateWorkshopDTO';
import { CreateWorkshopUseCase } from './CreateWorkShopUseCase';

class CreateWorkshopController {
  async handle(request: Request, response: Response) {
    const { name, description, active }: ICreateWorkshopDTO = request.body;
    const createWorkshopUseCase = new CreateWorkshopUseCase();
    const workshop = await createWorkshopUseCase.execute({
      name,
      description,
      active,
    });

    return response.json(workshop);
  }
  hi(request: Request, response: Response) {
    return response.json({ message: 'hi' });
  }
}

export { CreateWorkshopController };
