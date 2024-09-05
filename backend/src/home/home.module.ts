import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import Home from './home.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Home])],
  controllers: [HomeController],
  providers: [HomeService],
  exports: [TypeOrmModule],
})
export class HomeModule {}
