import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  country: string;
  @Prop()
  tags: [string];
  @Prop()
  isAdmin: boolean;
  @Prop()
  description: string;
  @Prop()
  imageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
