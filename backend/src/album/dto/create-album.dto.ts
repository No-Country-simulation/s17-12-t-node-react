import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Location {
  @ApiProperty({
    description: 'Latitude of the location',
    type: Number,
  })
  @IsNumber()
  readonly latitude: number;

  @ApiProperty({
    description: 'Longitude of the location',
    type: Number,
  })
  @IsNumber()
  readonly longitude: number;
}

class Photo {
  @ApiProperty({
    description: 'URL of the photo',
    type: String,
  })
  @IsUrl()
  readonly url: string;

  @ApiPropertyOptional({
    description: 'Description of the photo',
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly description?: string;
}

export class CreateAlbumDto {
  @ApiPropertyOptional({
    description: 'Title of the album',
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiPropertyOptional({
    description: 'Description of the album',
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'Location of the album',
    type: Location,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  readonly location?: Location;

  @ApiProperty({
    description: 'Photos in the album',
    type: [Photo],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Photo)
  readonly photos: Photo[];

  @ApiPropertyOptional({
    description: 'Tags associated with the album',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly tags?: string[];
}
