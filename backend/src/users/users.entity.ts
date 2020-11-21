import { Field, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import Message from 'src/messages/messages.entity'

@ObjectType()
@Entity({ name: 'users' })
export default class Users {
  @PrimaryGeneratedColumn()
  id: string

  @Field()
  @Column()
  email: string

  @Field()
  @CreateDateColumn()
  created_at: Date

  @Field()
  @UpdateDateColumn()
  updated_at: Date

  @Field()
  @DeleteDateColumn()
  deleted_at: Date

  // Associations
  @OneToMany(() => Message, (message) => message.userConnection)
  messageConnection: Promise<Message[]>
}
