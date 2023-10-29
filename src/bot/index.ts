import { logger } from '@navikt/next-logger'

import { configureMessageScheduler } from './messages/message-scheduler'
import { configureHealthCheckEventsHandler } from './events/healthcheck/healthcheck-event-handler'
import { configureSettingsEventsHandler } from './events/settings/settings-event-handler'
import { configureCommandsHandler } from './commands/commands-handler'
import { configureEventsHandler } from './events/events-handler'
import createApp from './app'

const handlers = [
    configureCommandsHandler,
    configureMessageScheduler,
    configureEventsHandler,
    configureSettingsEventsHandler,
    configureHealthCheckEventsHandler,
]

export async function startBot(): Promise<void> {
    logger.info('Setting up bolt app...')

    const app = createApp()
    handlers.forEach((handler) => handler(app))
    await app.start()

    logger.info(`Started bolt app in socket mode`)
}
