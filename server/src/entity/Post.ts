import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column({ default: false })
  isPurchased: boolean;

  @ManyToOne(
    () => User,
    user => user.posts
  )
  owner: User;
}
