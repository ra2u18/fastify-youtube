import { Static, Type } from '@sinclair/typebox';

export const createUserRequestDtoSchema = Type.Object(
  {
    email: Type.String({
      maxLength: 320,
      minLength: 5,
      format: 'email',
    }),
    country: Type.String({
      maxLength: 50,
      minLength: 4,
    }),
    postalCode: Type.String({
      maxLength: 10,
      minLength: 4,
    }),
    street: Type.String({
      maxLength: 50,
      minLength: 5,
    }),
  },
  {
    examples: [
      {
        email: 'john@gmail.com',
        country: 'France',
        postalCode: '10000',
        street: 'Grande Rue',
      },
    ],
    description: 'Create user request data',
  },
);

export type CreateUserRequestDto = Static<typeof createUserRequestDtoSchema>;
