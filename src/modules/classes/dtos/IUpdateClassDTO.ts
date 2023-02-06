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

const IUpdateClassDTO = z.object({
  id: z.string().uuid({ message: 'ID é obrigatório' }),
  active: z.boolean().optional(),
  teachers_ids: z.array(z.string().uuid()).optional(),
  students_ids: z.array(z.string().uuid()).optional(),
  workshop_id: z.string().uuid().optional(),
  day_week: z.enum(DAYS_WEEK_ENUM).optional(),
  start_time: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'O horário de início deve ter 5 caracteres',
    })
    .optional(),
  end_time: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
      message: 'O horário de início deve ter 5 caracteres',
    })
    .optional(),
});

export { IUpdateClassDTO };
