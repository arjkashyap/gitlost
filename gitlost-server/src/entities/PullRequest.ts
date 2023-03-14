import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";

@ObjectType()
@Entity()
export class PullRequest extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ length: 100 })
  title: string;

  @Field()
  @Column({ length: 400 })
  description: string;

  @Field()
  @ManyToOne(() => Project)
  project: Project;

  @Field(() => User)
  @ManyToOne(() => User)
  from: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ default: 0 })
  accepts: number;

  @Field()
  @Column({ default: 0 })
  views: number;

  @Field()
  @Column()
  s3FileUrl: string;

  @Field()
  @Column({ default: false })
  merged: boolean;
}
