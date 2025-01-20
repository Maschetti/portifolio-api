import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { createProject } from './routes/createProject';
import { listProject } from './routes/listProject';

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Project sesseion
app.register(createProject)
app.register(listProject)



app.listen({port: 3333}).then(() => {
  console.log('Server running...')
})
