import { CommandBus } from './bus.types';
import { commandBus } from './command-bus';
import { makeTrackExecutionTime } from './middlewares';
import fastifyPlugin from 'fastify-plugin';

interface CQRSPluginOption {}

const CQRSPlugin = fastifyPlugin<CQRSPluginOption>(
  (fastify, _opts, done) => {
    if (fastify.commandBus) {
      throw new Error('This plugin is already registered');
    }

    const commandBusInstance = commandBus();
    commandBusInstance.addMiddleware(makeTrackExecutionTime(fastify.log));

    fastify.decorate('commandBus', commandBusInstance);

    done();
  },
  { name: 'fastify-cqrs', fastify: '5.x' },
);

declare module 'fastify' {
  interface FastifyInstance {
    commandBus: CommandBus;
  }
}

export default CQRSPlugin;
