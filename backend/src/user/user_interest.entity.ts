import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';
import Home from '../home/home.entity';

@Entity({ name: 'user_interests', synchronize: false })
export default class UserInterests {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Home, (home) => home.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'home_id' })
  home: Home;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  home_id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
