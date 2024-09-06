import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common';
import { FindByUserDTO, UpdateUsers } from './dto/home.dto';
import { HomeService } from './home.service';
import { handleHTTPError } from '../common/helper';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) { }

  @Post('find-by-user')
  @HttpCode(HttpStatus.OK)
  async findByUser(@Body() body: FindByUserDTO) {
    try {
      return this.homeService.findByUser(body.user_id, body.limit, body.offset);
    } catch (error) {
      handleHTTPError(error);
    }
  }

  @Patch('update-users')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUsers(@Body() body: UpdateUsers) {
    try {
      return this.homeService.updateUsers(body.unchecked_users, body.home_id);
    } catch (error) {
      handleHTTPError(error);
    }
  }
}
