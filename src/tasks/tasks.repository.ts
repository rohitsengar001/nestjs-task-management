import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status-enum';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity> {
  async createTask(CreateTask: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = CreateTask;

    //create object same as entity
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task); // dbs operation
    return task;
  }
}
