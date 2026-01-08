import {
  Entity,
  PrimaryKey,
  Property,
  BeforeCreate,
  BeforeUpdate,
} from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { TaskStatus } from '../types/task-status.enum';

/**
 * Task entity for data persistence.
 */
@Entity()
export class Task {
  @PrimaryKey({ type: 'text' })
  id: string = uuidv4();

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'text', default: TaskStatus.TODO })
  status: TaskStatus = TaskStatus.TODO;

  @Property({ type: 'text', nullable: true })
  projectId?: string;

  @Property({ type: 'text', nullable: true })
  assigneeId?: string;

  @Property({ type: 'text', nullable: true })
  assigneeName?: string;

  @Property({ type: 'integer', default: 0 })
  order: number = 0;

  @Property({ type: 'datetime' })
  createdAt!: Date;

  @Property({ type: 'datetime' })
  updatedAt!: Date;

  @BeforeCreate()
  beforeCreate(): void {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  beforeUpdate(): void {
    this.updatedAt = new Date();
  }
}
