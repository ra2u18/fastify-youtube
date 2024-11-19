import {
  createUserCommand,
  CreateUserCommandResult,
} from './create-user.handler';
import { createUserRequestDtoSchema } from './create-user.schema';
import { idDtoSchema } from '@/shared/api/id.response.dto';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export default async function createUser(fastify: FastifyRouteInstance) {
  fastify.withTypeProvider<TypeBoxTypeProvider>().route({
    method: 'POST',
    url: '/v1/users',
    schema: {
      description: 'Create User',
      body: createUserRequestDtoSchema,
      response: { 200: idDtoSchema },
      tags: ['users'],
    },
    handler: async (req, res) => {
      const id = await fastify.commandBus.execute<CreateUserCommandResult>(
        createUserCommand(req.body),
      );

      return res.status(201).send({ id });
    },
  });
}
