import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PullRequest } from "./PullRequest";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PullRequest, (pr) => pr.from)
  pullRequest: PullRequest[];

  @Field(() => String)
  @CreateDateColumn()
  updatedAt: Date;
}
