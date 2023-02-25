import { z } from 'zod';

const PERIOD_ENUM = ['MORNING', 'AFTERNOON', 'NIGHT'] as const;

const IUpdateStudentDTO = z.object({
  id: z.string().uuid({ message: 'Id inválido' }),
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }).optional(),
  cpf: z.string().length(11, { message: 'CPF deve ter 11 caracteres' }).optional(),
  bornDate: z
    .string()
    .refine((date) => new Date(date) instanceof Date, { message: 'Data de nascimento inválida' })
    .optional(),
  period: z.array(z.enum(PERIOD_ENUM)).optional(),
  phone: z.string().optional(),
  rg: z.string().optional(),
  address: z
    .object({
      street: z.string().optional(),
      number: z.string().optional(),
      complement: z.string().optional(),
      neighborhood: z.string().optional(),
    })
    .optional(),
  parent: z
    .object({
      name: z.string().optional(),
      cpf: z.string().length(11, { message: 'CPF deve ter 11 caracteres' }).optional(),
      rg: z.string().optional(),
      phone: z.string().optional(),
    })
    .optional(),
  schooling: z.string().optional(),
  active: z.boolean().optional(),
});

export { IUpdateStudentDTO };
