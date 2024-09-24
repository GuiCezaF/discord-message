import fastify from "fastify";

import { ZodTypeProvider } from "fastify-type-provider-zod";
import { env } from "process";
import { routes } from "../routes/routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(routes);

app.listen({
  port: Number(env.APP_PORT),
  host: env.APP_HOST,
}).then(() => {
  console.log(`Server is running on http://${env.APP_HOST}:${env.APP_PORT} 🚀`);
});
