import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  username: string;

  @Prop({
    trim: true,
  })
  firstname: string;

  @Prop({
    trim: true,
  })
  lastname: string;

  @Prop({
    unique: true,
    trim: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    trim: true,
  })
  country: string;

  @Prop()
  tags: string[];

  @Prop({
    default: false,
  })
  isAdmin: boolean;

  @Prop({
    trim: true,
  })
  description: string;

  @Prop()
  imageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
