import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Location, LocationSchema } from './location.schema';
import { Photo, PhotoSchema } from './photo.schema';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ trim: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Album {
  @Prop({ trim: true })
  title?: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ schema: LocationSchema })
  location: Location;

  @Prop({ required: true, type: [PhotoSchema] })
  photos: Photo[];

  @Prop([String])
  tags?: string[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);