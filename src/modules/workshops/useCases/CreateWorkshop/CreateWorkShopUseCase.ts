import { ICreateWorkshopDTO } from "@modules/workshops/dtos/ICreateWorkshopDTO";
import { prismaClient } from "@shared/database/prismaClient";

export class CreateWorkshopUseCase {
  async execute({ name, description, active }: ICreateWorkshopDTO) {
    if (!name) {
      throw new Error("Name is required");
    }
    if (!description) {
      throw new Error("Description is required");
    }
    if (!active) {
      active = true;
    }

    const workshop = await prismaClient.workshop.create({
      data: {
        name,
        description,
        active,
      },
    });
    return workshop;
  }
}