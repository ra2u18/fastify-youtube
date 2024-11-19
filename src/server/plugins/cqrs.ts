import fastifyCQRS from '@/shared/crqs';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

async function cqrsPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifyCQRS);
}

export default fp(cqrsPlugin, { name: 'CQRSPlugin ' });
