import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function readImage(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/image/read/:id', {
    schema: {
      params: z.object({
        id: z.string()
      })
    }
  }, async (request, reply) => {
    const {id} = request.params

    const image = await prisma.image.findUnique({
      where: {
        id: id
      }
    })

    if(!image) return 'Image not Found'

    return reply.sendFile(image.filePath);
  })
}