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
  async getaTaksById(id: string): Promise<TaskEntity> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('Task with Id "${id}" not found');
    }
    return found;
  }
  // getTaskById(id: string): Task {
  //     //try to get task
  //     const task = this.tasks.find(task => task.id == id);
  //     //if not found , throw an error(404 not found)
  //     if (!task) {
  //         throw new NotFoundException(`Task with "${id}" not found`);
  //     }
  //     //otherwise, return the found task
  //     return task;
  // }
  async createTask(CreateTask: CreateTaskDto): Promise<TaskEntity>{
    const { title , description } = CreateTask
    
    //create object same as entity
    const task = this.tasksRepository.create({
        title,
        description,
        status:TaskStatus.OPEN
    })
    
    await this.tasksRepository.save(task) // dbs operation
    return task;
}
  // createTask(NewTask: TDto): Task {
  //     const { title, description } = NewTask;
  //     const task: Task = {
  //         id: uuid(),
  //         title,
  //         description,
  //         status: TaskStatus.OPEN,
  //     };
  //     this.tasks.push(task);
  //     return task;
  // }

  // deleteTask(id: string) {
  //     //make generic : for reusablity
  //     const foundTask = this.getTaskById(id);
  //     this.tasks=this.tasks.filter(task => task.id !== foundTask.id)
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     console.log("status:" + status);
  //     return task;
  // }
}
