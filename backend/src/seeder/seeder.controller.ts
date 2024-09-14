import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) { }

  @Get()
  async executeSeed() {
    return await this.seederService.executeSeed();
  }
}
