import { z } from 'zod';

const PERIOD_ENUM = ['MORNING', 'AFTERNOON', 'NIGHT'] as const;

const ICreateStudentDTO = z.object({
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  cpf: z.string().length(11, { message: 'CPF deve ter 11 caracteres' }),
  bornDate: z
    .string()
    .refine((date) => new Date(date) instanceof Date, { message: 'Data de nascimento inválida' }),
  period: z.array(z.enum(PERIOD_ENUM)),
  phone: z.string().optional(),
  rg: z.string(),
  address: z.object({
    street: z.string(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string(),
  }),
  parent: z.object({
    name: z.string(),
    cpf: z.string().length(11, { message: 'CPF deve ter 11 caracteres' }),
    rg: z.string().optional(),
    phone: z.string(),
  }).optional(),
});

export { ICreateStudentDTO };
