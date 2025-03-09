import fastify from 'fastify';

const app = fastify()

app.get('/', async (request, reply) => {
  return "API is running!"
})

app.get('/teste', async (request, reply) => {
  return "Teste"
})

app.listen({port: 3333}).then(() => {
  console.log(`Server is running on port: 3333`)
})