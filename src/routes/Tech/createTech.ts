import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function createTech(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/tech/create', {
    schema: {
      body: z.object({
        name: z.string(),
      })
    }
    
  }, async (request) => {
    const {name} = request.body

    const tech = await prisma.tech.create({
      data: {
        name
      }
    })

    return {techId: tech.id}
  })
}