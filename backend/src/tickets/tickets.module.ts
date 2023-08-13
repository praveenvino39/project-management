import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket } from './entities/ticket.entity';
import { TicketSchema } from './schema/tickets.schema';
import { ProjectsService } from 'src/projects/projects.service';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Project, ProjectSchema } from 'src/projects/schema/projects.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [TicketsController],
  providers: [ProjectsService, TicketsService],
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: User.name, schema: UserSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
})
export class TicketsModule {}
