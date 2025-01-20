import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";

export async function clearTech(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/tech/clear', {},  
    async (request) => {

      const tech = await prisma.tech.deleteMany({})

      return tech
    }
  )
}