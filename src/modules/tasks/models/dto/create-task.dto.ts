import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsEnum,
  IsUUID,
  IsInt,
  Min,
} from 'class-validator';
import { TaskStatus } from '../types/task-status.enum';

/**
 * DTO for creating a task.
 */
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
  @IsUUID()
  @IsOptional()
  projectId?: string;
  @IsString()
  @IsOptional()
  @MaxLength(255)
  assigneeId?: string;
  @IsString()
  @IsOptional()
  @MaxLength(255)
  assigneeName?: string;
  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}
