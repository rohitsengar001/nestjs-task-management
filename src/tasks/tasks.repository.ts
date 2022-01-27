import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status-enum';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TasksRepository extends Repository<TaskEntity> {

  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search',
      {
          search: `%${search}%`
      });
    }
    const tasks = await query.getMany();
    return tasks;
  }

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
