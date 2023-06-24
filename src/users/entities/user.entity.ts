import { STATUS } from 'src/dto/StatusTypes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



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

  @Column({ nullable: false })
  role: string;
  
  @Column({type:'enum', enum:STATUS,default:STATUS.ACTIVE})
  status:STATUS

  @Column({ nullable: false, type: 'datetime', name: 'create_at' })
  createAt: Date;

  @Column({ nullable: false, type: 'datetime', name: 'update_at' })
  updateAt: Date;
}
