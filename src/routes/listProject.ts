import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";

export async function listProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/projects/list/:number/:techs/:isMain', {
    schema: {
      params: z.object({
        number: z.number().optional(),
        techs: z.string().array().optional(),
        isMain: z.boolean().optional()
      })
    }
  }, async (request) => {
    const {number, techs, isMain} = request.params

    const projects = await prisma.project.findMany({
      where: {
        isMain: isMain,
      },
      orderBy: {
        lastTime: 'asc'
      },
      take: number,
    })

    return projects
  })
}