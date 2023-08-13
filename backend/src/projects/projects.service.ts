import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/projects.schema';
import { Model } from 'mongoose';
import { Ticket } from './schema/tickets.schema';

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

  findAll() {
    return this.projectModel.find().populate('createdBy');
  }

  findProjectById(projectId: string) {
    const project = this.projectModel.findOne({ _id: projectId });
    return project;
  }
}
