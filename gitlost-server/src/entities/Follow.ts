import { Field, ObjectType } from "type-graphql";
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
export class Follow extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  type: "USER" | "PROJECT";

  @Field()
  @ManyToOne(() => User)
  from: User;

  @Field({ nullable: true })
  @ManyToOne(() => User)
  toUser: User;

  @Field({ nullable: true })
  @ManyToOne(() => Project)
  toProject: Project;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
