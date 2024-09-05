import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'home', synchronize: false })
export default class Home {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  street_address: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  zip: string;

  @Column({ type: 'float' })
  sqft: string;

  @Column({ type: 'int', default: 0 })
  beds: string;

  @Column({ type: 'int', default: 1 })
  baths: string;

  @Column({ type: 'decimal' })
  list_price: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
