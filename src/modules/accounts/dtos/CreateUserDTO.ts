import { z } from 'zod';

const ROLE_ENUM = ['STUDENT', 'TEACHER', 'ADMIN'] as const;

const CreateUserDTO = z.object({
  email: z.string().email({message: 'Email inválido'}),
  password: z.string().min(6, {message: 'Senha deve ter no mínimo 6 caracteres'}),
  name: z.string().min(3, {message: 'Nome deve ter no mínimo 3 caracteres'}),
  bornDate: z.string().refine((date) => new Date(date) instanceof Date, {message: 'Data de nascimento inválida'}),
  cpf: z.string().length(11, {message: 'CPF deve ter 11 caracteres'}),
  role: z.array(z.enum(ROLE_ENUM)).optional().default(['STUDENT' as const]),
});

export { CreateUserDTO };
