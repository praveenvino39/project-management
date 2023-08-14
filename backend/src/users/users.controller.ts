import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/update-user.dto';
import { matchPassword } from './users.utils';
import { UserAuthGuard } from './users.guard';
import { sendReponse } from 'src/utils';
import { log } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    return sendReponse({
      message: 'User created successfully',
      data: await this.usersService.create(createUserDto),
      status: HttpStatus.CREATED,
    });
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return sendReponse({
      message: 'User logged in successfully',
      data: await this.usersService.login(loginUserDto),
      status: HttpStatus.OK,
    });
  }

  @Get('/all')
  @UseGuards(UserAuthGuard)
  async getAllUsers() {
    return sendReponse({
      message: 'All users',
      status: HttpStatus.OK,
      data: await this.usersService.findAll(),
    });
  }
}
