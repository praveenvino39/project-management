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
  HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserAuthGuard } from 'src/users/users.guard';
import { UsersService } from 'src/users/users.service';
import { AssignUsersDto } from './dto/assign-users.dto';
import { sendReponse } from 'src/utils';

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
    return sendReponse({
      message: 'Project created successfully',
      data: await this.projectsService.create(createProjectDto),
      status: HttpStatus.CREATED,
    });
  }

  @Get('/:projectId')
  @UseGuards(UserAuthGuard)
  async getProjectDetails(@Param('projectId') projectId) {
    return sendReponse({
      message: 'Project details',
      data: await this.projectsService.findProjectById(projectId),
      status: HttpStatus.OK,
    });
  }

  @Patch('/add-users/:projectId')
  @UseGuards(UserAuthGuard)
  async assignUsersToProject(
    @Param('projectId') projectId: string,
    @Body() assignUsersDto: AssignUsersDto,
  ) {
    return sendReponse({
      message: 'Users assinged to project',
      data: await this.projectsService.addCollaborators(
        projectId,
        assignUsersDto.users,
      ),
      status: HttpStatus.OK,
    });
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }
}
