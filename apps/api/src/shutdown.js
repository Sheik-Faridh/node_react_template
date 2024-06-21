const setTrapForUncaughtExceptions = () => {
  process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error(
      '[UNCAUGHT_EXCEPTION]',
      `${new Date().toUTCString()}: Process will now exit. UncaughtException:`,
      err.message,
      err.stack,
    )
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })
}

export default function setupAllShutdownHandlers(app) {
  const closeDbConnection = async () => {
    app.log.info({ message: 'Closing DB connection...' })
    try {
      // TODO: destroy your database connection here
      app.log.info({ message: 'DB connection successfully closed!' })
    } catch (err) {
      app.log.error({ message: 'SERVER_SHUTDOWN closeDbConnection', err })
    }
  }

  const closeServer = async () => {
    app.log.info({ message: 'Closing server connection...' })
    try {
      await app.close()
      app.log.info({ message: 'Server successfully closed!' })
    } catch (err) {
      app.log.error({ message: 'SERVER_SHUTDOWN closeServer', err })
    }
  }

  const setupShutdownHandlersFor = (signal) => {
    process.on(signal, async function onSigterm() {
      try {
        app.log.info({
          message: `Got ${signal}. Graceful shutdown start ${new Date().toISOString()}`,
        })
        await closeDbConnection()
        await closeServer()
      } catch (err) {
        app.log.error({
          message: 'SERVER_SHUTDOWN signalHandler Could not shutdown everything cleanly!',
          err,
        })
      } finally {
        // eslint-disable-next-line no-process-exit
        process.exit()
      }
    })
  }

  setupShutdownHandlersFor('SIGINT')
  setupShutdownHandlersFor('SIGTERM')
  setTrapForUncaughtExceptions()
}
