import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import fs from "fs";
import z from 'zod';
import { prisma } from "../../lib/prisma";

export async function addImageToProject(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post("/project/addImage/:id", {
    schema: {
      params: z.object({
        id: z.string()
      }),
    }
  }, async (request, reply) => {
    // Ensure the request has a file
    const data = await request.file();
    const {id} = request.params

    if (!data) {
      return 'Image was required'
    }

    const project = await prisma.project.findUnique({
      where: {
        id: id
      }
    })

    if(!project) return 'Project not found'


    // Save the file to the directory
    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(data.filename);
      data.file.pipe(writeStream);
      data.file.on("end", () => resolve());
      data.file.on("error", (err) => reject(err));
    });

    const image = await prisma.image.create({
      data: {
        filePath: data.filename,
        project: {connect: {id: id}}
      }
    })

    return image

  });
}
