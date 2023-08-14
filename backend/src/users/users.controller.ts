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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/update-user.dto';
import { matchPassword } from './users.utils';
import { UserAuthGuard } from './users.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.usersService.login(loginUserDto);
    if (token) {
      return token;
    }
    return null;
  }

  @Get()
  @UseGuards(UserAuthGuard)
  getDashboard(@Request() request) {
    return request['user'];
  }

  @Get('/all')
  @UseGuards(UserAuthGuard)
  getAllUsers() {
    return this.usersService.findAll();
  }
}
