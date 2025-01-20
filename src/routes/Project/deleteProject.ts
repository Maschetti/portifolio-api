import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function deleteProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/project/delete/:projectId', {
    schema: {
      params: z.object({
        projectId: z.string()
      })
    }
    
  }, async (request) => {
    const {projectId} = request.params

    const project = await prisma.project.delete({
      where: {
        id: projectId
      }
    })

    return project
  })
}