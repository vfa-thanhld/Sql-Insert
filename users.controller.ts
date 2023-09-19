import { UsersService } from './users.service';
import { BaseController } from '../../vendors/base/base.controller';
import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';

@Controller('test')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Get('singleInsert')
  async singleInsert(@Query('num', ParseIntPipe) num: number) {
    this.usersService.singleInsert(num);
    return this.response({});
  }

  @Get('batchInsert')
  async batchInsert(@Query('num', ParseIntPipe) num: number) {
    this.usersService.batchInsert(num);
    return this.response({});
  }

  @Get('loadInsert')
  async loadInsert(@Query('num', ParseIntPipe) num: number) {
    this.usersService.loadInsert(num);
    return this.response({});
  }
}
