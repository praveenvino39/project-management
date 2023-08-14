import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Type } from 'class-transformer';
import { Project } from 'src/projects/schema/projects.schema';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
  @Prop()
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', default: null })
  @Type(() => User)
  assignedTo: string;

  @Prop()
  description: string;

  @Prop({ default: 'low' })
  priority: 'low' | 'medium' | 'high';

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Project' })
  @Type(() => Project)
  project: Project;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
