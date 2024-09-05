import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import Home from './home.entity';
import UserInterests from 'src/user/user_interest.entity';
import { In } from 'typeorm';

@Injectable()
export class HomeService {
  private homeRepository: Repository<Home>;
  private userInterestRepository: Repository<UserInterests>;

  constructor(private dataSource: DataSource) {
    this.homeRepository = this.dataSource.getRepository(Home);
    this.userInterestRepository = this.dataSource.getRepository(UserInterests);
  }

  async findByUser(
    userId: number,
    limit: number,
    offset: number,
  ): Promise<Home[]> {
    const homes = await this.userInterestRepository.find({
      where: {
        user_id: userId,
      },
      relations: ['home'],
      take: limit,
      skip: offset,
    });
    return homes.map((h) => h.home);
  }

  async updateUsers(uncheckedUsers: number[], homeId: number) {
    const userHomePairs = await this.userInterestRepository.find({
      where: {
        home_id: homeId,
        user_id: In(uncheckedUsers),
      },
    });
    await this.userInterestRepository.remove(userHomePairs);
    return true;
  }
}
