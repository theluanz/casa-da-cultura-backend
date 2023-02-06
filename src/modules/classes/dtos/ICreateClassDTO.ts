import { z } from 'zod';

const DAYS_WEEK_ENUM = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;

const ICreateClassDTO = z.object({
  year: z.number().int({ message: 'O ano é obrigatório' }),
  day_week: z.string(z.enum(DAYS_WEEK_ENUM)),
  start_time: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'O horário de início deve ter 5 caracteres',
  }),
  end_time: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'O horário de início deve ter 5 caracteres',
  }),
  teachers_id: z.array(z.string().uuid({ message: 'O id do professor é obrigatório' })),
  workshop_id: z.string().uuid({ message: 'O id do professor é obrigatório' }),
});

export { ICreateClassDTO };
