import createServer from './server';
import { env } from '@/config';
import GracefulServer from '@gquittet/graceful-server';
import { randomUUID } from 'crypto';
import Fastify from 'fastify';

async function init() {
  const fastify = Fastify({
    logger: { level: env.log.level, redact: ['headers.Authorization'] },
    genReqId: function (req) {
      return (req.headers['request-id'] as string) ?? randomUUID();
    },
    ignoreDuplicateSlashes: true,
  });

  await createServer(fastify);

  const gracefulServer = GracefulServer(fastify.server, {
    closePromises: [],
  });

  gracefulServer.on(GracefulServer.READY, () => {
    fastify.log.info('Server is ready');
  });

  gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
    fastify.log.info('Server is shutting down');
  });

  gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
    fastify.log.info('Server is down because of', error.message);
  });

  try {
    await fastify.listen({ port: env.server.port });
    gracefulServer.setReady();
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

init();
