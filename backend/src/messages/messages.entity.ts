import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Users from 'src/users/users.entity'

@ObjectType()
@Entity({ name: 'messages' })
export default class Message {
  @Field()
  @PrimaryGeneratedColumn()
  id: string

  @Field()
  @Column()
  user_id: string

  @Field()
  @Column()
  content: string

  @Field()
  @CreateDateColumn()
  created_at: Date

  @Field()
  @UpdateDateColumn()
  updated_at: Date

  @Field()
  @DeleteDateColumn()
  deleted_at: Date

  @Field(() => Users)
  user: Users

  // Associations
  @ManyToOne(() => Users, (user) => user.messageConnection, { primary: true })
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<Users>
}
