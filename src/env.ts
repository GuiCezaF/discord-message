import { z } from 'zod';

const envSchema = z.object({
  DISCORD_WEBHOOK: z.string().url(),
  APP_HOST: z.string(),
  APP_PORT: z.coerce.number().int(),
});

export const validate = envSchema.safeParse(process.env);

if (!validate.success) {
  console.error('Erro na validação das variáveis de ambiente:', validate.error.format());
  process.exit(1);
}

export const env = validate.data;
