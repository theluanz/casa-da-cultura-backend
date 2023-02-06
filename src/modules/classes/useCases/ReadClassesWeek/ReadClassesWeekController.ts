import { Request, Response } from 'express';
import { ReadClassesWeekUseCase } from './ReadClassesWeekUseCase';

class ReadClassesWeekController {
  async handle(request: Request, response: Response) {
    const { day_week } = request.body;
    console.log(day_week);
    const readClassWeekUseCase = new ReadClassesWeekUseCase();

    const specificClass = await readClassWeekUseCase.execute(day_week);

    return response.json(specificClass);
  }
}

export { ReadClassesWeekController };
