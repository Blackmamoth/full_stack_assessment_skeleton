import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import UserInterests from './user_interest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInterests])],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
