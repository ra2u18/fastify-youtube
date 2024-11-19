import { CreateUserRequestDto } from './create-user.schema';
import { userActionCreator } from '@/modules/user';

export type CreateUserCommandResult = Promise<string>;
export const createUserCommand =
  userActionCreator<CreateUserRequestDto>('create');
export const createUserEvent =
  userActionCreator<CreateUserRequestDto>('create');
