import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FindByHomeDTO } from './dto/user.dto';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { handleHTTPError } from '..//common/helper';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('find-all')
  @HttpCode(HttpStatus.OK)
  async findAllUsers() {
    try {
      return this.userService.findAllUsers();
    } catch (error) {
      handleHTTPError(error);
    }
  }

  @Post('find-by-home')
  @UseFilters(new HttpExceptionFilter())
  async findByHome(@Body() body: FindByHomeDTO) {
    try {
      return this.userService.findByHome(body.home_id);
    } catch (error) {
      handleHTTPError(error);
    }
  }
}
