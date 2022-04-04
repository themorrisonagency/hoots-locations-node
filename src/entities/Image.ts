import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  title!: string;

  @Column()
  size!: string;

  @Field()
  @Column({ nullable: true})
  fileName!: string;

  @Field()
  @Column({ nullable: true})
  type!: string;

  @Field()
  @Column({ default: 0})
  thumbnailUrl!: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

}
