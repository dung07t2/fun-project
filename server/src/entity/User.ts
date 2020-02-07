import { Entity, ObjectIdColumn, Column, BaseEntity } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

}
