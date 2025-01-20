import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../../lib/prisma";

export async function listProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/project/list', {
    schema: {
      querystring: z.object({
        number: z.coerce.number().optional(),
        isMain: z.string().optional().transform(value => {
          // make sure isMain can be undefined
          return value === undefined ? undefined : z.coerce.boolean().parse(value);
        }),
        techs: z.string().transform(value => value.split(',')).optional(),
      })
    }
  }, async (request) => {
    const {number, isMain, techs} = request.query

    const projects = await prisma.project.findMany({
      where: {
        ...(isMain !== undefined ? { isMain: isMain } : {}),
        ...(techs ? {
          AND: techs.map((tech: string) => ({
            projectTechs: {
              some: {
                techName: tech
              }
            }
          }))
        } : {})
      },
      take: number ?? undefined,
      include: {
        projectTechs: {
          select: {
            techName: true,
          },
          orderBy: {
            techName: 'asc'
          }
        }
      }
    })

    if(!projects) return 'Projects not found'


    // retrun projecTechs as an String[] instead of Object[]
    return projects.map(project => ({
      ...project,
      projectTechs: project.projectTechs.map(tech => tech.techName),
    }));
  })
}