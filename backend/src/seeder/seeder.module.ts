import { Module } from '@nestjs/common';

import { SeederService } from './seeder.service';
import { UserModule } from 'src/user/user.module';
import { SeederController } from './seeder.controller';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [UserModule, AlbumModule],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule { }
