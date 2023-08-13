import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/schema/user.schema';

export class AssignUsersDto {
  username: string;
}
