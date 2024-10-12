import { IsString } from 'class-validator';

export class HandleAccountCreatedInput {
  @IsString()
  accountId: string;
}
