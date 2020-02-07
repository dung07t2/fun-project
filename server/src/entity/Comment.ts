import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";

@Entity("comment")
export class Comment extends BaseEntity {
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

  @Column("text")
  userId: string;

}