import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}
  // private tasks: Task[] = [];

  // getAllTask(): Task[] {
  //     return this.tasks;
  // }

  // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //     const { status, search } = filterDto;

  //     //define a temporary array to hold the result
  //     let tasks = this.getAllTask();

  //     //do something with status
  //     if (status) {
  //         tasks = tasks.filter(task => task.status === status);
  //     }
  //     //do something with search
  //     if (search) {
  //         tasks = tasks.filter(task => {
  //             if (task.title.includes(search) || task.description.includes(search)) {
  //                 return true;
  //             }
  //             return false;
  //         })
  //     }
  //     //return final resul
  //     return tasks;
  // }
  async getTaksById(id: string): Promise<TaskEntity> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('Task with Id "${id}" not found');
    }
    return found;
  }

  async createTask(createTask: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksRepository.createTask(createTask);
  }

  async deleteTask(id: string): Promise<void> {
    //make generic : for reusablity
    const result = await this.tasksRepository.delete(id);
    if(result.affected === 0){
        throw new NotFoundException('Task with Id "${id}" not found');
    }
    console.log(result);
  }

  //   updateTaskStatus(id: string, status: TaskStatus): Task {
  //       const task = this.getTaskById(id);
  //       task.status = status;
  //       console.log("status:" + status);
  //       return task;
  //   }
}
