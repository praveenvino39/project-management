import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserAuthGuard } from 'src/users/users.guard';
import { UsersService } from 'src/users/users.service';
import { AssignUsersDto } from './dto/assign-users.dto';

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

  @Patch('/add-users/:projectId')
  @UseGuards(UserAuthGuard)
  async assignUsersToProject(
    @Param('projectId') projectId: string,
    @Body() assignUsersDto: AssignUsersDto,
  ) {
    return this.projectsService.addCollaborators(
      projectId,
      assignUsersDto.users,
    );
  }

  @Patch('/remove-users/:projectId')
  @UseGuards(UserAuthGuard)
  async unAssignUsersToProject(
    @Param('projectId') projectId: string,
    @Body() assignUsersDto: AssignUsersDto,
  ) {
    return this.projectsService.removeCollaborators(
      projectId,
      assignUsersDto.users,
    );
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}
