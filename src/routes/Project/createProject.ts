import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function createProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/project/create', {
    schema: {
      body: z.object({
        name: z.string().min(4),
        description: z.string().min(10),
        link: z.string().url(),
        lastTime: z.coerce.date(),
        isMain: z.boolean(),
        techs: z.string().array()
      })
    }
    
  }, async (request) => {
    const {name, description, link, lastTime, isMain, techs} = request.body

    const project = await prisma.project.create({
      data: {
        name,
        description,
        link,
        lastTime,
        isMain,
        projectTechs: {
          create: techs.map((tech) => ({
            techName: tech,
          }))
        }
      }
    })

    return {projectId: project.id}
  })
}