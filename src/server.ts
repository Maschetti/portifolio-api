import fastify from 'fastify';

const app = fastify()

app.get('/', async (request, reply) => {
  return "API is running!"
})

app.listen({port: 3333}).then(() => {
  console.log(`Server is running on port: 3333`)
})