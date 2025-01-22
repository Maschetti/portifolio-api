import { fastifyMultipart } from '@fastify/multipart';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { addImageToProject } from './routes/Project/addImageToProject';
import { createProject } from './routes/Project/createProject';
import { deleteProject } from './routes/Project/deleteProject';
import { listProject } from './routes/Project/listProject';
import { patchProject } from './routes/Project/patchProject';
import { clearTech } from './routes/Tech/clearTech';
import { createTech } from './routes/Tech/createTech';
import { listTech } from './routes/Tech/listTech';

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Multipart to accept files upload
app.register(fastifyMultipart)

// Project section
app.register(createProject)
app.register(listProject)
app.register(deleteProject)
app.register(patchProject)
app.register(addImageToProject)

// Tech section
app.register(createTech)
app.register(listTech)
app.register(clearTech)


app.listen({port: 3333}).then(() => {
  console.log(`Server is running on port: 3333`)
})
