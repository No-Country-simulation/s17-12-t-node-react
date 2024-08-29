import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class Location {
  @IsNumber()
  readonly latitude: number;

  @IsNumber()
  readonly longitude: number;
}

class Photo {
  @IsUrl()
  readonly url: string;

  @IsOptional()
  @IsString()
  readonly description?: string;
}

export class CreateAlbumDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  readonly location: Location;

  @IsArray()
  @ValidateNested()
  @Type(() => Photo)
  readonly photos: Photo[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: string[];
}
