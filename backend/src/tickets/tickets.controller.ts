import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UserAuthGuard } from 'src/users/users.guard';
import { sendReponse } from 'src/utils';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  async createTicket(
    @Request() request: Request,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    const user = request['user']._id;
    return sendReponse({
      message: 'New ticket created',
      data: await this.ticketsService.createTicket(createTicketDto, user),
      status: HttpStatus.CREATED,
    });
  }

  @Patch('/:ticketId')
  @UseGuards(UserAuthGuard)
  async assignUserToTicket(
    @Param('ticketId') ticketId: string,
    @Query('user') user: string,
  ) {
    return sendReponse({
      message: 'New ticket created',
      data: await this.ticketsService.assignTicket(ticketId, user),
      status: HttpStatus.CREATED,
    });
  }

  @Delete('/:ticketId')
  @UseGuards(UserAuthGuard)
  async unAssignUserToTicket(@Param('ticketId') ticketId: string) {
    return this.ticketsService.unAssignTicket(ticketId);
  }

  @Get('/:projectId')
  getAllTickets(@Param('projectId') projectId: string) {
    return this.ticketsService.findAll(projectId).populate('assignedTo');
  }
}
