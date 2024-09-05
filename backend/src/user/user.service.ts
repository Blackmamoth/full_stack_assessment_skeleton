import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import User from './user.entity';
import UserInterests from './user_interest.entity';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;
  private userInterestRepository: Repository<UserInterests>;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
    this.userInterestRepository = this.dataSource.getRepository(UserInterests);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      order: {
        username: 'ASC',
      },
    });
  }

  async findByHome(homeId: number): Promise<User[]> {
    const users = await this.userInterestRepository.find({
      where: {
        home_id: homeId,
      },
      relations: ['user'],
    });
    return users.map((u) => u.user);
  }
}
