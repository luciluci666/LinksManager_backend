import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  categories: Array<{id: Number, name: string}>;

  @Prop()
  links: Array<{id: Number, name: string, category_id: Number, url: string, favicon:string}>;

  @Prop()
  templates: Array<{id: Number, name: string, links_ids: Array<Number>}>;

  @Prop()
  stashes: Array<{id: Number, date: string, links: Array<{name: string, url: string, favicon:string}>}>
}

export const UserSchema = SchemaFactory.createForClass(User).set(
  'timestamps',
  true,
);
