import { z } from 'zod';

const PERIOD_ENUM = ['MORNING', 'AFTERNOON', 'NIGHT'] as const;

const ICreateStudentDTO = z.object({
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  motherName: z.string().optional(),
  fatherName: z.string().optional(),
  cpf: z.string().length(11, { message: 'CPF deve ter 11 caracteres' }),
  bornDate: z
    .string()
    .refine((date) => new Date(date) instanceof Date, { message: 'Data de nascimento inválida' }),
  period: z.array(z.enum(PERIOD_ENUM)),
});

export { ICreateStudentDTO };
