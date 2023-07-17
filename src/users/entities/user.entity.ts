import { STATUS } from 'src/dto/StatusTypes';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRoles } from '../dto/UserRoles';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, name: 'img_url' })
  imgUrl: string;

  @Column({ nullable: false, default:UserRoles.USER })
  role: string;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.ACTIVE })
  status: STATUS;

  @CreateDateColumn({type:'timestamp'})
  create_at: Date;

  @UpdateDateColumn({type:'timestamp'})
  update_at: Date;
}
