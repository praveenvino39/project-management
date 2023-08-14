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
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UserAuthGuard } from 'src/users/users.guard';

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
    return this.ticketsService.createTicket(createTicketDto, user);
  }

  @Patch('/:ticketId')
  @UseGuards(UserAuthGuard)
  async assignUserToTicket(
    @Param('ticketId') ticketId: string,
    @Query('user') user: string,
  ) {
    return this.ticketsService.assignTicket(ticketId, user);
  }

  @Delete('/:ticketId')
  @UseGuards(UserAuthGuard)
  async unAssignUserToTicket(@Param('ticketId') ticketId: string) {
    return this.ticketsService.unAssignTicket(ticketId);
  }

  @Get()
  getAllTickets() {
    return this.ticketsService.findAll().populate('assignedTo');
  }
}
