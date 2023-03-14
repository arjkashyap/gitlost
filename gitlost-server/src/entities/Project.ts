import { ObjectType, Field, ID } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PullRequest } from "./PullRequest";

@ObjectType()
@Entity()
export class Project {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Field()
  @Column()
  upvotes!: number;

  @Field()
  @Column()
  currentVersion!: number;

  @Field()
  @Column()
  orignalPosterId!: string;

  @Field({ nullable: true })
  @Column()
  description: string;

  // where the site can be viewed (deployed)
  @Field()
  @Column()
  previewUrl!: string;

  // where the file will be stored
  @Column()
  s3FileUrl!: string;

  @Field(() => PullRequest)
  @OneToMany(() => PullRequest, (pr) => pr.project)
  pullRequests: PullRequest[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @CreateDateColumn()
  updatedAt!: Date;

  @Field(() => Boolean)
  @Column({ default: true })
  read!: Boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  write!: Boolean;
}
