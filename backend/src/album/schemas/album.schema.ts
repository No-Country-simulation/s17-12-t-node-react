import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Location, LocationSchema } from './location.schema';
import { Photo, PhotoSchema } from './photo.schema';

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

  @Prop({ required: true, schema: LocationSchema })
  location: Location;

  @Prop({ required: true, type: [PhotoSchema] })
  photos: Photo[];

  @Prop([String])
  tags?: string[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
