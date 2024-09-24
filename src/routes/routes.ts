import { FastifyInstance } from "fastify";
import { z } from "zod";
import { DiscordLog } from "../utils/discord-logs";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";

const bodySchema = z.object({
  message: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export async function routes(app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.post<{
    Body: BodySchema;
  }>(
    "/discord",
    {
      schema: {
        body: bodySchema,
      },
    },
    async (req, reply) => {
      try {
        const { message } = req.body; 

        await DiscordLog(message);

        return { message: "Message successfully sent to Discord" };
      } catch (error) {
        console.error("Error sending message to Discord:", {
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : 'No stack available',
          requestData: req.body,
        });
        return reply.status(500).send({ message: "Error sending message to Discord" });
      }
    }
  );
}
