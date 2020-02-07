import { Entity, ObjectIdColumn, Column, BaseEntity, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Post extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column("text")
  postType: string;

  @Column("text")
  title: string;

  @Column("text")
  description: string;

  @Column("text")
  url: string;

  @Column(() => User)
  _user: User;

  @CreateDateColumn({type:'date'})
  created: Date;
}