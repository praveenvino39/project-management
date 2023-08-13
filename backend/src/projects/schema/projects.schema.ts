import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Type } from 'class-transformer';
import { Ticket } from './tickets.schema';

export type ProjectDocument = HydratedDocument<Project>;
const { ObjectId } = SchemaTypes;

@Schema()
export class Project {
  @Prop()
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  @Type(() => User)
  createdBy: User;

  @Prop({
    type: Array<typeof SchemaTypes.ObjectId>,
    ref: 'Ticket',
    default: [],
  })
  @Type(() => Array<Ticket>)
  tickets: string[];

  @Prop({ type: Array<typeof ObjectId>, ref: 'User', default: [] })
  @Type(() => Array<User>)
  collaborators: User[];

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
