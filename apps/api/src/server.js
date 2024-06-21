// Import the framework and instantiate it
import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import swagger from '@fastify/swagger'
import underPressure from '@fastify/under-pressure'
import formbody from '@fastify/formbody'
import setupAllShutdownHandlers from './shutdown.js'

const underPressureConfig = () => {
  return {
    healthCheck: async function () {
      // TODO: Add database connection check
      return true
    },
    message: 'Under Pressure 😯',
    exposeStatusRoute: '/status',
    healthCheckInterval: 5000,
  }
}

const swaggerConfig = () => {
  return {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Fastify Boilerplate',
        description: 'A full blown production ready boilerplate to build APIs with Fastify',
        version: '1.0.0',
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  }
}

export const init = async () => {
  const app = Fastify({
    logger: true,
  })

  app.register(cors)
  app.register(helmet, {
    noCache: true,
    policy: 'same-origin',
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        imgSrc: ["'self'", 'data:'],
        scriptSrc: ["'self' 'unsafe-inline'"],
      },
    },
  })
  app.register(formbody)
  app.register(swagger, swaggerConfig())
  app.register(underPressure, underPressureConfig())

  // Declare a route
  app.get('/', async function handler(request, reply) {
    return { hello: 'world' }
  })

  await app.ready()
  setupAllShutdownHandlers(app)
  app.log.info('Everything is Loaded..!')
  return app
}

export const run = (app) => app.listen({ port: 3000 })
