import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      const createdProject = await this.projectModel.create(createProjectDto);
      await createdProject.save();
      return createdProject;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.toString(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addCollaborators(projectId: string, users: string[]) {
    try {
      const project = await this.projectModel.findByIdAndUpdate(projectId, {
        $set: { collaborators: users },
      });
      return project;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.toString(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
    try {
      const project = this.projectModel
        .findOne({ _id: projectId })
        .populate('collaborators');
      return project;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.toString(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
