import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword, matchPassword } from './users.utils';
import { LoginUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await hashPassword(createUserDto.password);
      const user = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });
      const createdUser = await user.save();
      return createdUser;
    } catch (error) {
      return error;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findUserByUsername(loginUserDto.username);
    if (user) {
      const passwordMatched = await matchPassword({
        password: loginUserDto.password,
        hash: user.password,
      });
      if (passwordMatched) {
        user.password = undefined;
        return this.jwtService.signAsync(user.toJSON(), { expiresIn: '30d' });
      }
    }
    return null;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findUserByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
