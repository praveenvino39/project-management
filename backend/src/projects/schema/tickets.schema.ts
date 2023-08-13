import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { Type } from 'class-transformer';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket {
  @Prop()
  name: string;

  @Prop({ type: Array<typeof SchemaTypes.ObjectId>, ref: 'User', default: [] })
  @Type(() => Array<User>)
  assignedTo: User[];

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
