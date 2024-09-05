import { Body, Controller, Patch, Post } from '@nestjs/common';
import { FindByUserDTO, UpdateUsers } from './dto/home.dto';
import { HomeService } from './home.service';
import { handleHTTPError } from '../common/helper';

@Controller('home')
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Post('find-by-user')
  async findByUser(@Body() body: FindByUserDTO) {
    try {
      return this.homeService.findByUser(body.user_id, body.limit, body.offset);
    } catch (error) {
      handleHTTPError(error);
    }
  }

  @Patch('update-users')
  async updateUsers(@Body() body: UpdateUsers) {
    return this.homeService.updateUsers(body.unchecked_users, body.home_id);
  }
}
