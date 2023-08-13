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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UserAuthGuard } from 'src/users/users.guard';
import { UsersService } from 'src/users/users.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @UseGuards(UserAuthGuard)
  async create(@Request() request, @Body() createProjectDto: CreateProjectDto) {
    const user = await this.userService.findUserByUsername(
      request['user'].username,
      { removePassword: true },
    );
    createProjectDto.createdBy = user.id;
    return this.projectsService.create(createProjectDto);
  }

  @Post()
  @UseGuards(UserAuthGuard)
  async createTicket(
    @Request() request,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    const user = await this.userService.findUserByUsername(
      request['user'].username,
      { removePassword: true },
    );
    createTicketDto.createdBy = user.id;
    return this.projectsService.createTicket(createTicketDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
