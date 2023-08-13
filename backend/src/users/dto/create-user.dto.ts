import { Min } from 'class-validator';

export class CreateUserDto {
  @Min(3)
  firstName: string;
  @Min(3)
  lastName: string;
  @Min(3)
  username: string;
  @Min(8)
  password: string;
}
