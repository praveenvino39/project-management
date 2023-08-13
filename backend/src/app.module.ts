import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { JwtModule } from '@nestjs/jwt';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ secret: 'SOMESECRET' }),
    MongooseModule.forRoot('mongodb://localhost:27017/project-management'),
    ProjectsModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
