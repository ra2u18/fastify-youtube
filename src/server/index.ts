import { FastifyInstance } from "fastify";

// + Here we will register base plugins and auto load custom ones
export default async function createServer(fastify: FastifyInstance) {
  fastify.get("/", function (_request, reply) {
    reply.send({ hello: "world" });
  });
}
