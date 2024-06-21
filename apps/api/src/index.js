import { init, run } from './server.js'

try {
  const server = await init()
  await run(server)
} catch (error) {
  console.error('Error on intializing the server', error)
}
