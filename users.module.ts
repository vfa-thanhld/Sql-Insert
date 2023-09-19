import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerModule } from '../../common/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), LoggerModule],
  providers: [UsersRepository, UsersService],
  controllers: [UsersController],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
