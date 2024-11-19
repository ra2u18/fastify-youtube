import { env } from '@/config';
import AutoLoad from '@fastify/autoload';
import Cors from '@fastify/cors';
import Helmet from '@fastify/helmet';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import path from 'node:path';

// + Here we will register base plugins and auto load custom ones
export default async function createServer(fastify: FastifyInstance) {
  await fastify.register(Helmet, {
    global: true,
    // The following settings are needed for graphiql, see https://github.com/graphql/graphql-playground/issues/1283
    contentSecurityPolicy: !env.isDevelopment,
    crossOriginEmbedderPolicy: !env.isDevelopment,
  });

  await fastify.register(Cors, {
    origin: false,
  });

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
  });

  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, '../modules'),
    dirNameRoutePrefix: false,
    options: { autoPrefix: 'api' },
    matchFilter: (path) =>
      ['.route.ts', '.resolver.ts'].some((e) => path.endsWith(e)),
  });

  return fastify.withTypeProvider<TypeBoxTypeProvider>();
}
