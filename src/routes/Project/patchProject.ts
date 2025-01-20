import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function patchProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch('/project/patch/:projectId', {
    schema: {
      params: z.object({
        projectId: z.string()
      }),
      body: z.object({
        name: z.string().min(4).optional(),
        description: z.string().min(10).optional(),
        link: z.string().url().optional(),
        isMain: z.boolean().optional(),
        newTechs: z.string().array().optional(),
        techsToDelete: z.string().array().optional()
      })
    }
    
  }, async (request) => {
    const {projectId} = request.params

    const {name, description, link, isMain, newTechs, techsToDelete} = request.body

    const emptyStringArray: string[] = []
    const newTechNotUndefined = newTechs === undefined ? emptyStringArray : newTechs

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name: name ?? undefined,
        description: description ?? undefined,
        link: link ?? undefined,
        isMain: isMain ?? undefined,
        projectTechs: {
          createMany: {
            data: newTechNotUndefined.map((tech) => {console.log(tech); return {techName: tech}})
          },
            deleteMany: techsToDelete && techsToDelete.length > 0 ? {
              techName: {
                in: techsToDelete
              }
            } : undefined
        },
      },
      include: {
        projectTechs: true, // Incluir tecnologias no retorno
      },
    });

    return updatedProject
  })
}