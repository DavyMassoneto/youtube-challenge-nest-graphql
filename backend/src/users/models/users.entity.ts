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

import Message from 'src/messages/models/messages.entity'

@ObjectType()
@Entity({ name: 'users' })
export default class Users {
  @Field()
  @PrimaryGeneratedColumn()
  id: string

  @Field()
  @Column()
  email: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date

  // Associations
  @OneToMany(() => Message, (message) => message.userConnection)
  messageConnection: Promise<Message[]>
}
