import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PullRequest } from "./PullRequest";
import { User } from "./User";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ nullable: false })
  name!: string;

  @Field()
  @Column({ default: 0 })
  likes: number;

  @Field(() => User, { defaultValue: [] })
  @OneToMany(() => User, (u) => u.starredProjects)
  starredByUsers: User[];

  @Field()
  @Column({ default: 1.0, nullable: false })
  currentVersion!: number;

  @Field()
  @Column({ nullable: false })
  creatorId!: string;

  @ManyToOne(() => User, (user) => user.createdProjects)
  creator: User;

  @Field({ nullable: true })
  @Column()
  description: string;

  // where the site can be viewed (deployed)
  @Field({ nullable: true })
  @Column({ nullable: true })
  previewUrl?: string;

  // where the file will be stored
  @Field()
  @Column()
  content!: string;

  @Field(() => PullRequest)
  @OneToMany(() => PullRequest, (pr) => pr.project)
  pullRequests: PullRequest[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  updatedAt: Date;

  @Field(() => Boolean)
  @Column({ default: true })
  read: Boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  write: Boolean;
}
