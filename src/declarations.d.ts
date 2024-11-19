import { requestContext } from '@fastify/request-context';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';

declare global {
  type FastifyRouteInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    JsonSchemaToTsProvider
  >;
}

declare module '@fastify/request-context' {
  interface RequestContextData {
    requestId: string;
  }
}
