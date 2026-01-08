import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';
import { TaskStatus } from '../types/task-status.enum';

/**
 * Task entity for data persistence.
 */
@Entity()
export class Task {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;
  @Property({ type: 'varchar', length: 255 })
  title!: string;
  @Property({ type: 'text', nullable: true })
  description?: string;
  @Enum(() => TaskStatus)
  status: TaskStatus = TaskStatus.TODO;
  @Property({ type: 'varchar', length: 255, nullable: true })
  projectId?: string;
  @Property({ type: 'varchar', length: 255, nullable: true })
  assigneeId?: string;
  @Property({ type: 'varchar', length: 255, nullable: true })
  assigneeName?: string;
  @Property({ type: 'integer', default: 0 })
  order: number = 0;
  @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
  @Property({
    type: 'timestamp',
    defaultRaw: 'CURRENT_TIMESTAMP',
    onUpdate: () => new Date(),
  })
  updatedAt!: Date;
}
