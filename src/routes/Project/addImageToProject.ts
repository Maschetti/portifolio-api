import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import fs from "fs";
import path from "path";
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

    const uploadDir = path.join(__dirname, "../../utils/images");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, data.filename);

    // Save the file to the directory
    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(filePath);
      data.file.pipe(writeStream);
      data.file.on("end", () => resolve());
      data.file.on("error", (err) => reject(err));
    });
    
    const relativeFilePath = `/utils/images/${data.filename}`
    const image = await prisma.image.create({
      data: {
        filePath: relativeFilePath,
        project: {connect: {id: id}}
      }
    })

    return image

  });
}
