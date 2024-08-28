import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Photo {
  @Prop({ required: true })
  url: string;

  @Prop()
  description?: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
