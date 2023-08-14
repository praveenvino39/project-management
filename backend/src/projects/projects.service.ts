import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schema/projects.schema';
import { Model } from 'mongoose';
import { Ticket } from 'src/tickets/schema/tickets.schema';

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

  async addCollaborators(projectId: string, users: string[]) {
    const project = await this.projectModel.findByIdAndUpdate(projectId, {
      $set: { collaborators: users },
    });
    return project;
  }

  async removeCollaborators(projectId: string, users: string[]) {
    const project = await this.projectModel.findByIdAndUpdate(
      projectId,
      { $pull: { collaborators: { $in: users } } },
      { new: true },
    );
    return project;
  }

  findAll() {
    return this.projectModel.find().populate('createdBy collaborators');
  }

  findProjectById(projectId: string) {
    const project = this.projectModel
      .findOne({ _id: projectId })
      .populate('collaborators');
    return project;
  }
}
