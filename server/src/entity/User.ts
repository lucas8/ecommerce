import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Entity,
  OneToOne
} from "typeorm";
import { hash } from "bcrypt";
import { Site } from "./Site";

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

  @Column({ default: false })
  hasTwoFactor: boolean;

  @Column({ nullable: true })
  twoFactorChallenge: string;

  @OneToOne(() => Site, site => site.owner)
  site: Site;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await hash(this.password, 10);
  }
}
