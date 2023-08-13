import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, ProjectSchema } from './schema/projects.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Ticket, TicketSchema } from './schema/tickets.schema';

@Module({
  controllers: [ProjectsController],
  providers: [UsersService, ProjectsService],
  imports: [
    JwtModule.register({ secret: 'SOMESECRET' }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Ticket.name, schema: TicketSchema },

      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
})
export class ProjectsModule {}
