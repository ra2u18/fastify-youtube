import { Action, CommandHandler, EventHandler } from './bus.types';
import { FastifyBaseLogger } from 'fastify';

export function makeTrackExecutionTime(logger: FastifyBaseLogger) {
  return async function trackExecutionTime(
    action: Action<unknown>,
    handler: CommandHandler | EventHandler,
  ) {
    const startTime = performance.now();
    const result = await handler(action);
    const endTime = performance.now();
    logger.info(
      `Action ${action.type} took ${(endTime - startTime).toFixed(2)}ms of execution time.`,
    );
    return result;
  };
}
