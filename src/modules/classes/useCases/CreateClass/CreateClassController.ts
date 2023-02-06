import { Request, Response } from 'express';
import { CreateClassUseCase } from './CreateClassUseCase';

class CreateClassController {
  async handle(request: Request, response: Response) {
    const { end_time, day_week, start_time, year, teachers_id, workshop_id } = request.body;

    const createClassUseCase = new CreateClassUseCase();

    const newClass = await createClassUseCase.execute({
      end_time,
      day_week,
      start_time,
      year,
      teachers_id,
      workshop_id,
    });

    return response.json(newClass);
  }
}

export { CreateClassController };
