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
export default class Messages {
  @Field()
  @PrimaryGeneratedColumn()
  id: string

  @Field()
  @Column({ name: 'user_id' })
  userId: string

  @Field()
  @Column()
  content: string

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date

  @Field(() => Users)
  user: Users

  // Associations
  @ManyToOne(() => Users, (user) => user.messageConnection, { primary: true })
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<Users>
}
