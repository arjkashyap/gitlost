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
import { Project } from "./Project";
import { PullRequest } from "./PullRequest";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio: string;

  @Field()
  @Column({ unique: true, nullable: false })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Project, (p) => p.creator)
  createdProjects: Project[];

  @Field()
  @ManyToOne(() => Project)
  starredProjects: Project;

  @OneToMany(() => PullRequest, (pr) => pr.from)
  pullRequest: PullRequest[];

  @Field(() => String)
  @CreateDateColumn()
  updatedAt: Date;

  @Field(() => Boolean)
  @Column({ default: false })
  verified: Boolean;
}
