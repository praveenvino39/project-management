import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket } from './schema/tickets.schema';
import { Model } from 'mongoose';
import { ProjectsService } from 'src/projects/projects.service';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    private projectService: ProjectsService,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto, user: User) {
    try {
      createTicketDto.createdBy = user;
      const project = await this.projectService.findProjectById(
        createTicketDto.project,
      );
      if (project) {
        const createdTicket = await this.ticketModel.create(createTicketDto);
        await createdTicket.save();
        await project.updateOne({ $push: { tickets: createdTicket.id } });
        return createdTicket.populate('project');
      }
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Project not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Project not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async assignTicket(ticketId: string, user: string) {
    try {
      const ticket = await this.ticketModel.findOne({ _id: ticketId });
      if (ticket) {
        ticket.assignedTo = user;
        await ticket.save();
        return ticket;
      }
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Ticket not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Ticket not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async unAssignTicket(ticketId: string) {
    try {
      const ticket = await this.ticketModel.findOne({ _id: ticketId });
      if (ticket) {
        ticket.assignedTo = null;
        await ticket.save();
        return ticket;
      }
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Ticket not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Ticket not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  findAll() {
    return this.ticketModel.find();
  }
}
