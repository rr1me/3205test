import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppService, AvailableAccount, DTO } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @HttpCode(200)
  getHello(@Body() b: DTO): Promise<AvailableAccount[]> {
    return this.appService.getAccounts(b);
  }
}
