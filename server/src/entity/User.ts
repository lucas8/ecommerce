import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Entity,
  OneToMany,
  JoinColumn
} from "typeorm";
import { hash } from "bcrypt";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ default: false })
  forgotPasswordLocked: boolean;

  @Column({ default: 0 })
  tokenVersion: number;

  @Column({ default: false })
  hasTwoFactor: boolean;

  @Column({ nullable: true })
  twoFactorChallenge: string;

  @OneToMany(() => Post, post => post.owner)
  @JoinColumn()
  posts: Post[];

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hash(this.password, 10);
  }
}
