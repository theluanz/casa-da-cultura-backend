import { hash } from 'bcrypt';
import { z } from 'zod';

const ROLE_ENUM = ['STUDENT', 'TEACHER', 'ADMIN'] as const;

const IUpdateDTO = z.object({
  id: z.string().uuid({message: 'Id inválido'}),
  email: z.string().email({message: 'Email inválido'}).optional(),
  password: z.string().min(6, {message: 'Senha deve ter no mínimo 6 caracteres'}).optional(),
  name: z.string().min(3, {message: 'Nome deve ter no mínimo 3 caracteres'}).optional(),
  bornDate: z.string().refine((date) => new Date(date) instanceof Date, {message: 'Data de nascimento inválida'}).optional(),
  cpf: z.string().length(11, {message: 'CPF deve ter 11 caracteres'}).optional(),
  role: z.array(z.enum(ROLE_ENUM)).optional().default(['STUDENT' as const]).optional(),
  active: z.boolean().optional(),
});

export { IUpdateDTO };
