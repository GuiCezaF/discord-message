import { FastifyInstance } from "fastify";
import { z } from "zod";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { SendDiscordMessage } from "../services/send-discord-message";

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

        await SendDiscordMessage(message);

        return { response: "Message successfully sent to Discord", message: message };
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
