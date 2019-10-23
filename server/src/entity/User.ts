import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Entity
} from "typeorm";
import { hash } from "bcrypt";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

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

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hash(this.password, 10);
  }
}
