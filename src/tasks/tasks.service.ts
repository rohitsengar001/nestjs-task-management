import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto as TDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTask(): Task[] {
        return this.tasks;
    }

    getTaskWithFilters(filterDto: GetTasksFilterDto):Task[]{
        const {status, search} = filterDto;

        //define a temporary array to hold the result
        let tasks =this.getAllTask();
        
        //do something with status
        if (status) {
            tasks=tasks.filter(task=>task.status === status);
        } 
        //do something with search
        if(search) {
            tasks=tasks.filter(task=>{
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }
                return false;
            })
        }
        //return final resul
        return tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(NewTask: TDto): Task {
        const { title, description } = NewTask;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string) {
        const TaskId = this.tasks.findIndex(task => task.id === id);
        console.log("TaskId:" + TaskId);
        return this.tasks.splice(TaskId, 1)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        console.log("status:" + status);
        return task;
    }
}
