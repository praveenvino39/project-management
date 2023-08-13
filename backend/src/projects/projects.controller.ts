import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserAuthGuard } from 'src/users/users.guard';
import { UsersService } from 'src/users/users.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @UseGuards(UserAuthGuard)
  async createProject(
    @Request() request,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const user = await this.userService.findUserByUsername(
      request['user'].username,
    );
    createProjectDto.createdBy = user.id;
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}
