import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  // @OneToMany((type) => Comment, (comment) => comment.user)
  // comments: Comment[];

  // @BeforeInsert()
  // async hashPasword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}
