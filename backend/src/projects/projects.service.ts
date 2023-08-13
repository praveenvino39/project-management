import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schema/projects.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Ticket } from './schema/tickets.schema';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    const createdProject = await this.projectModel.create(createProjectDto);
    await createdProject.save();
    return createdProject;
  }

  async createTicket(createTicketDto: CreateTicketDto) {
    const createdTicket = await this.ticketModel.create(createTicketDto);
    await createdTicket.save();
    return createdTicket;
  }

  findAll() {
    return this.projectModel.find().populate('createdBy');
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
