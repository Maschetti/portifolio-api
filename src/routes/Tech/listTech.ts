import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function listTech(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/tech/list/:number', {
    schema: {
      params: z.object({
        number: z.coerce.number().optional(),
      })
    }
  }, async (request) => {
    const {number} = request.params

    const techs = await prisma.tech.findMany({
      take: number ?? undefined
    })

    if(!techs) return 'techs not found'

    return techs
  })
}