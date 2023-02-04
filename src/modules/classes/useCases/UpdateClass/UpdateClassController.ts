import { Request, Response } from 'express';
import { UpdateClassUseCase } from './UpdateClassUseCase';

class UpdateClassController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { active, teachers_ids, workshop_id, day_week, start_time, end_time, students_ids } =
      request.body;
    const updateClassUseCase = new UpdateClassUseCase();

    const updatedClass = await updateClassUseCase.execute({
      id,
      active,
      teachers_ids,
      workshop_id,
      day_week,
      start_time,
      end_time,
      students_ids,
    });

    return response.json(updatedClass);
  }
}

export { UpdateClassController };
