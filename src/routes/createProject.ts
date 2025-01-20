import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";

export async function createProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/projects/create', {
    schema: {
      body: z.object({
        name: z.string().min(4),
        description: z.string().min(10),
        link: z.string().url(),
        lastTime: z.coerce.date(),
        isMain: z.boolean()
      })
    }
    
  }, async (request) => {
    const {name, description, link, lastTime, isMain} = request.body

    const project = await prisma.project.create({
      data: {
        name,
        description,
        link,
        lastTime,
        isMain
      }
    })

    return {projectId: project.id}
  })
}